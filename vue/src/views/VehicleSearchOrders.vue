<template>
  <div class="flex-container">
    <div class="flex-child" style="border: .5px solid #D3D3D3; " >
  <div class="list row">
    <div class="col-md-8">
<div v-if =!currentOrder>
 <h6> <strong> Select Order ID to see details </strong> </h6> <br>
</div>
    </div>
    <div class="col-md-6" style="width: 100%">
      <h4>Order list for "{{ email }}"  </h4> <br>
<table class="table is-striped is-bordered mt-42 is-fullwidth" style="border: .5px solid black; background-color: #f0f0f0; margin: auto">
            <thead>
                <tr>
                  <th>Order Id</th>
                  <th> Date</th>
                  <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(orders, index) in orderInfoList" :key="index" 
                @click="setActiveOrder(orders, index)" >
                    <td>{{ orders.order_id}}</td>
                    <td>{{ orders.createdAt.slice(0,10) }}</td>
                    <td>{{ orders.total }}</td>
                    <td>{{ orders.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
<div class="flex-child" style="border: .5px solid #D3D3D3; " >
<div v-show ="showItem">
  <h4 style="margin-top: 10px;" >Order Details  </h4> 
      <button @click="orderItems" class="btn btn-sm style="margin-left: 25px; border: .5px solid black; background-color: #f0f0f0""> Items </button> &nbsp
      <button @click="orderShipping" class="btn btn-sm" style="border: .5px solid black; background-color: #f0f0f0"> Shipping </button> <br> <br>
    <ul v-for="(orderInfoItem, index) in orderInfoList2" :key="index"  style="line-height: 40%" >
            <div style="margin-right: 40px; margin-left: 1px; font-size: 14px; line-height: 40%">
            <div class="d-flex justify-content-between"  style="line-height: 40%">
              <p class="mb-2"  style="line-height: 40%">Subtotal</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ orderInfoItem.subtotal }}
              </p>
            </div>
            <div class="d-flex justify-content-between"  style="line-height: 40%">
              <p class="mb-2"  style="line-height: 40%">Tax</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ orderInfoItem.tax }}
              </p>
            </div>
            <div class="d-flex justify-content-between"  style="line-height: 40%">
              <p class="mb-2">Shipping</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ orderInfoItem.shipping }}
              </p>
            </div>
            <div class="d-flex justify-content-between mb-4"  style="line-height: 40%">
              <p class="mb-2">Total</p>
              <p class="mb-2">
                <i class="bi bi-currency-dollar"></i
                >{{ orderInfoItem.total }}
              </p>
            </div>
            </div>
</ul>
<table class="table is-striped is-bordered mt-42 is-fullwidth" style="border: .5px solid #D3D3D3; margin: auto" ref="table1" >
            <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(orderListItem, index) in orderItemList" :key="orderListItem.id"  >
                    <td>{{ orderListItem.item}}</td>
                    <td>{{ orderListItem.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
<div v-show="showOrder">
  <h4 style="margin-top: 10px;" >Order Details</h4> 
      <button @click="orderItems" class="btn btn-sm" style="margin-left: 25px; border: .5px solid black; background-color: #f0f0f0"> Items </button> &nbsp
      <button @click="orderShipping" class="btn btn-sm" style="border: .5px solid black; background-color: #f0f0f0"> Shipping </button> <br> <br>
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
</div>
</div>
</template>

<script>
import VehicleOrderInfoDataService from "../services/VehicleOrderInfoDataService";
import VehicleOrderInfoDataService2 from "../services/VehicleOrderInfoDataService2";
import VehicleOrderDataService from "../services/VehicleOrderDataService";
import axios from "axios";
import { auth } from "../firebase/init.js";

export default {
  name: "orderInfoList-list",
  data() {
    return {
      orderInfoList: [],
      orderInfoList2: [],
      orderItemList: [],
      currentOrder1: null,
      showOrder: false,
      showItem: false,
      currentIndex: -1,
      current_order_id: "",
      order_id: "",
      email: "",
      top: 0,
    };
  },

  methods: {
    orderItems() {
      this.showItem = true;
      this.showOrder = false;
    },

    orderShipping() {
      this.showOrder = true;
      this.showItem = false;
    },

    retrieveOrders() {
      VehicleOrderInfoDataService2.findByEmail(this.email)
        .then((response) => {
          this.orderInfoList = response.data;
          console.log(
            "response data is" + response.data + "products " + this.products
          );
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
      this.showItem = true;
      this.showOrder = false;
      this.currentOrder = orderInfoItem;
      this.current_order_id = orderInfoItem.order_id;
      this.currentIndex = orderInfoItem ? index : -1;
      console.log(this.current_order_id);
      this.searchOrderInfo();
      this.searchOrderData();
      this.window.scrollTo(0, 0);
    },

    searchOrderInfo() {
      VehicleOrderInfoDataService.findByOrderId(this.current_order_id)
        .then((response) => {
          this.orderInfoList2 = response.data;
          console.log(response.data);
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
  },

  mounted() {
    if (!auth.currentUser) {
      alert("You must be logged in as a user to view this");
      this.$router.push({ path: "/" });
    } else {
      this.email = auth.currentUser.email;
      this.retrieveOrders();
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
  margin: 10px;
  font-size: 14px;
}
</style>