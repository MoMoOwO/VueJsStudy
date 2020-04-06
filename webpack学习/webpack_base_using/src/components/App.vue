<template>
  <!-- 这里用于定义 Vue 组件的模板内容 -->
  <div>
    <h1>这是 App 根组件</h1>
  </div>
</template>

<script>
// 这里用于定义 Vue 组件的业务逻辑
export default {
  data() {
    return {}; // 私有数据
  },
  methods: {
    // 处理函数
  }
  // ... 其他业务逻辑
};
</script>

<style scoped>
/* 这里用于定义组件的样式 */
/* 建议添加 scoped 属性，从而是样式仅在当前组件生效 */
h1 {
  color: red;
}
</style>
