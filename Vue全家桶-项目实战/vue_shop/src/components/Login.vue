<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data () {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  mounted () { },

  methods: {
    // 重置表单
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 登录钱进行预验证
      this.$refs.loginFormRef.validate(valid => {
        // valid 为一个 boolean 值，通过该值可以确定表单是否合法
        // console.log(valid)
        if (!valid) {
          return 0
        } else {
          this.axios.post('login', this.loginForm).then(result => {
            // console.log(result.data)
            if (result.data.meta.status !== 200) {
              return this.$message.error('登陆失败！')
            } else {
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              })
              /**
               * 1.将登陆成功之后的 token 保存到客户端的 sessionStorage 中
               *  1.1 项目中除了登录之外的其他 API 接口，必须登录之后才能访问
               *  1.2 token 只应再当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
               * 2. 通过编程式导航跳转到后台页面，路由地址 /home
               */
              // console.log(result.data)
              window.sessionStorage.setItem('token', result.data.data.token)
              this.$router.push('/home')
            }
          })
        }
      })

      // 视频中方法
      /* this.$refs.loginFormRef.validate(async valid => {
        // valid 为一个 boolean 值，通过该值可以确定表单是否合法
        // console.log(valid)
        if (!valid) {
          return 0
        } else {
          const { data: res } = await this.axios.post('login', this.loginForm)
          console.log(res)
        }
      }) */
    }
  }
}
</script>

<style lang="less" scope>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
