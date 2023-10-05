<template>
  <div class="flex-container">
    <form
      @submit.prevent="saveOrderDetails"
      class="flex-child"
      style="border: 0.5px solid #d3d3d3; display: flex; height: 100vh"
    >
      <!-- Set height to 100vh -->
      <div style="flex: 1; padding: 10px">
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
import OrderInfoDataService from "../services/OrderInfoDataService";
import OrderDataService from "../services/OrderDataService";
import OrderStatus from "../views/OrderStatus.vue";
import { useStore } from "vuex";
import { auth } from "../firebase/init.js";
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
    };
  },

  components: { OrderStatus },

  methods: {
    submitData() {
      alert("Submitted Data");
    },

    removeAllItems() {
      console.log("removeAllItems has been called");
      for (let value of Object.values(this.$store.state.cart)) {
        console.log(value);
        this.$store.commit("addRemoveCart", { product: value, toAdd: false });
      }
      console.log("remove all items has been called");
    },

    saveOrderDetails() {
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
      var order_id = Math.floor(new Date() / 1000);
      this.order_id = order_id;
      this.$store.state.current_order_id = this.order_id;
      data.order_id = order_id;
      data.subtotal = this.$store.state.cartTotal;
      data.tax = Math.floor(0.07 * data.subtotal);
      data.shipping = Math.floor(0.05 * data.subtotal);
      data.total = data.subtotal + data.tax + data.shipping;
      OrderInfoDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      var data2 = {
        item: "",
        price: null,
        quantity: null,
        itemTotal: null,
        order_id: "",
        id: null,
      };

      //Structure of item array below

      //name        item 1,0      Cargo mats
      //price       item 1,1      220
      //category    item 1,2      Interior
      //image       item 1,3      ../img/uploads/CargoMats.jpg
      //id          item 1,4      2
      //isAvailable item 1,5      yes
      //createdAt   item 1,6      2023-08-10T02:06:29.000Z
      //updatedAt   item 1,7      2023-09-26T14:44:14.000Z
      //quantity    item 1,8      3

      //To output item 0 - console.log("item 1,0 " + items[0]);

      for (let product of this.$store.state.cart) {
        let items = Object.values(product);

        data2.item = items[0];
        data2.price = parseFloat(items[1]).toFixed(2); // Assuming price is at index 1
        data2.quantity = items[8]; // Assuming quantity is at index 8
        data2.itemTotal = data2.price * data2.quantity;
        data2.order_id = order_id;
        OrderDataService.create(data2)
          .then((response) => {
            //this.order.id = response.data.id;
            //console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }

      this.$emit("clear-quantities");
      this.removeAllItems();
      this.$router.push({
        name: "OrderStatus",
        params: { order_id, email },
      });
    },
  },

  mounted() {
    if (this.$store.state.cart.length === 0) {
      this.$router.push({ name: "Products" });
    }
  },
};
</script>
 

<style>
</style>
