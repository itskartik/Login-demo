<template>
  <div>
    <div style="display:flex;justify-content:center;margin-top:4%">
      <el-form style="width:30vw" :model="form">
        <el-form-item
          label="Name"
          prop="name"
          :rules="{
            required: true,
            message: 'Please enter name',
            trigger: 'blur'
          }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Email"
          prop="email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="{
            required: true,
            message: 'Please enter password',
            trigger: 'blur'
          }"
        >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item style="justify-content:center; display:flex">
          <el-button style="width:30vw" type="primary" @click="onSubmit"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "test",
        email: "test@g.com",
        password: "12345"
      },
      error: ""
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    ...mapGetters(["getNewUser"]),
    async onSubmit() {
      let email = this.form.email;
      let name = this.form.name;
      let password = this.form.password;
      this.signUp({ name, email, password })
        .then(res => {
          this.open1();
        })
        .catch(err => {
          this.error = err.response.data.error;
          this.open2(this.error);
        });
    },
    open1() {
      this.$message({
        message: "User Registration successfull!",
        type: "success"
      });
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    }
  }
};
</script>
<style lang=""></style>
