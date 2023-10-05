<template></template>

<script>
/* eslint-disable */

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { signOut } from "firebase/auth";

export default {
  methods: {
    signOut() {
      signOut(auth).then(() => {
        // user signed-out
        this.isLoggedIn = false;
      });
    },
  },
  mounted() {
    if (auth.currentUser) {
      alert(auth.currentUser.email + "will be logged out");
      this.signOut();
      this.$router.push({ path: "/" });
    } else {
      alert("You are not logged in");
      this.$router.push({ path: "/" });
    }
  },
};
</script>
