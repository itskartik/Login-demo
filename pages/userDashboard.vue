<template lang="">
  <div>
    <div style="display:flex;justify-content:center;margin-top:3%">
      <h1 class="grid-content">Welcome, {{ user.name }}</h1>
    </div>
    <div style="margin-top:3%">
      <el-row class="main-row" :gutter="40">
        <el-col style=" " :span="12">
          <el-row :span="8">Name :</el-row>
          <el-row :span="8">Email :</el-row>
          <el-row :span="8">User Type :</el-row>
        </el-col>
        <el-col v-if="!editing" style=" margin-left:10px" :span="11">
          <el-row :span="8">{{ user.name }}</el-row>
          <el-row :span="8">{{ user.email }}</el-row>
          <el-row :span="8" v-if="user.role == 0">Normal User</el-row>
          <el-row :span="8" v-else>Admin</el-row>
        </el-col>
        <el-col v-else style=" margin-left:10px" :span="11">
          <el-row :span="8" class="input">
            <el-input
              placeholder="Enter new name"
              v-model="updatedUser.name"
            ></el-input>
          </el-row>
          <el-row :span="8" class="input">
            <el-input
              placeholder=" Enter new email"
              v-model="updatedUser.email"
            ></el-input>
          </el-row>
          <el-row :span="8" v-if="user.role == 0">Normal User</el-row>
          <el-row :span="8" v-else>Admin</el-row>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:3%;display:flex;justify-content:center;">
      <el-button type="primary" @click="isEditing()">Edit</el-button>
      <el-button type="success" @click="onSubmit()">Submit</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        role: ""
      },
      updatedUser: {
        name: "",
        email: "",
        role: ""
      },
      editing: false
    };
  },
  middleware: "auth",
  methods: {
    ...mapGetters(["getUser"]),
    ...mapActions(["updateUser"]),
    isEditing() {
      this.editing = !this.editing;
    },
    onSubmit() {
      if (
        this.user.name !== this.updatedUser.name ||
        this.user.email !== this.updatedUser.email
      ) {
        this.updateUser(this.updatedUser)

          .then(res => {
            this.success = true;
            this.open1();
            var Suser = this.getUser();

            this.user.name = Suser.name;
            this.user.email = Suser.email;
            this.updatedUser.name = Suser.name;
            this.updatedUser.email = Suser.email;
          })
          .catch(err => {
            console.log(err.response.data.error);
            let msg = err.response.data.error;
            if (err.response.data.error) {
              this.open2(msg);
            } else {
              this.open2("There was some error.. please try again later");
            }
          });
      } else {
        this.open2("You should update atleast one field");
      }
    },
    open1() {
      this.$message({
        message: "User update successfull!",
        type: "success"
      });
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    }
  },

  mounted() {
    var Suser = this.getUser();
    this.user.name = Suser.name;
    this.user.email = Suser.email;
    this.user.role = Suser.role;
    this.updatedUser.name = Suser.name;
    this.updatedUser.email = Suser.email;
  }
};
</script>
<style>
.el-row {
  font-size: 25px;
  border: 1px solid #d3dce6;
  border-radius: 3px;
  margin-top: 10px;
  padding-left: 10px;
}
.main-row {
  border: none;
}
.input {
  border: none;
}
.el-input {
  font-size: 25px;
  padding: none;
  height: 10px;
}
</style>
