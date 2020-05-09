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
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加动态参数的按钮 -->
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible = true"
          >添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <!-- <template slot-scope="scope"> -->
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加静态属性的按钮 -->
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible = true"
          >添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <!-- <template slot-scope="scope"> -->
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加属性/参数的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 添加数据的表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
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
      tabsActiveName: 'many',
      // 动态参数数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
      // 添加对话框是否显示
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: { attr_name: '' },
      // 添加参数的表单规则验证对象
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getCateList()
  },

  computed: {
    // 如果按钮需要被禁用则返回 true，否则返回 false
    isBtnDisabled () {
      return this.selectedCateKeys.length !== 3
    },
    // 当前选中三级商品分类 id
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      } else {
        return null
      }
    },
    // 动态计算标题的文本
    titleText () {
      if (this.tabsActiveName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
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
      this.getParamsData()
    },
    // 页签点击
    tabsClick () {
      // 获取参数列表数据
      this.getParamsData()
    },
    // 获取参数列表数据
    async getParamsData () {
      if (this.selectedCateKeys.length !== 3) { // 不是三级分类
        this.selectedCateKeys = []
        return 0
      } else { // 选中的是三级分类
        // 根据所选分类的 id 和当前所处的面板，获取对应的参数
        const { data: res } = await this.axios.get(`categories/${this.cateId}/attributes`, { params: { sel: this.tabsActiveName } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数列表失败！')
        } else {
          // console.log(res.data)
          if (this.tabsActiveName === 'many') {
            this.manyTableData = res.data
          } else {
            this.onlyTableData = res.data
          }
        }
      }
    },
    // 添加对话框关闭时出发
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加属性/参数
    addParams () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          const { data: res } = await this.axios.post(`categories/${this.cateId}/attributes`, { attr_name: this.addForm.attr_name, attr_sel: this.tabsActiveName })
          if (res.meta.status !== 201) {
            return this.$message.error('添加失败！')
          } else {
            this.$message.success('添加成功！')
            this.getParamsData()
            this.addDialogVisible = false
          }
        }
      })
    }

  }
}

</script>

<style lang="less" scoped>
.cate_opt {
  margin: 15px 0;
}
</style>
