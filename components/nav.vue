<template lang="">
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" to="/home">Home</el-menu-item>
      <el-menu-item index="2" v-if="!signedIn">Signin</el-menu-item>
      <el-menu-item index="3" v-if="!signedIn">Signup</el-menu-item>
      <el-menu-item index="4" v-if="signedIn">User Dashboard</el-menu-item>
      <el-menu-item style="float:right;" index="5" v-if="signedIn">
        Signout
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  methods: {
    ...mapActions(["signOut"]),
    handleSelect(key) {
      if (key == 1) {
        this.$router.push("/");
      } else if (key == 2) {
        this.$router.push("/signin");
      } else if (key == 3) {
        this.$router.push("/signup");
      } else if (key == 4) {
        this.$router.push("/userDashboard");
      } else if (key == 5) {
        this.signOut();
      }
      console.log(this.activeIndex);
    }
  },
  computed: {
    ...mapGetters(["signedIn", "getActiveIndex"])
  }
};
</script>
<style></style>
