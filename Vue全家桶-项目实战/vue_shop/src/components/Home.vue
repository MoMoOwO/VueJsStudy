<template>
  <div>
    Home
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data () {
    return {

    }
  },

  computed: {},

  watch: {},

  mounted () { },

  methods: {
    // 退出
    logout () {
      // 清空 token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    }
  }
}

</script>

<style lang="less" scoped>
</style>
