<template>
  <br />
  <br />
  <div class="flex-container" style="border: 0.5px solid #d3d3d3">
    <div class="vue-tempalte">
      <form @submit.prevent="signUp">
        <h3>Register</h3>
        <br />
        <div class="mb-3">
          <label>Email address</label><br />
          <input
            type="email"
            class="form-input"
            v-model="email"
            requied
            style="font-size: 16px"
          />
        </div>
        <div class="mb-3">
          <label>Password</label><br />
          <input
            type="password"
            class="form-input"
            v-model="password"
            required
            style="font-size: 16px"
          />
        </div>
        <br />
        <button
          type="submit"
          class="btn btn-sm"
          style="border: 0.5px solid black; background-color: #e0e0e0"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init.js";

export default {
  name: "SignUp",
  // register event to emit
  emits: ["loggedIn"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      // register and login user
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // update 'displayName'
          updateProfile(auth.currentUser, {
            displayName: this.username,
          })
            .then(() => {
              // emit event
              //this.$emit('loggedIn')
              alert("You have successfully registered " + auth.currentUser.email);
              this.$router.push({ path: "/" });
            })
            .catch((error) => {
              alert("Invalid Data.  The account may exist or the password may be to short");
              console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
          alert("Invalid Data.  The account may exist or the password may be to short");
          console.error("Error signing up:", error);
        });
    },
  },
};
</script>
<style scoped>
.form-input {
  max-width: 35ch;
  padding: 5px;
  border-radius: 3px;
  font-size: 14px;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
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


