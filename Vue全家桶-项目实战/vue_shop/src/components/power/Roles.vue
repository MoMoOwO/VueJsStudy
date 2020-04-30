<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="editRole(scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="username">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色的对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="username">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
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
      // 所有角色列表数据
      rolesList: [],
      // 添加角色对话框是否显示
      addDialogVisible: false,
      // 添加角色的数据
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      formRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, message: '角色名称最短 3 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 5, message: '角色描述最短 5 个字符', trigger: 'blur' }
        ]
      },
      // 是否展示修改角色信息对话框
      editDialogVisible: false,
      // 修改用户表单数据
      editForm: {}
    }
  },

  created () {
    // 获取角色列表数据
    this.getRolesList();
  },

  computed: {},

  watch: {},

  mounted () { },

  methods: {
    // 获取所有角色列表数据
    async getRolesList () {
      const { data: res } = await this.axios.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      } else {
        this.rolesList = res.data
      }
    },
    // 添加角色对话框关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields() // 重置表单项
    },
    // 添加角色
    addRole () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 可以发起添加用户的网路请求
          const { data: res } = await this.axios.post('roles', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加角色失败！')
          } else {
            this.$message.success('添加角色成功！')
            // 关闭对话框
            this.addDialogVisible = false
            // 刷新用户列表
            this.getRolesList()
          }
        }
      })
    },
    // 点击修改按钮展示修改角色对话框
    async showEditDialog (id) {
      // console.log(id)
      // 获取要编辑的角色信息
      const { data: res } = await this.axios.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败！')
      } else {
        this.editForm = res.data
      }
      this.editDialogVisible = true
    },
    // 修改角色对话框关闭事件
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
  }
}

</script>

<style scoped>
</style>
