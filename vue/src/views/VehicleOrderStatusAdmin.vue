<template>
  <div class="flex-container" ref="flexContainer">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <div class="list row">
        <div class="col-md-8">
          <div v-if="!this.currentOrder">
            <h6><strong> Select Order ID to see details </strong></h6>
            <br />
          </div>
        </div>
        <div class="col-md-6" style="width: 100%">
          <h4>Order list"</h4>
          <br />
          <table
            class="table is-striped is-bordered mt-42 is-fullwidth"
            style="border: 0.5px solid #d3d3d3; margin: auto"
          >
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(orders, index) in orderInfoList"
                :key="index"
                @click="setActiveOrder(orders, index)"
              >
                <td>{{ orders.order_id }}</td>
                <td>{{ orders.createdAt.slice(0, 10) }}</td>
                <td>{{ orders.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-show="showItem"
      class="flex-child"
      style="border: 0.5px solid #d3d3d3"
    >
      <h4 style="margin-top: 10px">Order Details</h4>
      <button
        @click="orderShipping"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Shipping
      </button>
      &nbsp
      <button
        @click="orderItems"
        class="btn btn-sm"
        style="border: 0.5px solid black; background-color: #e0e0e0"
      >
        Items
      </button>
      &nbsp
      <button
        @click="orderStatus"
        class="btn btn-sm"
        style="border: 0.5px solid black; background-color: #e0e0e0"
      >
        Change Status
      </button>
      <br />
      <br />
      <ul
        v-for="(orderInfoItem, index) in orderInfoList2"
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
              <i class="bi bi-currency-dollar"></i>{{ orderInfoItem.subtotal }}
            </p>
          </div>
          <div class="d-flex justify-content-between" style="line-height: 40%">
            <p class="mb-2" style="line-height: 40%">Tax</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i>{{ orderInfoItem.tax }}
            </p>
          </div>
          <div class="d-flex justify-content-between" style="line-height: 40%">
            <p class="mb-2">Shipping</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i>{{ orderInfoItem.shipping }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between mb-4"
            style="line-height: 40%"
          >
            <p class="mb-2">Total</p>
            <p class="mb-2">
              <i class="bi bi-currency-dollar"></i>{{ orderInfoItem.total }}
            </p>
          </div>
        </div>
      </ul>
      <table class="table is-striped is-bordered mt-2 is-fullwidth">
        <thead>
          <tr style="text-align: left">
            <th style="text-align: left">Item</th>
            <th style="text-align: right">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderListItem, index) in orderItemList" :key="index">
            <td style="text-align: left">{{ orderListItem.item }}</td>
            <td style="text-align: right">{{ orderListItem.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="showOrder">
      <h4 style="margin-top: 10px">Order Details</h4>
      <button
        @click="orderShipping"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Shipping
      </button>
      &nbsp
      <button
        @click="orderItems"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Items
      </button>
      &nbsp
      <button
        @click="orderStatus"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Change Status
      </button>
      <br />
      <br />
      <div class="list">
        <ul v-for="(orderInfoItem, index) in orderInfoList2" :key="index">
          <p><label>Order ID:</label> {{ orderInfoItem.order_id }}</p>
          <p><label>Status:</label> {{ orderInfoItem.status }}</p>
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
    <div v-show="showStatus">
      <h4 style="margin-top: 10px">Order {{ current_order_id }}</h4>
      <button
        @click="orderShipping"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Shipping
      </button>
      &nbsp
      <button
        @click="orderItems"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Items
      </button>
      &nbsp
      <button
        @click="orderStatus"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Change Status
      </button>
      <br />
      <br />
      <div class="mb-3">
        <label for="newstatus" class="form-label">New Status</label><br />
        <select name="newstatus" id="newstatus" v-model="newstatus">
          <option value="In-Process" selected>In-Process</option>
          <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <br />
      <button
        @click="changeStatus"
        class="btn btn-sm"
        style="
          margin-left: 25px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Change Status
      </button>
    </div>
  </div>
</template>

<script>
import VehicleOrderInfoDataService from "../services/VehicleOrderInfoDataService";
import VehicleOrderInfoDataService2 from "../services/VehicleOrderInfoDataService2";
import VehicleOrderDataService from "../services/VehicleOrderDataService";
import axios from "axios";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default {
  name: "orderInfoList-list",
  data() {
    return {
      orderInfoList: [],
      orderInfoList2: [],
      orderItemList: [],
      currentOrder: null,
      showOrder: false,
      showItem: false,
      showStatus: false,
      currentIndex: -1,
      current_order_id: "",
      order_id: "",
      email: "",
      status: "",
      newstatus: "In-Process",
      id: "",
      auth: auth,
      mail_to: "",
      mail_subject: "Order status changed",
      mail_html: "",
    };
  },

  methods: {
    sendEmail: async function () {
      this.mail_html =
        "The status for your vehicle order, order_id: " +
        this.order_id +
        ", has changed.  The new status is: <br><br>" +
        this.newstatus +
        "<br><br>To check on your order go to the Tuskla website, log in with your email (if you do not have an account create one) then select: <br> <br>Menu <br>- User Menus <br>- Search Vehicle Order";

      try {
        console.log("this.email is " + this.email);
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

    orderItems() {
      this.showItem = true;
      this.showOrder = false;
      this.showStatus = false;
    },

    orderShipping() {
      this.showOrder = true;
      this.showItem = false;
      this.showStatus = false;
    },

    orderStatus() {
      this.showOrder = false;
      this.showItem = false;
      this.showStatus = true;
    },

    changeStatus() {
      this.orderInfoList2[0].status = this.newstatus;
      this.updateOrder();
      this.sendEmail();
    },

    retrieveAllOrders() {
      VehicleOrderInfoDataService.getAll()
        .then((response) => {
          this.orderInfoList = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveOrders();
      this.currentOrder = null;
      this.currentIndex = -1;
    },

    setActiveOrder(orderInfoItem, index) {
      this.showItem = false;
      this.showOrder = true;
      this.showStatus = false;
      this.currentOrder = orderInfoItem;
      this.current_id = orderInfoItem.id;
      this.current_order_id = orderInfoItem.order_id;
      this.currentIndex = orderInfoItem ? index : -1;
      this.searchOrderInfo();
      this.searchOrderData();
      // Scroll the flex container to the top
      const flexContainer = this.$refs.flexContainer;
      flexContainer.scrollIntoView({ behavior: "smooth" });
    },

    searchOrderInfo() {
      VehicleOrderInfoDataService.findByOrderId(this.current_order_id)
        .then((response) => {
          this.orderInfoList2 = response.data;
          console.log(response.data);
          this.order_id = this.orderInfoList2[0].order_id;
          this.status = this.orderInfoList2[0].status;
          this.mail_to = this.orderInfoList2[0].email;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchOrderData() {
      VehicleOrderDataService.findByOrderId(this.current_order_id)
        .then((response) => {
          this.orderItemList = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOrder() {
      VehicleOrderInfoDataService.update(
        this.current_id,
        this.orderInfoList2[0]
      )
        .then((response) => {
          alert(
            "The order was updated successfully to '" +
              this.newstatus +
              "'. An email has been sent to '" +
              this.mail_to +
              "' confirming the change."
          );
        })
        .catch((e) => {
          console.log(e);
        });
      this.showOrder = true;
      this.showItem = false;
      this.showStatus = false;
    },
  },

  mounted() {
    if (!auth.currentUser || auth.currentUser.email != "admin@tuskla.com") {
      alert("You must be logged in as admin@tuskla.com to view this");
      this.$router.push({ path: "/" });
    } else {
      this.email = auth.currentUser.email;
      this.retrieveAllOrders();
    }
  },
};
</script>

<style >
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
  margin: -10px;
  font-size: 14px;
}
</style>