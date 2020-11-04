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
    return {
      title: this.$route.params.title,
    }
  },
  mounted() {},
  methods: {},
  validate({ params }) {
    // 必须为数字
    return /^\d+$/.test(params.id)
  },
  // 独立设置 head 信息
  head() {
    return {
      title: this.title,
      // 覆盖掉 nuxt.config.js 中默认的 meta，保证页面只有一个 meta
      meta: [{ hid: 'description', name: 'news', content: 'I am a new' }],
    }
  },
}
</script>

<style lang="less" scoped></style>
