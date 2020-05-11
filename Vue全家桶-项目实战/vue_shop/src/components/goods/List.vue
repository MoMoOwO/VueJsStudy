<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表表格 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number" width="90px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="90px"></el-table-column>
        <el-table-column label="创建时间" width="160px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGoodsById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>

    <!-- 编辑商品对话框 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="editGoodDialogVisible"
      width="50%"
      @close="editGoodDialogClosed"
    >
      <el-form
        :model="editGoodForm"
        :rules="editGoodFormRules"
        ref="editGoodFormRef"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editGoodForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price" type="number">
          <el-input v-model="editGoodForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number" type="number">
          <el-input v-model="editGoodForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight" type="number">
          <el-input v-model="editGoodForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoodInfo">确 定</el-button>
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
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表数据
      goodsList: [],
      // 商品列表数据总条数
      total: 0,
      // 编辑商品表单数据
      editGoodForm: {},
      // 是否显示编辑对话框
      editGoodDialogVisible: false,
      // 编辑表单验证规则对象
      editGoodFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', triger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', triger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', triger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', triger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getGoodsList()
  },

  methods: {
    // 获取商品列表数据
    async getGoodsList () {
      const { data: res } = await this.axios.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表数据失败！')
      } else {
        // console.log(res.data)
        this.goodsList = res.data.goods
        this.total = res.data.total
      }
    },
    // pagesize 改变
    pageSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    // 当前页码值发生改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    // 删除商品
    async removeGoodsById (id) {
      // 弹窗确认是否删除商品分类，如果用户点击确认，则返回字符串 'confirm'，如果点击取消则返回字符串 'cancel'
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') { // 取消
        return this.$message.info('已经取消删除')
      } else {
        const { data: res } = await this.axios.delete(`goods/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除商品失败！')
        } else {
          this.$message.success('删除商品成功！')
          // 刷新商品列表
          this.getGoodsList()
        }
      }
    },
    // 显示编辑商品对话框
    async showEditDialog (id) {
      // 根据 ID 查商品
      const { data: res } = await this.axios.get(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品信息失败！')
      } else {
        // console.log(res.data)
        this.editGoodForm = res.data
      }
      this.editGoodDialogVisible = true
    },
    // 关闭编辑商品对话框
    editGoodDialogClosed () {
      this.$refs.editGoodFormRef.resetFields()
    },
    // 提交编辑的商品信息
    editGoodInfo () {
      this.$refs.editGoodFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 接口存在 bug
          // 发起修改商品信息的数据请求
          const { data: res } = await this.axios.put('goods/' + this.editGoodForm.goods_id,
            {
              goods_name: this.editGoodForm.goods_name,
              goods_price: +this.editGoodForm.goods_price,
              goods_number: +this.editGoodForm.goods_number,
              goods_weight: +this.editGoodForm.goods_weight
            })
          if (res.meta.status !== 201) {
            console.log(res)
            return this.$message.error('修改商品信息失败！')
          } else {
            // 关闭对话框
            this.editGoodDialogClosed = false
            // 刷新数据列表
            this.getGoodsList()
            // 提示修改成功
            this.$message.success('修改商品信息成功！')
          }
        }
      })
    },
    // 编程式导航跳转到添加商品页面
    goAddPage () {
      this.$router.push('/goods/add')
    }
  }
}

</script>

<style lang="less" scoped>
</style>
