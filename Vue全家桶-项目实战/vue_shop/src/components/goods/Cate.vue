<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品分类卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类表格 -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text
        border
        :show-row-hover="false"
      >
        <!-- 是否有效列的模板 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!-- 排序列的模板 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作列模板 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditCateDialog(scope.row.cat_id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeCateById(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClosed"
      width="50%"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 级联选择器，options 用来指定数据源，props 级联选择器配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类名称对话框 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
      @close="editCateDialogClosed"
    >
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateInfo">确 定</el-button>
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
      // 商品列表查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 总数据条数
      total: 0,
      // 为 tree-table 指定列的定义
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        prop: 'cat_deleted',
        // 表示将当前页定义为模板列
        type: 'template',
        // 表示当前这一列使用的模板名称
        template: 'isok'
      },
      {
        label: '排序',
        prop: 'cat_level',
        type: 'template',
        template: 'order'
      }, {
        label: '操作',
        type: 'template',
        template: 'opt'
      }],
      // 控制添加商品分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加商品分类的表单数据对象
      addCateForm: {
        cat_name: '', // 商品分类名称
        cat_pid: 0, // 父级分类 id
        cat_level: 0 // 分类的等级，默认一级分类
      },
      // 添加商品分类表单的规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类的名称', trigger: 'blur' }
        ]
      },
      // 父级分类列表
      parentCateList: [],
      // 级联选择器配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的 id 数组
      selectedKeys: [],
      // 是否显示编辑商品分类对话框
      editCateDialogVisible: false,
      // 编辑商品分类对话框表单数据对象
      editCateForm: {},
      // 编辑商品分类表单验证对象
      editCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类的名称', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getCateList()
  },

  computed: {},

  watch: {},

  mounted () { },

  methods: {
    async getCateList () {
      const { data: res } = await this.axios.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败！')
      } else {
        // 把数据列表赋值给 cateList
        this.cateList = res.data.result
        // 为总数据条数赋值
        this.total = res.data.total
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听 pagenum 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 添加分类按钮点击，展示添加分类对话框
    showAddCateDialog () {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取父级(一级二级)分类的数据列表
    async getParentCateList () {
      const { data: res } = await this.axios.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败！')
      } else {
        this.parentCateList = res.data
      }
    },
    // 级联选择器选择项发生变化
    parentCateChanged () {
      // console.log(this.selectedKeys)
      // 修改 addCateForm 对象
      // 如果 selectedKyes.length 则选中了父级分类，否则没有选中父级分类，则默认为一级
      if (this.selectedKeys.length > 0) {
        // 父分类 id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 当前商品分类等级
        this.addCateForm.cat_level = this.selectedKeys.length
        return 1
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 添加商品分类
    addCate () {
      // console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          const { data: res } = await this.axios.post('categories', this.addCateForm)
          console.log(res)
          if (res.meta.status !== 201) {
            return this.$message.error('添加商品分类失败！')
          } else {
            this.$message.success('添加商品分类成功！')
            this.getCateList()
            this.addCateDialogVisible = false
          }
        }
      })
    },
    // 监听对话框关闭事件
    addCateDialogClosed () {
      // 重置表单数据
      this.$refs.addCateFormRef.resetFields()
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
      this.selectedKeys = []
    },
    // 显示编辑商品分类对话框
    async showEditCateDialog (id) {
      const { data: res } = await this.axios.get(`categories/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类信息失败！')
      } else {
        this.editCateForm = res.data
      }
      this.editCateDialogVisible = true
    },
    // 关闭编辑商品分类信息对话框
    editCateDialogClosed () {
      this.$refs.editCateFormRef.resetFields()
      this.editCateForm = {}
    },
    // 提交编辑的商品分类信息
    editCateInfo () {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 发起修改用户信息的数据请求
          const { data: res } = await this.axios.put('categories/' + this.editCateForm.cat_id,
            { cat_name: this.editCateForm.cat_name })
          if (res.meta.status !== 200) {
            return this.$message.error('修改商品分类信息失败！')
          } else {
            // 关闭对话框
            this.editCateDialogVisible = false
            // 刷新数据列表
            this.getCateList()
            // 提示修改成功
            this.$message.success('修改商品分类信息成功！')
          }
        }
      })
    },
    // 删除商品分类信息
    async removeCateById (id) {
      // 弹窗确认是否删除商品分类，如果用户点击确认，则返回字符串 'confirm'，如果点击取消则返回字符串 'cancel'
      const confirmResult = await this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') { // 取消
        return this.$message.info('已经取消删除')
      } else {
        const { data: res } = await this.axios.delete('categories/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除商品分类失败！')
        } else {
          this.$message.success('删除商品分类成功！')
          // 刷新用户列表
          this.getCateList()
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
