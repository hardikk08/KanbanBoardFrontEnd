<template>
  <div>
    <div v-for="(project, index) in projectList" :key="index" class="project" :id="project._id" :data-name="project.projectName" :draggable="true" @dragstart="dragStart(project.stageId, $event)">
      <span class="single-project-detail"><strong>Project Name:</strong> {{project.projectName}}</span>
      <span class="single-project-detail"><strong>Project Duration:</strong> {{project.projectDuration}} months</span>
      <span class="single-project-detail"><strong>Project Budget:</strong> ₹{{project.projectBudget}}</span>
      <span class="single-project-detail"><strong>Project Type:</strong> {{project.projectType}}</span>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus'

export default {
  name: 'Projects',
  props: {
    stageId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    projectList: []
  }),
  methods: {
    async fetchProjects () {
      const projectsResponse = await this.$http.get(`${this.$getProjects}/${this.stageId}`)
      this.projectList = projectsResponse.data
    },
    dragStart (oldStageid, event) {
      this.$store.dispatch('MOVE_PROJECT', {id: oldStageid, name: event.path[2].dataset.name})
      event.dataTransfer.setData("id", event.target.id)
      event.dataTransfer.setData("name", event.target.dataset.name)
    },
    bindEvents () {
      EventBus.$on('ADDED', () => this.fetchProjects())
    }
  },
  mounted () {
    this.fetchProjects()
    this.bindEvents()
  }
}
</script>
<style scoped>
.project {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
@media (max-width: 750px) {
  .project {
    flex-direction: column;
    justify-content: flex-start;
  }
}
.single-project-detail {
  margin: 5px 0;
}
</style>
