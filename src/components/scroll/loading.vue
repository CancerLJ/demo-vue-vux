<template>
  <div class="loading-container">
    <img class="rotate" src="./loading.png">
  </div>
</template>
<script>
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME
}
</script>
<style lang="less" scoped>
.loading-container{
  padding: 10px 0;
  img{
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    &.rotate{
      -webkit-animation: rotate .8s linear infinite;
      animation: rotate .8s linear infinite;
    }
  }
}

@-webkit-keyframes rotate{
  0%{-webkit-transform: rotate(0deg)}
  100%{-webkit-transform: rotate(360deg)}
}
@keyframes rotate{
  0%{transform: rotate(0deg)}
  100%{transform: rotate(360deg)}
}
</style>
