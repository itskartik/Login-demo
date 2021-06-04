<template>
  <div>
    <div
      style="width:100%;display:flex;justify-content:center; margin-top:100px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        @Submit.prevent="SignIn({ Uname, pass })"
      >
        <el-form-item label="UserName">
          <el-input style="width:30vw;" v-model="Uname"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            style="width:30vw;"
            type="password"
            v-model="pass"
          ></el-input>
        </el-form-item>
        <el-form-item style="justify-content:center; display:flex">
          <el-button type="primary" @click="signIn(Uname, pass)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      Uname: "kp@g.com",
      pass: "12345",
      labelPosition: "left",
      success: false,
      errorMsg: ""
    };
  },
  methods: {
    ...mapActions(["SignIn"]),
    signIn(Uname, pass) {
      // res => {
      //   this.success = true;
      //   console.log(res);
      //   this.open1();
      // },
      // error => {
      //   this.error = true;
      //   console.log(error);
      //   this.open2();
      // }
      this.SignIn({ Uname, pass })
        .then(res => {
          this.success = true;
          this.open1();
        })
        .catch(err => {
          this.errorMsg = err.response.data.error;
          this.open2(this.errorMsg);
        });
    },
    open1() {
      this.$message({
        message: "User login successfull!",
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
