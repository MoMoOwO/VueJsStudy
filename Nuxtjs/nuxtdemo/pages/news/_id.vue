<template>
  <div>
    <h2>News Content [{{ $route.params.id }}]</h2>
    <ul>
      <li><nuxt-link :to="{ name: 'index' }">首页</nuxt-link></li>
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
  validate({ params }) {
    // 必须为数字
    return /^\d+$/.test(params.id)
  },
}
</script>

<style lang="less" scoped></style>
