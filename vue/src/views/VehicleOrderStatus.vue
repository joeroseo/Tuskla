<template>
  <div class="flex-container">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <p><strong>The Order Summary is below:</strong></p>
      <br />
      <div class="list">
        <ul v-for="(orderInfoItem, index) in orderInfoList" :key="index">
          <p><label>Order ID:</label> {{ orderInfoItem.order_id }}</p>
          <p><label>Email:</label> {{ orderInfoItem.email }}</p>
          <p><label>First Name:</label> {{ orderInfoItem.fname }}</p>
          <p><label>Last Name:</label> {{ orderInfoItem.lname }}</p>
          <p><label>Address:</label> {{ orderInfoItem.street }}</p>
          <p><label>City:</label> {{ orderInfoItem.city }}</p>
          <p><label>State:</label> {{ orderInfoItem.state }}</p>
          <p><label>Zip:</label> {{ orderInfoItem.zip }}</p>
        </ul>
      </div>
    </div>
    <div
      class="flex-child"
      style="border: 0.5px solid #d3d3d3; align-items: stretch"
    >
      <p><strong>The Order Details are below:</strong></p>
      <br />
      <ul
        v-for="(orderInfoItem, index) in orderInfoList"
        :key="index"
        style="line-height: 40%"
      >
        <div
          style="
            margin-right: 40px;
            margin-left: 1px;
            font-size: 14px;
            line-height: 40%;
          "
        >
          <div class="d-flex justify-content-between" style="line-height: 40%">
            <p class="mb-2" style="line-height: 40%">Subtotal</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i
              >{{ Number(orderInfoItem.subtotal).toLocaleString("en") }}
            </p>
          </div>
          <div class="d-flex justify-content-between" style="line-height: 40%">
            <p class="mb-2" style="line-height: 40%">Tax</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i
              >{{ Number(orderInfoItem.tax).toLocaleString("en") }}
            </p>
          </div>
          <div class="d-flex justify-content-between" style="line-height: 40%">
            <p class="mb-2">Shipping</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i
              >{{ Number(orderInfoItem.shipping).toLocaleString("en") }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between mb-4"
            style="line-height: 40%"
          >
            <p class="mb-2">Total</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i
              >{{ Number(orderInfoItem.total).toLocaleString("en") }}
            </p>
          </div>
        </div>
      </ul>
      <table class="table is-striped is-bordered mt-2 is-fullwidth">
        <thead>
          <tr style="text-align: left">
            <th style="text-align: left">Item</th>
            <th style="text-align: left">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderListItem, index) in orderItemList" :key="index">
            <td style="text-align: left">{{ orderListItem.item }}</td>
            <td style="text-align: left">{{ orderListItem.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import VehicleOrderInfoDataService from "../services/VehicleOrderInfoDataService";
import VehicleOrderInfoDataService2 from "../services/VehicleOrderInfoDataService2";
import VehicleOrderDataService from "../services/VehicleOrderDataService";
import axios from "axios";
import mitt from "mitt";
import eventBus from "../eventBus";
import { db } from "../firebase/init.js";
import { useStore } from "vuex";
import { auth } from "../firebase/init.js";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default {
  name: "orderInfoList-list",

  props: ["order_id", "email"],

  data() {
    return {
      orderInfoList: [],
      orderInfoList2: [],
      orderItemList: [],
      currentOrder1: null,
      showOrder: false,
      showItem: false,
      showStatus: false,
      currentIndex: -1,
      current_order_id: "",
      status: "",
      newstatus: "In-Process",
      id: "",
      mail_to: "",
      mail_subject: "Order confirmation",
      mail_html:
        "Thank you for your Tuskla Vehicle order.  <br> <br> Your Order ID is: " +
        this.order_id +
        ". <br> <br> To check on your order go to the Tuskla website, log in with your email (if you do not have an account create one) then select: <br> <br>Menu <br>- User Menus <br>- Search Vehicle Orders",
    };
  },

  methods: {
    sendEmail: async function () {
      try {
        this.mail_to = this.email;
        const result = await addDoc(collection(db, "mail"), {
          from: "ServiceManager@tuskla.com <servce@tuskla.com>",
          to: this.mail_to,
          message: {
            subject: this.mail_subject,
            text: "This is the plaintext section of the email body.",
            html: this.mail_html,
          },
        });

        console.log("Email sent successfully:", result);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },

    searchVehicleOrderInfo() {
      VehicleOrderInfoDataService.findByOrderId(this.order_id)
        .then((response) => {
          this.orderInfoList = response.data;
          console.log("resonse data is" + response.data);
          this.order_id = this.orderInfoList[0].order_id;
          this.status = this.orderInfoList[0].status;
          this.mail_to = this.orderInfoList[0].email;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchVehicleOrderData() {
      VehicleOrderDataService.findByOrderId(this.order_id)
        .then((response) => {
          this.orderItemList = response.data;
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  created() {
    // Introduce a 1-second delay before making the calls
    setTimeout(() => {
      this.searchVehicleOrderInfo();
      this.searchVehicleOrderData();
      this.sendEmail();
    }, 500); // 1000 milliseconds (1 second)
  },
};
</script>

<style scoped>
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