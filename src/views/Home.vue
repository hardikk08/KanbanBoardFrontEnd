<template>
  <div class="layout">
    <Header></Header>
    <Container></Container>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Container from '@/components/Container'

export default {
  name: 'Home',
  components: { Header, Container }
}
</script>
<style scoped>
.layout {
  margin: 20px;
}
</style>
