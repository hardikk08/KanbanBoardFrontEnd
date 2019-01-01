<template>
  <div id="dynamic-modal" class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div id="column" v-if="column" style="margin-top: 50px;">
        <h4>Add new column</h4>
        <div class="content">
          <span>Column Name: <input type="text" v-model="columnName"></span>
          <span>Column Order: <input type="number" v-model="columnOrder"></span>
          <p>*** Enter column order in multiple of 5 so that in future adding new stage in between you can use a less order value</p>
        </div>
      </div>
      <div id="project" v-if="project" style="margin-top: 50px;">
        <h4>Add new project</h4>
        <div class="content">
          <span>Project Name: <input type="text" v-model="projectName"></span>
          <span>Project Type: <input type="text" v-model="projectType"></span>
          <span>Project Duration: <input type="number" v-model="projectDuration"></span>
          <span>Project Budget: <input type="number" v-model="projectBudget"></span>
          <span>Stage:
            <select v-model="stageId">
              <option disabled>Please select one</option>
              <option v-for="(stage, index) in stageData" :key="index" :value="stage._id">
                {{stage.stageName}}
              </option>
            </select>
          </span>
        </div>
      </div>
      <button @click="saveData">Save</button>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus'

export default {
  name: 'Modal',
  props: [ 'modalVisibility', 'type' ],
  data: () => ({
    column: false,
    project: false,
    showModal: false,
    columnName: '',
    columnOrder: 0,
    stageData: [],
    stageId: '',
    projectName: '',
    projectDuration: 0,
    projectBudget: 0,
    projectType: ''
  }),
  methods: {
    closeModal () {
      this.resetData()
      EventBus.$emit('MODAL_CLOSE')
    },
    resetData () {
      // Hide modal
      this.column = false
      this.showModal = false
      this.project = false
      // Reset data
      this.projectType = ''
      this.projectDuration = 0
      this.projectName = ''
      this.projectBudget = 0
      this.stageId = ''
      this.columnName = ''
      this.columnOrder = 0
    },
    async saveData () {
      let data, url
      if (this.column) {
        if (!this.columnName || !this.columnOrder) {
          alert('Missing required parameters')
          return
        }
        data = {
          stageName: this.columnName,
          stageOrder: this.columnOrder
        }
        url = this.$createStage
      }
      if (this.project) {
        if (!this.projectName || !this.projectType || !this.projectDuration || !this.projectBudget || !this.stageId) {
          alert('Missing required parameters')
          return
        }
        data = {
          projectName: this.projectName,
          projectType: this.projectType,
          projectDuration: this.projectDuration,
          projectBudget: this.projectBudget,
          stageId: this.stageId
        }
        url = this.$createProject
      }
      const saveResponse = await this.$http.post(url, data)
      if (saveResponse.data.message) alert('Failed')
      else {
        EventBus.$emit('ADDED')
        alert('Successful')
      }
      this.closeModal()
    },
  },
  watch: {
    modalVisibility: function (newValue) {
      if (newValue) {
        this.stageData = this.$store.state.stageData
        this.showModal = true
        this.type === 'column' ? this.column = true : this.project = true
      }
    }
  }
}
</script>
<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
}
span {
  margin: 10px;
}
input {
  width: 200px;
}
button {
  margin: 10px;
  border-radius: 5px;
  height: 40px;
  width: 80px;
  font-size: 15px;
  cursor: pointer;
}
</style>
