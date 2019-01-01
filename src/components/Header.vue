<template>
  <header>
    <h3>Mission Control</h3>
    <button class="button column-button" @click="showModalFunction('column')">Add Column</button>
    <button class="button project-button" @click="showModalFunction('project')">Add Project</button>
    <modal :modalVisibility="showModal" :type="type"></modal>
  </header>
</template>
<script>
import Modal from '@/components/Modal'
import EventBus from '@/EventBus'

export default {
  name: 'Header',
  components: { Modal },
  data: () => ({
    showModal: false,
    type: ''
  }),
  methods: {
    showModalFunction (type) {
      type === 'column' ? this.type = 'column' : this.type = 'project'
      this.showModal = true
    },
    bindEvents () {
      EventBus.$on('MODAL_CLOSE', () => this.showModal = false)
    }
  },
  mounted () {
    this.bindEvents()
  }
}
</script>
<style scoped>
header {
  display: flex;
  flex-direction: row;
  height: 100px;
}
button {
  background-color: #B00020;
  margin: 10px;
  border-radius: 5px;
  height: 50px;
  font-size: 15px;
  color: white;
  cursor: pointer;
}
.column-button {
  margin-left: auto;
}
.row-button {
  margin-left: auto;
}
</style>
