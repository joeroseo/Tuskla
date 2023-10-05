<template>
  <div class="container min-h-content py-5 text-center">
    <div class="col-md-8 offset-md-2">
      <div class="mb-3">
        <label for="category" class="form-label">Category </label>
        <select
          name="category"
          id="category"
          v-model="category"
          v-on:change="retrieveCategory"
        >
          <option value="" selected>All</option>
          <option value="Exterior">Exterior</option>
          <option value="Interior">Interior</option>
          <option value="Detailing">Detailing</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
    </div>
    <div class="row py-lg-5">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card shadow-sm">
            <img
              class="bd-placeholder-img card-img-top"
              width="100%"
              :src="product.image"
              alt=""
            />
            <div class="card-body">
              <p class="card-text">{{ product.name }}</p>
              <div
                class="d-flex d-flex justify-content-center align-items-center"
              >
                <div class="btn-group">
                  <CartBTN :product="product" />
                </div>
                <small class="text-muted"
                  ><i class="bi bi-currency-dollar"></i
                  >{{ product.price }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartBTN from "../components/CartBTN.vue";
import ProductDataService from "../services/ProductDataService";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "vuex";

export default {
  setup() {},

  components: { CartBTN },

  data() {
    return {
      bValue: "Not truncated",
      category: "",
      products: [],
    };
  },

  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response) => {
          this.products = response.data;
          console.log(
            "response data is" + response.data + "products " + this.products
          );
          console.log("Category is: " + this.category);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveCategory() {
      if (this.category === "") {
        ProductDataService.getAll()
          .then((response) => {
            this.products = response.data;
            console.log(
              "response data is" + response.data + "products " + this.products
            );
            console.log("Category is: " + this.category);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        ProductDataService.findByCategory(this.category)
          .then((response) => {
            this.products = response.data;
            console.log(
              "response data is" + response.data + "products " + this.products
            );
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },

  mounted() {
    this.retrieveProducts();
  },
};
</script>
<style>
label {
  padding-right: 10px;
  font-size: 22px;
}
</style>
