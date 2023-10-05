<template>
  <br />
  <br />
  <div class="flex-container" style="border: 0.5px solid #d3d3d3">
    <div class="vue-tempalte">
      <form @submit.prevent="login">
        <h3>Sign In</h3>
        <br />
        <div class="mb-3">
          <label>Email address</label><br />
          <input
            type="email"
            class="form-input"
            v-model="email"
            style="font-size: 16px"
          />
        </div>
        <div class="mb-3">
          <label>Password</label><br />
          <input
            type="password"
            class="form-input"
            v-model="password"
            style="font-size: 16px"
          />
        </div>
        <br />
        <button
          type="submit"
          class="btn btn-sm"
          style="border: 0.5px solid black; background-color: #e0e0e0"
        >
          Sign In
        </button>
        <p class="forgot-password text-right mt-2 mb-4" style="color: black">
          <router-link to="/Register">No account: Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // login user
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert("You have successfully logged in as " + auth.currentUser.email);
          // emit event for member area
          this.$emit("loggedIn");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          alert("Invalid username.password");
        });
    },
  },
};
</script>
<style scoped>
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
.form-input {
  max-width: 35ch;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  border-radius: 5px;
  box-shadow: none;
}
.flex-container {
  display: flex;
  height: 400px;
  width: 400px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 0.1em;
}
.label {
  font-size: 16px;
}
</style>