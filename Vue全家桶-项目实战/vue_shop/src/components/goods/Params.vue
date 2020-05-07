<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cate_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cascaderProps"
            @change="cascaderChanged"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域 -->
      <el-tabs v-model="tabsActiveName" @tab-click="tabsClick">
        <el-tab-pane label="动态属性" name="first">动态属性</el-tab-pane>
        <el-tab-pane label="静态参数" name="second">静态参数</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data () {
    return {
      // 商品分类列表数据
      cateList: [],
      // 级联选择器配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定的数据
      selectedCateKeys: [],
      // 被激活的页签名称
      tabsActiveName: 'first'
    }
  },

  created () {
    this.getCateList()
  },

  methods: {
    // 获取所有商品分类列表
    async getCateList () {
      const { data: res } = await this.axios.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类信息失败！')
      } else {
        this.cateList = res.data
      }
    },
    // 级联选择框选中项选中项发生变化
    cascaderChanged () {
      if (this.selectedCateKeys.length !== 3) { // 不是三级分类
        this.selectedCateKeys = []
        return 0
      } else { // 选中的是三级分类
        console.log(this.selectedCateKeys)
      }
    },
    // 页签点击
    tabsClick () {
      console.log(this.tabsActiveName)
    }
  }
}

</script>

<style lang="less" scoped>
.cate_opt {
  margin: 15px 0;
}
</style>
