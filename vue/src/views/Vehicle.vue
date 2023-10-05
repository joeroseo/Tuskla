<template>
  <body>
    <h3>{{ VehicleModel }}</h3>
    <div class="flex-container">
      <div v-if="VehicleModel === 'Model 3'">
        <img src="../../public/img/vehicles/model3Red.jpg" alt="Your Image" />
      </div>
      <div v-else-if="VehicleModel === 'Model Y'">
        <img src="../../public/img/vehicles/modelYBlue.jpg" alt="Your Image" />
      </div>
      <div v-else-if="VehicleModel === 'Model X'">
        <img src="../../public/img/vehicles/modelYBlack.jpg" alt="Your Image" />
      </div>
      <div v-else-if="VehicleModel === 'Model S'">
        <img src="../../public/img/vehicles/modelYPearl.jpg" alt="Your Image" />
      </div>
      <br />
      <br />
      <button
        @click="purchase"
        class="btn btn-sm button"
        style="
          margin-top: -30px;
          border: 0.5px solid black;
          background-color: #e0e0e0;
        "
      >
        Purchase
      </button>
    </div>
  </body>
</template>
<script>
import OrderInfoDataService from "../services/OrderInfoDataService";
import OrderDataService from "../services/OrderDataService";
import OrderStatus from "../views/OrderStatus.vue";
import { auth } from "../firebase/init.js";
import { initializeApp } from "firebase/app";
import { db } from "../firebase/init.js";

components: {
  OrderStatus;
}

export default {
  name: "order-details",

  props: ["VehicleModel"],

  data() {
    return {
      vehicleTitle: this.VehicleModel,
      fname: "",
      lname: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      order_id: "",
      submitted: false,
      status: "IN-PROCESS",
    };
  },

  methods: {
    purchase() {
      if (this.VehicleModel === "Model 3") {
        this.$router.push("/model3first");
      } else if (this.VehicleModel === "Model Y") {
        this.$router.push("/modelYfirst");
      } else if (this.VehicleModel === "Model X") {
        this.$router.push("/modelXfirst");
      } else if (this.VehicleModel === "Model S") {
        this.$router.push("/modelSfirst");
      }
    },
  },
};
</script>

<style scoped>
* {
  background-color: white;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  margin: 0; /* Reset margin to remove any unwanted space */
  padding: 0; /* Reset padding to remove any unwanted space */
  border: white;
}

.flex-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flex-container .btn {
  position: absolute;
  top: 98%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: solid black 0px;
  color: black;
  background: white;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
}

h3 {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  color: black;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

