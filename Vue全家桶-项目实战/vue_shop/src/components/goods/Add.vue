<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="+ activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab 栏区域 -->
      <el-form
        :model="addGoodForm"
        :rules="addGoodFormRules"
        ref="addGoodFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" active name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格(元)" prop="goods_price">
              <el-input v-model="addGoodForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 选择商品分类的级联选择框 -->
              <el-cascader
                v-model="addGoodForm.goods_cat"
                :options="cateList"
                :props="cascaderProps"
                @change="cascaderChanged"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单 Item 项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action 表示突变要上传的后台 API 地址 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headerObj"
              list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addGoodForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="addGood">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="privewDialogVisible" width="50%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: '',
  components: {},

  data () {
    return {
      // 激活的 index
      activeIndex: '0',
      // 表单数据对象
      addGoodForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [], // 商品所属分类数组
        pics: [],
        goods_introduce: '', // 商品详情描述
        attrs: []
      },
      // 表单验证规则对象
      addGoodFormRules: {
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
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类' }
        ]
      },
      // 商品分类数组
      cateList: [],
      // 级联选择器配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 商品参数数据
      manyTableData: [],
      // 商品属性数据
      onlyTableData: [],
      // 上传图片地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件的 headers 请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 预览图片地址
      previewPath: '',
      // 预览图片窗口是否显示
      privewDialogVisible: false
    }
  },

  created () {
    this.getCateList()
  },

  computed: {
    cateId () {
      if (this.addGoodForm.goods_cat.length === 3) {
        return this.addGoodForm.goods_cat[2]
      } else {
        return null
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
    // 级联选择器选中项变化
    cascaderChanged () {
      // console.log(this.addGoodForm.goods_cate)
      if (this.addGoodForm.goods_cat.length !== 3) { // 不是三级分类则清空
        this.addGoodForm.goods_cat = []
      }
    },
    // tabs 标签切换时触发
    beforeTabLeave (activeName, oldActiveName) {
      // console.log(activeName, oldActiveName)
      if (oldActiveName === '0' && this.addGoodForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    // tabs 标签页点击
    async tabClicked () {
      // console.log(this.activeIndex)
      if (this.activeIndex === '1') { // 访问商品参数面板
        const { data: res } = await this.axios.get(`categories/${this.cateId}/attributes`, { params: { sel: 'many' } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品参数失败！')
        } else {
          // console.log(res.data)
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
          })
          // console.log(res.dtat)
          this.manyTableData = res.data
        }
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.axios.get(`categories/${this.cateId}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品属性失败！')
        } else {
          this.onlyTableData = res.data
        }
      }
    },
    // 预览图片
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.privewDialogVisible = true
    },
    // 删除图片
    handleRemove (file) {
      // console.log(file)
      /*
        1. 获取将要删除的图片的临时路径
        2. 从 pics 数组中，找到这个图片对应的索引值
        3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      */
      const filePath = file.response.data.tmp_path
      const picIndex = this.addGoodForm.pics.findIndex(x => x.pic === filePath)
      this.addGoodForm.pics.splice(picIndex, 1)
      console.log(this.addGoodForm)
    },
    // 上传图片成功后触发
    handleSuccess (response) {
      // console.log(response)
      /*
        1. 拼接得到一个图片信息对象
        2. 将图片信息对象 push 到 pics
      */
      const picInfo = { pic: response.data.tmp_path }
      this.addGoodForm.pics.push(picInfo)
      // console.log(this.addGoodForm)
    },
    // 添加商品
    addGood () {
      this.$refs.addGoodFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请添加必要的表单项！')
        } else {
          // 执行添加的业务逻辑
          // loadsh cloneDeep(obj) 深拷贝
          const form = _.cloneDeep(this.addGoodForm)
          form.goods_cat = form.goods_cat.join(',')
          // 处理动态参数
          this.manyTableData.forEach(item => {
            const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
            this.addGoodForm.attrs.push(newInfo)
          })
          // 处理静态属性
          this.onlyTableData.forEach(item => {
            const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
            this.addGoodForm.attrs.push(newInfo)
          })
          form.attrs = this.addGoodForm.attrs
          // console.log(form)

          // 发起请求添加商品，商品名称必须是唯一的
          const { data: res } = await this.axios.post('goods', form)
          if (res.meta.status !== 201) {
            return this.$message.error('添加商品失败！')
          } else {
            this.$message.success('添加商品成功！')
            this.$router.push('/goods')
          }
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg {
  width: 100%;
}
.btnAdd {
  margin-top: 15px;
}
</style>
