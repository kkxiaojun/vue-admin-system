<template>
  <el-form
    class="login_container"
    label-position="left"
    label-width="80px"
    :model="formLogin"
    :rules="rules"
    ref="formLogin">
    <div class="clearfix" id="login_wrap">
      <h2 class="title">登录页</h2>
      <div id="login">
        <el-form-item class="login--account" label="账号" prop="name">
          <el-input v-model="formLogin.name"></el-input>
        </el-form-item>
        <el-form-item class="login--password" label="密码" prop="password">
          <el-input v-model="formLogin.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item class="login--btn">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script type="text/javascript">
// 引入vuex /src/helper.js中的辅助函数，
// 将actions中的方法直接转为组件中的方法
import { mapActions } from "vuex";
import authService from "@/service/authService";
import md5 from "js-md5";
export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("账户不能为空!"));
      } else {
        cb();
      }
    };
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("密码不能为空!"));
      } else {
        cb();
      }
    };
    return {
      filterText: "<span>filters</span>",
      formLogin: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    // 向登录接口发起请求
    login() {
      // 表单验证
      this.$refs["formLogin"].validate(valid => {
        if (valid) {
          this.checkLogin();
        } else {
          this.$message.error("表单验证失败!");
          return false;
        }
      });
    },
    async checkLogin() {
      let user = this.formLogin;
      let formData = {
        username: user.name,
        password: md5(user.password)
      };
      let res = await authService.getLogin(formData)
      if (res.code === 200) {
        this.userLogin(res.data);
        this.$message.success(`${res.message}`);
        // 登录成功 跳转至首页
        this.$router.push("/home");
      } else {
        this.$message.error(`${res.message}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~views/login/login";
</style>

