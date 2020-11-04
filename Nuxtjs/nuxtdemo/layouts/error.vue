<template>
  <div>
    <h2 v-if="error.statusCode == 404">404 您访问的页面不存在</h2>
    <h2 v-else>500 服务器错误</h2>
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="less" scoped></style>
