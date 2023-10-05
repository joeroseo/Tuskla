<template>
  <div class="flex-container">
    <form
      @submit.prevent="saveOrderDetails"
      class="flex-child"
      style="border: 0.5px solid #d3d3d3; display: flex; height: 100vh"
    >
      <!-- Set height to 100vh -->
      <div style="flex: 1; padding: 10px">
        <!-- Add padding for the gap and make the child flexible -->
        <h3>Shipping Info</h3>
        <br />
        <div class="submit-form">
          <div>
            <div class="form-container" style="border: white">
              <div class="form-row">
                <label class="form-label" for="email">Email:</label>
                <input
                  class="form-input"
                  type="email"
                  id="email"
                  name="email"
                  maxlength="35"
                  required
                  v-model="email"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="firstName">First Name:</label>
                <input
                  class="form-input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  maxlength="35"
                  required
                  v-model="fname"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="lastName">Last Name:</label>
                <input
                  class="form-input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  maxlength="35"
                  required
                  v-model="lname"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="street">Street Address:</label>
                <input
                  class="form-input"
                  type="text"
                  id="street"
                  name="street"
                  maxlength="35"
                  required
                  v-model="street"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="city">City:</label>
                <input
                  class="form-input"
                  type="text"
                  id="city"
                  name="city"
                  maxlength="35"
                  required
                  v-model="city"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="state">State:</label>
                <input
                  class="form-input"
                  type="text"
                  id="state"
                  name="state"
                  maxlength="35"
                  required
                  v-model="state"
                />
              </div>
              <div class="form-row">
                <label class="form-label" for="zip">Zip:</label>
                <input
                  class="form-input"
                  type="text"
                  id="zip"
                  name="zip"
                  maxlength="15"
                  required
                  v-model="zip"
                  style="font-size: 13px; max-width: 30%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="flex: 1; padding: 10px">
        <div>
          <h3>Shipping Info</h3>
          <br />
          <div class="submit-form">
            <div>
              <div class="form-container">
                <div class="form-row">
                  <label class="form-label" for="card">Card Number:</label>
                  <input
                    class="form-input"
                    type="ccard"
                    id="ccard"
                    name="ccard"
                    maxlength="35"
                    required
                  />
                </div>
                <div class="form-row">
                  <label class="form-label" for="firstName">Expiration:</label>
                  <input
                    class="form-input"
                    type="date"
                    id="exp"
                    name="exp"
                    maxlength="35"
                    required
                  />
                </div>
                <div class="form-row">
                  <label class="form-label" for="cvc">CVC:</label>
                  <input
                    class="form-input"
                    type="text"
                    id="cvc"
                    name="cvc"
                    maxlength="35"
                    required
                    style="font-size: 13px; max-width: 30%"
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <button
                  class="btn btn-sm"
                  style="
                    margin-left: 25px;
                    border: 0.5px solid black;
                    background-color: #e0e0e0;
                  "
                  type="submit"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import VehicleOrderInfoDataService from "../services/VehicleOrderInfoDataService";
import VehicleOrderDataService from "../services/VehicleOrderDataService";
import { auth } from "../firebase/init.js";
import { initializeApp } from "firebase/app";
import { db } from "../firebase/init.js";

props: {
  objectProp: {
    type: Object;
  }
}

export default {
  name: "order-details",
  data() {
    return {
      email: "",
      fname: "",
      lname: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      order_id: "",
      submitted: false,
      status: "In-Process",
      order_total: 0,
      subtotal:
        parseInt(this.$store.state.vehicle_price) +
        parseInt(this.$store.state.paint_cost) +
        parseInt(this.$store.state.interior_cost) +
        parseInt(this.$store.state.rims_cost) +
        parseInt(this.$store.state.autopilot_cost) +
        parseInt(this.$store.state.full_self_driving_cost),
    };
  },

  methods: {
    removeAllItems() {
      console.log("removeAllItems has been called");
      for (let value of Object.values(this.$store.state.cart)) {
        console.log(value);
        this.$store.commit("addRemoveCart", { product: value, toAdd: false });
      }
      console.log("remove all items has been called");
    },

    saveOrderInfo() {
      var email = this.email;
      var data = {
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        submitted: false,
        order_id: "",
        status: "In-Process",
      };
      var order_id = "v" + Math.floor(new Date() / 1000);
      this.order_id = order_id;
      data.order_id = order_id;
      data.subtotal = this.subtotal;
      data.tax = Math.floor(0.07 * data.subtotal);
      data.shipping = Math.floor(0.05 * data.subtotal);
      data.total = data.subtotal + data.tax + data.shipping;
      VehicleOrderInfoDataService.create(data)
        .then((response) => {
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async saveOrderDetails() {
      try {
        await this.saveOrderInfo();
        const order_id = this.order_id;
        const dataEntries = [
          {
            description: this.$store.state.vehicle_description,
            price: this.$store.state.vehicle_price,
            key: "Vehicle",
          },
          {
            description: this.$store.state.paint_description,
            price: this.$store.state.paint_cost,
            key: "Paint",
          },
          {
            description: this.$store.state.interior_description,
            price: this.$store.state.interior_cost,
            key: "Interior",
          },
          {
            description: this.$store.state.interior_rows,
            price: this.$store.state.interior_row_cost,
            key: "InteriorRows",
          },
          {
            description: this.$store.state.steering_description,
            price: this.$store.state.steering_cost,
            key: "Steering",
          },
          {
            description: this.$store.state.rims_description,
            price: this.$store.state.rims_cost,
            key: "Rims",
          },
          {
            description: this.$store.state.autopilot_description,
            price: this.$store.state.autopilot_cost,
            key: "AutoPilot",
          },
          {
            description: this.$store.state.full_self_driving_description,
            price: this.$store.state.full_self_driving_cost,
            key: "FSD",
          },
          {
            description: this.$store.state.wallcharger_description,
            price: this.$store.state.wallcharger_cost,
            key: "WallCharger",
          },
          {
            description: this.$store.state.mobilecharger_description,
            price: this.$store.state.mobilecharger_cost,
            key: "MobileCharger",
          },
        ];

        // Serially process and create data entries
        for (const entry of dataEntries) {
          const data = {
            item: entry.description,
            price: entry.price,
            order_id: order_id,
          };
          if (
            data.item !== "5 Seat Option" &&
            data.item !== "Regular Steering Wheel"
          ) {
            await this.createDataAndLog(data, entry.key);
          }
        }
        // Navigate to another route after all is done
        this.$router.push({
          name: "VehicleOrderStatus",
          params: { order_id: this.order_id, email: this.email },
        });
      } catch (error) {
        console.error(error);
      }
    },

    async createDataAndLog(data, message) {
      try {
        const response = await VehicleOrderDataService.create(data);
        console.log(response.data);
        this.submitted = true;
      } catch (error) {
        console.error(error);
      }
      console.log(message);
    },
  },
};
</script>
<style>
template {
  font-family: Arial, sans-serif;
  margin: 0px;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
.flex-child {
  border: 0.5px solid black;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f4f4f4;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-label {
  font-size: 13px;
  text-align: left;
  padding-right: 10px;
  margin-left: 20px;
  min-width: 100px;
}
.form-input {
  max-width: 35ch;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
}
</style>