//import { reject, resolve } from "core-js/fn/promise";

export const state = () => ({
  //
  user: [],
  activeIndex: "1",
  signedIn: false,
  newUser: ""
});

export const mutations = {
  //
  SignIn(state, data) {
    state.user = data.data;
    state.signedIn = true;
    console.log(state.user.user.name);
  },
  signOut(state, data) {
    state.user = [];
    state.signedIn = false;
  },
  signUp(state, data) {
    state.newUser = data;
  },
  updateUser(state, data) {
    state.user.user = data;
  }
};
export const actions = {
  //
  SignIn({ commit }, data) {
    // await this.$axios
    //   .post("/signin", {
    //     email: data.Uname,
    //     password: data.pass
    //   })
    //   .then(res => {
    //     commit("SignIn", res);

    //     // this.$router.push("/home");
    //   })
    //   .catch(err => {
    //     console.log("Myerror" + err);
    //     return err;
    //   });
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/signin", { email: data.Uname, password: data.pass })
        .then(response => {
          resolve(response);
          commit("SignIn", response);
          this.$router.push("/userDashboard");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async signOut({ commit }) {
    await this.$axios
      .get("/signout")
      .then(res => {
        this.$router.push("/signin");
        commit("signOut");
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  async signUp({ commit }, form) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/signup", {
          name: form.name,
          email: form.email,
          password: form.password
        })
        .then(res => {
          resolve(res);
          commit("signUp", res.status);
          this.$router.push("/signin");
        })
        .catch(err => {
          reject(err);
          commit("signUp", err.response.status);
        });
    });

    //   return await this.$axios
    //     .post("/signup", {
    //       name: form.name,
    //       email: form.email,
    //       password: form.password
    //     })
    //     .then(res => {
    //       // console.log("my responseeeeeeee" + res.status);
    //       return res.status;
    //       commit("signUp", res.status);
    //     })
    //     .catch(err => {
    //       commit("signUp", err.response.status);
    //       return err.response.status;
    //       // console.log(err.response.status);
    //     });
  },
  getUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      let id = state.user.user._id;
      this.$axios
        .get(`/user/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
          this.$router.push("/signin");
        });
    });
  },
  updateUser({ commit, state }, form) {
    return new Promise((resolve, reject) => {
      let id = state.user.user._id;

      this.$axios
        .put(`/user/${id}`, {
          name: form.name,
          email: form.email
        })
        .then(res => {
          commit("updateUser", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export const getters = {
  //

  signedIn(state) {
    return state.signedIn;
  },
  getUser(state) {
    return state.user.user;
  },
  getNewUser(state) {
    return state.newUser;
  },
  getActiveIndex(state) {
    return state.activeIndex;
  }
};
