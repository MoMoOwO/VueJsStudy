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
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      :class="[i3 === 0 ? '' : 'bdtop']"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>
              {{scope.row}}
            </pre>-->
          </template>
        </el-table-column>
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
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleById(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
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
    <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog title="编辑角色" :visible.sync="setRightDialogVisible" width="50%" @close="defKeys = []">
      <!-- 权限树形控件 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRight">确 定</el-button>
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
      editForm: {},
      // 是否展示修改权限对话框
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的权限节点 id 值数组
      defKeys: [],
      // 要分配权限的角色 id
      roleId: ''
    }
  },

  created () {
    // 获取角色列表数据
    this.getRolesList()
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
    editRoleInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return 0
        } else {
          // 发起修改用户信息的数据请求
          const { data: res } = await this.axios.put('roles/' + this.editForm.roleId,
            { roleName: this.editForm.roleName, roleDesc: this.editForm.roleDesc })
          if (res.meta.status !== 200) {
            return this.$message.error('修改角色信息失败！')
          } else {
            // 关闭对话框
            this.editDialogVisible = false
            // 刷新数据列表
            this.getRolesList()
            // 提示修改成功
            this.$message.success('修改角色信息成功！')
          }
        }
      })
    },
    // 删除角色按钮点击
    async removeRoleById (id) {
      // 弹窗确认是否删除用户，如果用户点击确认，则返回字符串 'confirm'，如果点击取消则返回字符串 'cancel'
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') { // 取消
        return this.$message.info('已经取消删除')
      } else {
        const { data: res } = await this.axios.delete('roles/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除角色失败！')
        } else {
          this.$message.success('删除角色成功！')
          // 刷新用户列表
          this.getRolesList()
        }
      }
    },
    // 根据 id 删除对应的权限
    async removeRightById (role, rightId) {
      // 弹框提示用户是否要删除权限
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') { // 取消
        return this.$message.info('已经取消删除')
      } else {
        const { data: res } = await this.axios.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除权限失败！')
        } else {
          this.$message.success('删除权限成功！')
          role.children = res.data
        }
      }
    },
    // 展示分配权限对话框
    async showSetRightDialog (role) {
      this.roleId = role.id
      // 获取所有权限数据
      const { data: res } = await this.axios.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      } else {
        this.rightsList = res.data
        // 递归获取三级节点的 id 数组
        this.getLeafKeys(role, this.defKeys)
        this.setRightDialogVisible = true
      }
    },
    // 通过递归的形式获取角色下所有三级权限的 id，并保存到 defKeys 数组中
    getLeafKeys (node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach(item => {
          this.getLeafKeys(item, arr)
        })
      }
    },
    // 点击确定提交分配的权限
    async allotRight () {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      // console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.axios.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      } else {
        this.$message.success('分配权限成功！')
        this.getRolesList()
        this.setRightDialogVisible = false
      }
    }
  }
}

</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
