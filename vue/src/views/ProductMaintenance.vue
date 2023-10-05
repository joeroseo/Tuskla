<template>
  <div class="flex-container" ref="flexContainer">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <div class="list row">
        <div class="col-md-8">
          <div v-if="!currentProduct">
            <div class="d-flex justify-content-between align-items-center">
              <h6><strong>Select Product to see details</strong></h6>
            </div>
          </div>
        </div>
        <div class="col-md-6" style="width: 100%">
          <h4 class="d-flex justify-content-between align-items-center">
            Product list
            <!-- Add button on the same line as "Product list" -->
            <router-link to="FileUpload">
              <button
                class="btn btn-sm"
                style="border: 0.5px solid black; background-color: #e0e0e0"
                type="button"
              >
                Add
              </button>
            </router-link>
          </h4>
          <br />

          <table
            class="table is-striped is-bordered mt-42 is-fullwidth"
            style="border: 0.5px solid #d3d3d3; margin: auto"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in productInfoList"
                :key="index"
                @click="setActiveProduct(product, index)"
              >
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="flex-child"
      style="border: 0.5px solid #d3d3d3"
      v-if="currentProduct"
    >
      <h4 style="margin-top: 10px">Product Details</h4>
      <br />
      <!-- Add a form for editing product details -->
      <form @submit.prevent="updateProduct('yes')">
        <div class="form-group text-center">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="currentProduct.name"
            :style="{ width: '15ch', margin: '0 auto', 'text-align': 'center' }"
          />
        </div>
        <br />
        <div class="form-group text-center">
          <label for="price">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="currentProduct.price"
            :style="{ width: '10ch', margin: '0 auto' }"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="category">Category</label>
          <div class="input-group">
            <select
              class="form-control text-center category-select"
              id="category"
              v-model="currentProduct.category"
              ref="categorySelect"
              @click="toggleDropdown"
            >
              <option value="Exterior">Exterior</option>
              <option value="Interior">Interior</option>
              <option value="Detailing">Detailing</option>
              <option value="Accessories">Accessories</option>
            </select>
            <div class="input-group-append">
              <span
                class="input-group-text"
                style="cursor: pointer"
                @click="toggleDropdown"
              >
                <i class="fas fa-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
        <br />
        <div
          class="form-group text-center"
          style="display: flex; justify-content: center"
        >
          <button
            type="submit"
            class="btn btn-sm"
            style="border: 0.5px solid black; background-color: #e0e0e0"
          >
            Save
          </button>
          &nbsp &nbsp
          <button
            class="btn btn-sm"
            style="border: 0.5px solid black; background-color: #e0e0e0"
            @click="deleteProduct()"
          >
            Delete
          </button>
          &nbsp &nbsp
          <router-link to="/productmaintenance" @click.native="cancelAndReload">
            <button
              class="btn btn-sm"
              style="border: 0.5px solid black; background-color: #e0e0e0"
              type="button"
            >
              Cancel
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

import axios from "axios";
import mitt from "mitt";
import eventBus from "../eventBus";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// Paste your Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpjMtz_M_2ZGUGHkRnO5qlOwmfYgMp2-Y",
  authDomain: "newsletter-page-ef74b.firebaseapp.com",
  projectId: "newsletter-page-ef74b",
  storageBucket: "newsletter-page-ef74b.appspot.com",
  messagingSenderId: "935904947041",
  appId: "1:935904947041:web:bb29965a0068ee3e683320",
};

export default {
  name: "App",

  data() {
    return {
      productInfoList: [],
      currentProduct: null,
      current_id: "",
      isDropdownOpen: false, // Added to track dropdown state
      deleteClicked: false,
    };
  },

  methods: {
    retrieveAllProducts() {
      ProductDataService.getAll()
        .then((response) => {
          this.productInfoList = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setActiveProduct(product, index) {
      this.currentProduct = { ...product };
      this.current_id = this.currentProduct.id;
      // Scroll the flex container to the top
      const flexContainer = this.$refs.flexContainer;
      flexContainer.scrollIntoView({ behavior: "smooth" });
    },

    updateProduct() {
      if (!this.deleteClicked) {
        // Only run updateProduct if the Delete button hasn't been clicked
        var data = {
          id: this.current_id,
          name: this.currentProduct.name,
          price: this.currentProduct.price,
          category: this.currentProduct.category,
          image: this.currentProduct.image,
          isAvailable: "yes", // Initialize isAvailable
        };
        ProductDataService.update(this.current_id, data)
          .then((response) => {
            console.log("data.isAvailable is " + data.isAvailable);
            this.currentProduct = null;
          })
          .catch((error) => {
            console.error("Error submitting form data:", error);
            alert("Error submitting form data.");
            return;
          });
        setTimeout(() => {
          this.retrieveAllProducts();
        }, 500);
        this.$router.push({ name: "ProductMaintenance" });
      }
    },

    deleteProduct() {
      this.deleteClicked = true; // Set the flag to true when Delete is clicked
      var data = {
        id: this.current_id,
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        category: this.currentProduct.category,
        image: this.currentProduct.image,
        isAvailable: "no",
      };
      data.isAvailable = "no";
      console.log("isAvailable= " + data.isAvailable);
      ProductDataService.update(this.current_id, data)
        .then((response) => {
          this.currentProduct = null;
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          alert("Error submitting form data.");
          return;
        });
      setTimeout(() => {
        this.retrieveAllProducts();
      }, 500);

      this.$router.push({ name: "ProductMaintenance" });
    },

    cancelAndReload() {
      this.currentProduct = null; // Set currentProduct to null
      setTimeout(() => {
        this.retrieveAllProducts();
      }, 500);
    },
  },

  mounted() {
    if (!auth.currentUser || auth.currentUser.email != "admin@tuskla.com") {
      alert("You must be logged in as admin@tuskla.com to view this");
      this.$router.push({ path: "/" });
    }
    // Introduce a 1-second delay before making the calls
    setTimeout(() => {
      this.retrieveAllProducts();
    }, 500); // 1000 milliseconds (1 second)
  },
};
</script>

<style>
.btn-bg {
  background-color: #1d1d1d;
}
.category-select {
  width: 50pxh; /* Adjust the width as needed */
}
</style>
