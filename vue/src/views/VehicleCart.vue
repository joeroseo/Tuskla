<template>
  <div class="flex-container">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <div style="margin-left: 1px">
        <div class="col-xl-12">
          <div
            class="card rounded-0 border-0"
            style="background-color: #f4f4f4"
          >
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h5 class="mb-0">Purchase Details</h5>
                <i class="bi bi-cart3 h1"></i>
              </div>
              <hr class="my-4" />
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.vehicle_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i>
                  {{ Number($store.state.vehicle_price).toLocaleString("en") }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.paint_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{ Number($store.state.paint_cost).toLocaleString("en") }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.interior_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{ Number($store.state.interior_cost).toLocaleString("en") }}
                </p>
              </div>
              <div
                v-if="$store.state.interior_row_cost !== '0'"
                class="d-flex justify-content-between"
              >
                <p class="mb-2">{{ $store.state.interior_rows }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{
                    Number($store.state.interior_row_cost).toLocaleString("en")
                  }}
                </p>
              </div>
              <div
                v-if="$store.state.steering_cost != '0'"
                class="d-flex justify-content-between"
              >
                <p class="mb-2">{{ $store.state.steering_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{ Number($store.state.steering_cost).toLocaleString("en") }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.rims_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{ Number($store.state.rims_cost).toLocaleString("en") }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.autopilot_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{
                    Number($store.state.autopilot_cost).toLocaleString("en")
                  }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">
                  {{ $store.state.full_self_driving_description }}
                </p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{
                    Number($store.state.full_self_driving_cost).toLocaleString(
                      "en"
                    )
                  }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.wallcharger_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{
                    Number($store.state.wallcharger_cost).toLocaleString("en")
                  }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">{{ $store.state.mobilecharger_description }}</p>
                <p class="mb-2">
                  <i class="bi bi-currency-dollar"></i
                  >{{
                    Number($store.state.mobilecharger_cost).toLocaleString("en")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <div class="col-lg-12">
        <br />
        <div class="card rounded-0 border-0" style="background-color: #f4f4f4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0">Order Details</h5>
            </div>
            <hr class="my-4" />
            <div class="d-flex justify-content-between">
              <p class="mb-2">Subtotal</p>
              <p class="mb-2" style="margin-right: 10px">
                <i class="bi bi-currency-dollar"></i
                >{{ Number(order_total).toLocaleString("en") }}
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">Tax</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{
                  Number(Math.floor(order_total * 0.07)).toLocaleString("en")
                }}
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">Destination Fee</p>
              <p class="mb-2"><i class="bi bi-currency-dollar"></i>1,390</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">*Order Fee</p>
              <p class="mb-2"><i class="bi bi-currency-dollar"></i>250</p>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <p class="mb-2">Total</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{
                  Number(
                    Math.floor(order_total * 1.07) + 1500 + 250
                  ).toLocaleString("en")
                }}
              </p>
            </div>
            <p style="font-size: 13px">
              <strong
                >*The $250 order fee is due today and the balance upon delivery
              </strong>
            </p>
            <br />
            <router-link to="/vehicleaddorder" custom v-slot="{ navigate }">
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
</template>
<script>
import AddOrder from "../views/AddOrder.vue";
import CartAddRemove2 from "../components/CartAddRemove2.vue";
import CartDataService from "../services/CartDataService";
import OrderDataService from "../services/OrderDataService";
import { auth } from "../firebase/init.js";
import { initializeApp } from "firebase/app";
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
      order_total:
        parseInt(this.$store.state.vehicle_price) +
        parseInt(this.$store.state.paint_cost) +
        parseInt(this.$store.state.interior_cost) +
        parseInt(this.$store.state.rims_cost) +
        parseInt(this.$store.state.autopilot_cost) +
        parseInt(this.$store.state.full_self_driving_cost),
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

  mounted() {
    if (
      this.$store.state.autopilot_cost > 0 &&
      this.$store.state.full_self_driving_cost > 0
    ) {
      this.$store.state.autopilot_cost = 0;
      this.$store.state.autopilot_description =
        "Autopilot included with Full Self Driving";
    }
    this.$store.state.VehicleTotal =
      parseInt(this.$store.state.vehicle_price) +
      parseInt(this.$store.state.paint_cost) +
      parseInt(this.$store.state.interior_cost) +
      parseInt(this.$store.state.rims_cost) +
      parseInt(this.$store.state.autopilot_cost) +
      parseInt(this.$store.state.full_self_driving_cost);
  },
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