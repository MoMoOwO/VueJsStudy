<template>
  <div>
    <h2>News Index page</h2>
    <p>NewsID: {{ $route.params.newsId }}</p>
    <ul>
      <li><nuxt-link :to="{ name: 'index' }">Home</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped></style>
