<template>
  <div>
    <h2>News Index page</h2>
    <p>NewsID: {{ $route.params.newsId }}</p>
    <ul>
      <li><nuxt-link :to="{ name: 'index' }">Home</nuxt-link></li>
      <li>
        <nuxt-link
          :to="{
            name: 'news-id',
            params: { id: 123, title: '特没谱怎么了？' },
          }"
        >
          新闻 123
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/news/456"> 新闻 456 </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/news/abc"> 新闻 abc </nuxt-link>
      </li>
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
  transition: 'test',
}
</script>

<style lang="less" scoped></style>
