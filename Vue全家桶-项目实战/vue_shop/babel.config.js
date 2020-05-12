const prodPlugins = [] // 这是项目发布阶段需要用道德 babel 插件
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 发布产品时候的插件数组
    ...prodPlugins,
    // 声明路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}
