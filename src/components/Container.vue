<template>
  <div class="stage-container" @drop="dropProject" @dragover="dragOver">
    <stages :stageData="stage" v-for="(stage, index) in data" :key="index" :id="stage._id" :data-name="stage.stageName">

    </stages>
    <div id="snackbar" v-if="showSnackBar">
      Project <strong>{{projectName}}</strong> moved from <em>{{oldStageName}}</em> to <em>{{newStage}}</em>
    </div>
  </div>
</template>
<script>
import Stages from '@/components/Stages'
import EventBus from '@/EventBus'

export default {
  name: 'Container',
  components: { Stages },
  data: () => ({
    data: null,
    showSnackBar: false,
    newStage: '',
    projectName: '',
    oldStageName: ''
  }),
  methods: {
    async fetchData () {
      const response = await this.$http.get(this.$getStages)
      response.data.sort(function (a,b) {
        return a.stageOrder - b.stageOrder
      })
      this.data = response.data
      this.$store.dispatch('SAVE_ALL_STAGES', response.data)
    },
    dropProject (event) {
      event.preventDefault();
      const projectId = event.dataTransfer.getData("id")
      this.projectName = event.dataTransfer.getData("name")
      this.oldStageName = this.$store.state.projectToBeMovedPreviousStage.name
      const newStage = event.target.id
      this.newStage = event.target.dataset.name
      this.changeStage(projectId, newStage)
    },
    async changeStage (projectId, newStage) {
      if (this.$store.state.projectToBeMovedPreviousStage.id === newStage) return
      let data = {
        newStageId: projectId,
        projectId: newStage
      }
      const response = await this.$http.post(`${this.$changeProjectStage}`, data)
      if (!response.data.message) {
        EventBus.$emit('ADDED')
        this.showSnackBar = true
        setTimeout(() => {
          this.showSnackBar = false
        }, 4000)
      }
      else alert('Stage change failed')
    },
    dragOver (event) {
      event.preventDefault();
    },
    bindEvents () {
      EventBus.$on('ADDED', () => this.fetchData())
    }
  },
  mounted () {
    this.fetchData()
    this.bindEvents()
  }
}
</script>
<style scoped>
.stage-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1 1 0%;
}
#snackbar {
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}
@media (max-width: 750px) {
  .stage-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
