<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable @clear="getUserList" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表表格 -->
      <el-table :data="userlist" border strip>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip :enterable="false" effect="dark" content="分配权限" placement="top">
              <!-- 分配权限按钮 -->
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data () {
    // 自定义校验规则
    // 验证邮箱格式的规则
    var checkEmail = (rule, value, cb) => { // 参数一：校验规则，参数二：校验的数据值，参数三：回调函数
      // 验证邮箱格式的正则
      const regEmail = /^([a-zA-Z0-9])+@([a-zA-Z0-9])+(\.[a-zA-z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法邮箱格式
        return cb()
      } else {
        cb(new Error('请输入合法的邮箱'))
      }
    }
    // 验证手机号格式的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号格式的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        // 合法邮箱格式
        return cb()
      } else {
        cb(new Error('请输入合法的手机号'))
      }
    }
    return {
      userlist: [],
      total: 0,
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        eamil: '',
        moblie: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 是否展示修改用户信息对话框
      editDialogVisible: false,
      // 修改用户表单数据
      editForm: {},
      // 修改用户信息的表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 分配权限对话框是否显示
      setRoleDialogVisible: false,
      // 要分配权限的用户信息
      userInfo: {},
      // 可选角色列表
      roleList: [],
      // 新选中的角色
      selectedRoleId: ''
    }
  },

  computed: {},

  watch: {},

  created () {
    this.getUserList()
  },

  mounted () { },

  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.axios.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      } else {
        this.userlist = res.data.users
        this.total = res.data.total
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 用户状态更改
    async userStateChanged (userInfo) {
      // console.log(userInfo)
      // 保存用户最新状态
      const { data: res } = await this.axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        // 失败的话还要将开关状态切换回去
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败！')
      } else {
        this.$message.success('更新用户状态成功！')
      }
    },
    // 添加用户对话框关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields() // 重置表单项
    },
    // 点击确定，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 可以发起添加用户的网络请求
          const { data: res } = await this.axios.post('users', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败！')
          } else {
            this.$message.success('添加用户成功！')
            // 关闭对话框
            this.addDialogVisible = false
            // 刷新用户列表
            this.getUserList()
          }
        }
      })
    },
    // 点击修改按钮展示修改用户对话框
    async showEditDialog (id) {
      // console.log(id)
      // 获取要编辑的用户信息
      const { data: res } = await this.axios.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败！')
      } else {
        this.editForm = res.data
      }
      this.editDialogVisible = true
    },
    // 修改用户对话框关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields() // 重置表单项
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 发起修改用户信息的数据请求
          const { data: res } = await this.axios.put('users/' + this.editForm.id,
            { email: this.editForm.email, mobile: this.editForm.mobile })
          if (res.meta.status !== 200) {
            return this.$message.error('修改用户信息失败！')
          } else {
            // 关闭对话框
            this.editDialogVisible = false
            // 刷新数据列表
            this.getUserList()
            // 提示修改成功
            this.$message.success('修改用户信息成功！')
          }
        }
      })
    },
    // 删除用户按钮点击
    async removeUserById (id) {
      // 弹窗确认是否删除用户，如果用户点击确认，则返回字符串 'confirm'，如果点击取消则返回字符串 'cancel'
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') { // 取消
        return this.$message.info('已经取消删除')
      } else {
        const { data: res } = await this.axios.delete('users/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败！')
        } else {
          this.$message.success('删除用户成功！')
          // 刷新用户列表
          this.getUserList()
        }
      }
    },
    // 展示分配权限对话框
    async setRole (userInfo) {
      this.setRoleDialogVisible = true
      // 保存当前要分配角色的用户的信息
      this.userInfo = userInfo
      // 获取所有角色信息
      const { data: res } = await this.axios.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      } else {
        this.roleList = res.data
      }
    },
    // 点击确定，分配角色
    async saveRoleInfo () {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要新分配的角色！')
      } else {
        const { data: res } = await this.axios.put(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
        if (res.meta.status !== 200) {
          return this.$message.error('分配角色失败！')
        } else {
          this.$message.success('分配角色成功！')
          this.getUserList()
          this.setRoleDialogVisible = false
        }
      }
    },
    // 监听分配角色对话框的关闭事件
    serRoleDialogClosed () {
      // 置空
      this.selectedRoleId = ''
      this.userInfo = {}
    }
  }
}

</script>

<style lang="less" scoped>
</style>
