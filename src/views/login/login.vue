<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="el-col-s">
        <el-form
          label-position="left" 
          label-width="80px" 
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
          <el-form-item label="账号" prop="name">
            <el-input v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div>{{filterText | filterHtml}}</div>
  </el-card>
</template>

<script type="text/javascript">
  // 引入vuex /src/helper.js中的辅助函数，
  // 将actions中的方法直接转为组件中的方法
  import { mapActions } from 'vuex';
  import { getLogin } from 'service/getData';
  import md5 from 'js-md5';
  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('账户不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      return{
        filterText: '<span>filters</span>',
        formLogin:{
          name: '',
          password: ''
        },
        rules:{
          name:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      ...mapActions(['userLogin']),
      // 向登录接口发起请求
      login(){
        // 表单验证
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            this.checkLogin();
          } else {
            this.$message.error('表单验证失败!')
            return false;
          }
        });
      },
      async checkLogin () {
        let user = this.formLogin;
        let formData = {
          username: user.name,
          password: md5(user.password)
        };
        let res = await getLogin(formData)
        // 通过验证之后才请求登录接口
        if (res.state.code === 200) {
          this.userLogin(res.data)
          this.$message.success(`${res.state.msg}`)
          // 登录成功 跳转至首页
          this.$router.push('/home')
        }else{
          this.$message.error(`${res.state.msg}`)
          return false;
        }
      },
    }
  }
</script>
<style scoped>
.el-col-s{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
