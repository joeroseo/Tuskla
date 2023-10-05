<template>
<br>
  <div>
    <button @click="deleteAllDocuments">Delete All Documents</button>
    {{delivery_date}}
  </div>
<br> <br>
<p> <h5> <strong> Existing Documents </strong> </h5>  </p> <br> 
  <div v-if="showDeletedDocumentsSection">
    <div v-for="DocId in DocumentIds" :key="DocId">
      <p>{{ DocId }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mitt from "mitt";
import eventBus from "../eventBus"; // Adjust the import path
import { auth } from "../firebase/init.js";
import { initializeApp } from "firebase/app";
import { db } from "../firebase/init.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "App",
  // ... (other component properties)

  data() {
    return {
      delivery_date: "",
      DocumentIds: [], // Array to hold deleted document IDs
      showDeletedDocumentsSection: true,
    };
  },

  methods: {
    createNewSubscriber: function () {
      // ... (your existing method to add documents)
    },

    deleteAllDocuments: async function () {
      const mailCollection = collection(db, "mail");
      const mailQuery = query(mailCollection);

      try {
        const querySnapshot = await getDocs(mailQuery);

        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log(`Document with ID ${doc.id} deleted.`);
        });

        this.DocumentIds = []; // Clear the deleted document IDs
        this.showDeletedDocumentsSection = false; // Hide the section

        console.log("All documents deleted.");
      } catch (error) {
        console.error("Error deleting documents:", error);
      }
      alert("All documents have been deleted");

      //     eventBus.emitter.emit("open-dropdown");
      this.$router.push("/");
      //this.$router.go(-1);
    },

    async getMail() {
      const mailCollection = collection(db, "mail");
      const mailQuery = query(mailCollection);

      try {
        const querySnapshot = await getDocs(mailQuery);

        querySnapshot.forEach(async (doc) => {
          console.log(`Document with ID ${doc.id} deleted.`);
        });

        querySnapshot.forEach(async (doc) => {
          //await deleteDoc(doc.ref);
          this.DocumentIds.push(doc.id);
        });
      } catch (error) {
        console.error("Error obtaining documents:", error);
      }
    },
  },

  // ... (your data, mounted, and other component lifecycle methods)

  mounted() {
    if (!auth.currentUser || auth.currentUser.email != "admin@tuskla.com") {
      alert("You must be logged in as admin@tuskla.com to view this");
      this.$router.push({ path: "/" });
    }
    this.getMail();
  },
};
</script>

<style>
.btn-bg {
  background-color: #1d1d1d;
}
</style>
