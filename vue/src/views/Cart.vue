<template>
  <div class="flex-container">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <h5 class="mb-3">
        <router-link :to="{ name: 'Products' }" class="text-body"
          ><i class="fas fa-long-arrow-alt-left me-2"></i>Continue
          Shopping</router-link
        >
      </h5>
      <hr />
      <div style="margin-left: 65px">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p class="mb-0">
              You have {{ $store.state.cart.length }} items in your cart
            </p>
          </div>
        </div>
        <div
          v-for="item in $store.state.cart"
          class="card mb-3 shadow-sm border-0"
          :key="item.id"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    :src="item.image"
                    class="img-fluid rounded-3"
                    alt="Shopping item"
                    style="width: 100px; padding-left: 20px"
                  />
                </div>
              </div>
            </div>
            <div class="ms-3 d-flex flex-row align-items-center">
              <p>{{ item.name }}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
              <div>
                <CartAddRemove2 :product="item" />
              </div>
              <div class="d-flex flex-row align-items-center">
                <div>
                  <h5 class="mb-0 mx-0" style="font-size: 15px">
                    <i class="bi bi-currency-dollar"></i
                    >{{ item.price * item.qty }}
                  </h5>
                  <small
                    v-if="item.hasDiscount"
                    class="text-muted text-decoration-line-through"
                    ><i class="bi bi-currency-dollar"></i
                    >{{ item.price }}</small
                  >
                </div>
                <a
                  role="button"
                  @click="removeItem(item)"
                  class="ms-4"
                  style="color: black"
                  ><i class="bi bi-trash3 h4"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <div class="col-lg-12">
        <div class="card rounded-0 border-0" style="background-color: #f4f4f4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0">Cart details</h5>
              <i class="bi bi-cart3 h1"></i>
            </div>
            <hr class="my-4" />
            <div class="d-flex justify-content-between">
              <p class="mb-2">Subtotal</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ $store.state.cartTotal }}
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">Tax</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ Math.floor($store.state.cartTotal * 0.07) }}
              </p>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <p class="mb-2">Total</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ Math.floor($store.state.cartTotal * 1.07) }}
              </p>
            </div>
            <div v-if="$store.state.cart.length > 0">
              <router-link to="/addorder" custom v-slot="{ navigate }">
                <button
                  class="btn btn-sm"
                  style="border: 0.5px solid black; background-color: #e0e0e0"
                  @click="navigate"
                  role="link"
                >
                  Add Order
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddOrder from "../views/AddOrder.vue";
import CartAddRemove2 from "../components/CartAddRemove2.vue";
import CartDataService from "../services/CartDataService";
import OrderDataService from "../services/OrderDataService";
import { useStore } from "vuex";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";

export default {
  data() {
    return {
      order: {
        id: "1",
        subtotal: "",
        tax: "",
        total: "",
      },
      submitted: false,
      isComponent: "Cart",
    };
  },

  components: { CartAddRemove2, AddOrder },

  methods: {
    removeItem(item) {
      console.log("item is ", item);
      this.$store.commit("addRemoveCart", { product: item, toAdd: false });
    },

    checkOut() {
      this.isComponent = "AddOrder";
    },

    saveCart() {
      var data = {
        subtotal: Math.floor(this.$store.state.cartTotal),
        tax: Math.floor(this.$store.state.cartTotal * 0.07),
        total: Math.floor(this.$store.state.cartTotal * 1.07),
        id: null,
      };
      var data2 = {
        item: "",
        price: "",
        quantity: "",
        order_id: "",
        id: null,
      };
      CartDataService.create(data)
        .then((response) => {
          this.order.id = response.data.id;
          //        console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      //Structure of item array below
      //0:1 (id)
      //1:"Cargo Mats" (name)
      //2:"http://localhost:8081/img/CargoMats.jpg" (image)
      //3:100 (price)
      //4:8 (quantity)

      //Create an unique order-id
      var order_id = Math.floor(new Date() / 1000);

      for (let product of this.$store.state.cart) {
        let items = Object.values(product);
        data2.item = items[(1, 1)];
        data2.price = items[(1, 3)];
        data2.quantity = items[(1, 4)];
        data2.order_id = order_id;
        OrderDataService.create(data2)
          .then((response) => {
            this.order.id = response.data.id;
            //console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },

  mounted() {},
};
</script>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f4f4f4;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: 10px;
  margin-bottom: 0.1em;
  margin-top: 0.1em;
}
p {
  margin-bottom: 0.1em;
  margin-top: 0.1em;
  margin: 10px;
  font-size: 14px;
}
label {
  font-size: 14px;
}
ul {
  margin-bottom: 0.1em;
  margin-top: 0.1em;
  font-size: 14px;
}
table {
  margin: 10px;
  font-size: 14px;
}
</style>
