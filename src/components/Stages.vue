<template>
  <div class="stage-card">
    <h4>{{stageData.stageName}}</h4>
    <projects :stageId="stageData._id"></projects>
  </div>
</template>
<script>
import Projects from '@/components/Projects'

export default {
  name: 'Stages',
  components: { Projects },
  props: {
    stageData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({

  }),
  mounted () {
  }
}
</script>
<style scoped>
.stage-card {
  background-color: rgb(244, 244, 244);
  margin: 10px;
  text-align: left;
  padding: 0 10px 10px 10px;
  width: 300px;
  border-top: 5px solid #B00020;
  height: 570px;
  overflow: scroll;
}
@media (max-width: 750px) {
  .stage-card {
    width: 90%;
    height: auto;
  }
}
</style>
