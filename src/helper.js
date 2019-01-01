import axios from 'axios'

let baseUrl = process.env.VUE_APP_BASE_URL_LOCAL

const helper = {
  install (Vue) {
    const VueInstance = Vue
    VueInstance.prototype.$http = axios
    VueInstance.prototype.$getStages = `${baseUrl}/stages`
    VueInstance.prototype.$getProjects = `${baseUrl}/projects`
    VueInstance.prototype.$createStage = `${baseUrl}/createStage`
    VueInstance.prototype.$createProject = `${baseUrl}/addProject`
    VueInstance.prototype.$changeProjectStage = `${baseUrl}/changeProjectStage`
  }
}

export default helper
