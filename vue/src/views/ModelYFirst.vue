<template>
<body>
  <div class="flex-container" style="gap: 20px;">
    <div class="flex-child">
<div style="margin-top:15px; margin-left:10px;">
<p><h4>$7,500 Federal Tax Credit Available</h4></p>
<br><br>
</div>
  <div class="flex-child3">
    <div class="image-container1">
      <img :src="vehicleImageSrc" style="transform: scale(1.3);" />
      <div class="button-container1">
        <div class="button1" @click="isOpen = true, doctype = 'modelYFeatures'">
          <i><u>Model Features</u></i>
        </div>
        <Modal :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
      </div>
    </div>
  </div>
<br><br>
<h5> Paint Color </h5> <br>
 <img src="../../public/img/other/Silver-modified.png" @click="pickPaint('Silver')" alt="Option 1" 
 style="width: 10%; height: 10%; margin-right: 10px;">
 <img src="../../public/img/other/Pearl-modified.png" @click="pickPaint('Pearl')" alt="Option 1" 
  style="width: 10%; height: 10%; margin-right: 10px;">
 <img src="../../public/img/other/Blue-modified.png" @click="pickPaint('Blue')" alt="Option 1" 
  style="width: 10%; height: 10%; margin-right: 10px;">
 <img src="../../public/img/other/Black-modified.png" @click="pickPaint('Black')" alt="Option 1" 
  style="width: 10%; height: 10%; margin-right: 10px;">
 <img src="../../public/img/other/Red-modified.png" @click="pickPaint('Red')" alt="Option 1" 
  style="width: 10%; height: 10%;">
<br>
<p style="margin-top: 25px; margin-bottom: 10px;"> {{paintCost}} </p>
<br>
<h5> Rims </h5> 
     <div class="button-container">
        <div class="button" style="margin-top: -5px;" @click="isOpen = true, doctype = 'modelYRimsTires'">
          <i><u>Specifications</u></i>
        </div>
        <Modal :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
      </div>
<div v-if="type === 'Performance'">
<br>
<img
  :src="`/img/vehicles/Rims21${paintSelected}.jpg`"
  style="width: 25%; margin-right: 60px; margin-left: -30px;"
  alt="Vehicle Image"
/>
<img src="../../public/img/vehicles/Rims21Uberturbine.png"  
style=" width: 9%; height: 15%; margin-right: 20px; margin-top: 65px"
@click="rimsSelect('21')">
<br>
<br>
{{ rimsCost }}
</div>
<div v-else>
<br>
<img :src="rimsImageSrc" 
style="width: 25%; margin-right: 60px; margin-left: -30px;">
<img src="../../public/img/vehicles/Rims19.png"  
style=" width: 9%; height: 15%; margin-right: 20px; margin-top: 65px"
@click="rimsSelect('19')">
<img src="../../public/img/vehicles/Rims20induction.png"   
style=" width: 9%; height: 15%; margin-right: 30px; margin-top: 65px"
@click="rimsSelect('20')">
<br>
<br>
{{ rimsCost }}
</div>
<br>
<h5> Interior </h5> 
     <div class="button-container">
        <div class="button" style="margin-top: -5px;" @click="isOpen = true, doctype = 'modelYInterior'">
          <i><u>Interior Features</u></i>
        </div>
        <Modal :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
      </div>
<div style="margin-top: 10px;">
<img :src="interiorImageSrc" 
style="width: 25%; margin-right: 60px; margin-left: -30px;">
<img src="../../public/img/vehicles/InteriorBlackButton.png"  
style=" width: 6%; height: 9%; margin-right: 20px; margin-top: 65px"
@click="interiorSelect('Black')">
<img src="../../public/img/vehicles/InteriorWhiteButton.png"   
style=" width: 6%; height: 9%; margin-right: 30px; margin-top: 65px"
@click="interiorSelect('White')">
</div>
<br>
{{ interiorCost }}
<div v-if="$store.state.vehicle_description === 'Model Y Long Range'">
<br><h4> Seating Layout</h4>
<img :src="seatIcon5"   
style=" width: 7%; height: 7%;  margin-top: 6px"
@click="interiorSelect('5')">
<img :src="seatIcon7"  
style=" width: 7%; height: 7%;  margin-top: 6px; "
@click="interiorSelect('7')">
<br>
<p style="margin-top: 10px;"> {{ interiorRowCost }} </p>
     <div class="button-container">
        <div class="button" style="margin-top: -5px;" @click="isOpen = true, doctype = 'modelYSeating'">
          <i><u>Seating Details</u></i>
        </div>
        <Modal :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
      </div>
</div>
<div>
<br>
<h5> Charging </h5>
<p> Home charging equipment is not included</p>
     <div class="button-container">
        <div class="button" style="margin-top: -5px;" @click="isOpen = true, doctype = 'Charging'">
          <i><u>Charging Features</u></i>
        </div>
        <Modal :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
      </div>
<div>
<br>
<input type="checkbox" id="wallCharger" name="wallCharger" v-model="$store.state.wallcharger" 
@change="setWallCharger" style="margin-left: -15px;" />
<label for="wallCharger"> &nbsp Wall Charger $475</label>
<br> 
<input type="checkbox" id="mobileCharger" name="mobileCharger" v-model="$store.state.mobilecharger" 
@change="setMobileCharger" style="margin-left: -4px;" />
<label for="mobileCharger"> &nbsp Mobile Charger $230</label>
</div>
<div v-if="$store.state.vehicle_description !== 'Model Y Long Range'"> <br> </div>
<br> <br> 
            <router-link to="/VehicleCart" >
              <button @click="order" class="btn  btn-sm" style="border: .5px solid black; background-color: #E0E0E0; margin-top:-15px;">Order Now</button>
            </router-link>
</div>
    </div>
    <div class="flex-child" style="margin-right: 10px;">
     <strong>   <h4 style="margin-top: 10px; " >Model Y {{type}}  </h4> </strong>
    <strong>   <h5 style="margin-top: 10px; " >Est. Delivery: {{ delivery_date }} </h5> </strong>
    <br>
<table class="table  mt-42 is-fullwidth" style=" margin: auto">
            <thead>
                <tr>
                  <th>Range (EPA est.)</th>
                  <th>Top Speed</th>
                  <th>0-60 mph</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ range }}</td>
                    <td>{{ speed }}</td>
                    <td>{{ accel }}</td>
                </tr>
            </tbody>
        </table>
<br>
    <div class="button-group" id="group1" style="display: flex; justify-content:center">
      <button
        v-for="(button, index) in buttonsGroup1"
        :key="index"
        @click="handleButtonClick(button, buttonsGroup1)"
        class="btn btn-sm button highlightable-button"
        :class="{ 'highlight': button.highlighted, 'pop-out': button.highlighted }"
      >
        {{ button.label }}
      </button>
    </div>
<br>
<div v-if="!showSavings" >
<table  class="table  mt-42 is-fullwidth" style=" margin: auto">
            <thead>
                <tr>
                  <th>Purchase Price</th>
                  <th>Loan Price</th>
                  <th>Lease Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ pPrice }}</td>
                    <td>{{ loanPrice }}</td>
                    <td>{{ leasePrice }}</td>
                </tr>
            </tbody>
        </table>
     <br>
    <div class="button-group" id="group2" style="display: flex; justify-content:center">
      <button
        v-for="(button, index) in buttonsGroup2"
        :key="index"
        @click="handleButtonClick(button, buttonsGroup2)"
        class="btn btn-sm button highlightable-button"
        :class="{ 'highlight': button.highlighted, 'pop-out': button.highlighted }"
      >
        {{ button.label }}
      </button>
    </div>
</div>
<div v-if="showSavings">
<table class="table  mt-42 is-fullwidth " style=" margin: auto">
            <thead>
                <tr>
                  <th>Purchase Price</th>
                  <th>Loan Price</th>
                  <th>Lease Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ pPrice }}</td>
                    <td>{{ loanPrice }}</td>
                    <td>{{ leasePrice }}</td>
                </tr>
            </tbody>
        </table>
     <br>
    <div class="button-group" id="group2" style="display: flex; justify-content:center">
      <button
        v-for="(button, index) in buttonsGroup2"
        :key="index"
        @click="handleButtonClick(button, buttonsGroup2)"
        class="btn btn-sm button highlightable-button"
        :class="{ 'highlight': button.highlighted, 'pop-out': button.highlighted }"
      >
        {{ button.label }}
      </button>
    </div>
    </div>
 <div class="button-container" style="margin-top:5px;">
    <div class="button" @click="isOpen = true, doctype = 'modelYPricing'">
      <i><u>Pricing Details</u></i>
    </div>
    <Modal v-if="doctype === 'modelYPricing'" :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
    <div class="button" @click="isOpen = true, doctype = 'GasSavings'">
      <i><u>Gas Savings</u></i>
    </div>
    <Modal v-if="doctype === 'GasSavings'" :doctype="doctype" :open="isOpen" @close="isOpen = !isOpen"></Modal>
  </div>
<br>
<h5> AutoPilot </h5>
<img src="../../public/img/vehicles/EnhancedAutopilot.jpg"   
style=" width: 80%; ">
<br>
<P> $6,000 </p>
<div class="bullet-list">
  <ul>
    <li>Navigate on Autopilot</li>
    <li>Auto Lane Change</li>
    <li>Autopark</li>
    <li>Summon</li>
    <li>Smart Summon</li>
  </ul>
</div>
<br>
<input type="checkbox" id="autoPilot" name="autoPilot" v-model="$store.state.autopilot" @change="setAutpilot" />
<label for="autoPilot"> &nbsp Add AutoPilot </label>
<br>
<br>
<h5> Full Self Driving </h5>
<br>
<P> $12,000 </p>
<div class="bullet-list" >
  <ul style="margin-left: 25px;">
    <li>All functionality of Autopilot </li>
    <li>Traffic Light/Stop Sign Control</li>
    <li>Autopark</li>
    <li>Summon</li>
    <li>Soon - Autosteer on city streets</li>
  </ul>
</div>
<br>
<input type="checkbox" id="fullSelfDriving" name="FullSelfDriving" v-model="$store.state.full_self_driving" @change="setFullSelfDriving" style="margin-left: 30px;"/>
<label for="FullSelfDriving" style="margin-top -50px; "> &nbsp Add Full Self Driving </label>
<br>
    </div>
 </div>
</body>
</template>
<script>
import ParamDataService from "../services/ParamDataService";
import OrderInfoDataService from "../services/OrderInfoDataService";
import OrderDataService from "../services/OrderDataService";
import OrderStatus from "../views/OrderStatus.vue";
import LayoutProduct from "../components/LayoutProduct.vue";
import Modal from "../components/modal/Modal.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";

components: {
  OrderStatus;
  LayoutProduct;
}

export default {
  name: "order-details",
  components: { Modal, LayoutProduct },

  beforeRouteEnter(to, from, next) {
    // This will be called before the new component is created
    // Reinitiaze values on back button
    next((vm) => {
      vm.retrieveParamData();
      for (const row of vm.dataTable) {
        vm.store.state[row.name] = row.value;
        console.log(`Value for ${row.name} set to ${row.value}`);
      }
      vm.Vehicle = "Model Y";
      vm.type = "Standard";
      vm.vehicleTitle = vm.Vehicle;
      vm.vehicleImageSrc = "/img/vehicles/model3Silver.jpg";
      vm.vehicle_description = "Model Y Standard";
      vm.vehicle_price = "43990";
      vm.paint = "Silver";
      vm.paintSelected = "Silver";
      vm.paintCost = "Midnight Silver Metallic Included";
      vm.paint_cost = "0";
      vm.paint_description = "Paint - Midnight Silver Metallic";
      vm.rimSelected = "19";
      vm.rims_description = '19" Gemini Wheels';
      vm.rims_cost = "0";
      vm.rimsImageSrc = "/img/vehicles/Rims19Silver.jpg";
      vm.rimsCost = '19" Gemini Wheels Included';
      vm.interiorImageSrc = "/img/vehicles/InteriorBlack.jpg";
      vm.interiorSelected = "Black";
      vm.interiorCost = "Black Interior Included";
      vm.interior_description = "Interior - Black";
      vm.interior_cost = "0";
      vm.interiorColor = "Black";
      vm.seatCost = "5 Seat Interior included";
      vm.seatIcon5 = "/img/vehicles/5seatSelected.png";
      vm.seatIcon7 = "/img/vehicles/7seatUnselected.png";
      vm.autoPilot = false;
      vm.autopilot_cost = "0";
      vm.fullSelfDriving = false;
      vm.full_self_driving_cost = "0";
      vm.wallCharger = false;
      vm.wallcharger_cost = "0";
      vm.mobileCharger = false;
      vm.mobilecharger_cost = "0";
      vm.showSavings = false;
      document.getElementById("autoPilot").checked = false;
      document.getElementById("fullSelfDriving").checked = false;
    });
  },

  data() {
    return {
      dataTable: [],
      vehicleTitle: "",
      Vehicle: "Model Y",
      rimsImageSrc: "/img/vehicles/Rims19Silver.jpg",
      type: "Standard",
      showSavings: false,
      vehicleImageSrc: "/img/vehicles/modelYSilver.jpg",
      interiorImageSrc: "/img/vehicles/InteriorBlack.jpg",
      range: "",
      speed: "",
      accel: "",
      pPrice: "",
      loanPrice: "",
      leasePrice: "",
      paintCost: "",
      rimsCost: "",
      interiorCost: "",
      formattedDate: "",
      interiorColor: "Black",
      interiorCost: "5 Seat Interior included",
      interiorRowCost: "5 Seat Option Included",
      seatIcon5: "/img/vehicles/5seatSelected.png",
      seatIcon7: "/img/vehicles/7seatUnselected.png",
      isOpen: ref(false),
      doctype: "modelYPricing",
      buttonsGroup1: [
        { label: "Without Savings", highlighted: false, type: "without" },
        { label: "With Savings", highlighted: false, type: "with" },
      ],
      buttonsGroup2: [
        { label: "Standard", highlighted: false, type: "Standard" },
        { label: "Long Range", highlighted: false, type: "Long Range" },
        { label: "Performance", highlighted: false, type: "Performance" },
      ],
      showSavings: false,
      type: "",
      route_name: "",
      delivery_date: "",
    };
  },

  methods: {
    calculateDeliveryDates() {
      // Get the current date
      const currentDate = new Date();
      // Calculate the first date (two months from the current date)
      const firstDate = new Date(currentDate);
      firstDate.setMonth(currentDate.getMonth() + 2);
      // Calculate the second date (one month from the first date)
      const secondDate = new Date(firstDate);
      secondDate.setMonth(firstDate.getMonth() + 1);
      // Extract the last two digits of the years
      const firstYear = firstDate.getFullYear() % 100;
      const secondYear = secondDate.getFullYear() % 100;
      // Format the dates as strings in the "MMM YY - MMM YY" format
      const formattedDates = `${firstDate.toLocaleString("default", {
        month: "short",
      })} ${firstYear} – ${secondDate.toLocaleString("default", {
        month: "short",
      })} ${secondYear}`;
      this.delivery_date = formattedDates;
    },

    handleButtonClick(selectedButton, group) {
      this.clearHighlight(group);
      selectedButton.highlighted = true;
      if (group === this.buttonsGroup1) {
        this.savings(selectedButton.type);
      } else if (group === this.buttonsGroup2) {
        this.modelInfo(selectedButton.type);
      }
    },

    clearHighlight(group) {
      group.forEach((button) => {
        button.highlighted = false;
      });
    },

    setAutpilot() {
      if (this.$store.state.autopilot) {
        this.$store.state.autopilot_description = "Autopilot Ordered";
        this.$store.state.autopilot_cost = 6000;
      } else {
        this.$store.state.autopilot_description = "Autopilot None";
        this.$store.state.autopilot_cost = 0;
      }
    },

    setFullSelfDriving() {
      if (this.$store.state.full_self_driving) {
        this.$store.state.full_self_driving_description =
          "Full Self Driving Ordered";
        this.$store.state.full_self_driving_cost = 12000;
      } else {
        this.$store.state.full_self_driving_description =
          "Full Self Driving None";
        this.$store.state.full_self_driving_cost = 0;
      }
    },

    setMobileCharger() {
      if (this.$store.state.mobilecharger) {
        this.$store.state.mobilecharger_description = "Mobile Charger Ordered";
        this.$store.state.mobilecharger_cost = 230;
      } else {
        this.$store.state.mobilecharger_description = "Mobile Charger None";
        this.$store.state.mobilecharger_cost = 0;
      }
    },

    setWallCharger() {
      if (this.$store.state.wallcharger) {
        this.$store.state.wallcharger_description = "Wall Charger Ordered";
        this.$store.state.wallcharger_cost = 475;
      } else {
        this.$store.state.wallcharger_description = "Wall Charger None";
        this.$store.state.wallcharger_cost = 0;
      }
    },

    pickPaint(value) {
      this.vehicleImageSrc = "/img/vehicles/model3" + value + ".jpg";
      this.paintSelected = value;
      this.rimsImageSrc =
        "/img/vehicles/Rims" + this.rimSelected + this.paintSelected + ".jpg";
      switch (value) {
        case "Silver":
          this.paintCost = "Midnight Silver Metallic Included";
          this.$store.state.paint_description =
            "Paint - Midnight Silver Metallic";
          this.$store.state.paint_cost = "0";
          break;
        case "Pearl":
          this.paintCost = "Pearl White Multi-Coat $1,000";
          this.$store.state.paint_description = "Paint - Pearl White";
          this.$store.state.paint_cost = "1000";
          break;
        case "Black":
          this.paintCost = "Solid Black $1,500";
          this.$store.state.paint_description = "Paint - Solid Black";
          this.$store.state.paint_cost = "1500";
          break;
        case "Blue":
          this.paintCost = "Deep Blue Metallic $1,000";
          this.$store.state.paint_description = "Paint - Deep Blue Metallic";
          this.$store.state.paint_cost = "1000";
          break;
        case "Red":
          this.paintCost = "Red Multi-Coat $2,000";
          this.$store.state.paint_description = "Paint - Red Multi-Coat";
          this.$store.state.paint_cost = "2000";
          break;
        default:
          // code block
          break;
      }
    },

    rimsSelect(value) {
      this.rimSelected = value;
      this.rimsImageSrc =
        "/img/vehicles/Rims" + this.rimSelected + this.paintSelected + ".jpg";
      if (value === "19") {
        this.rimsCost = '19" Gemini Wheels Included';
        this.$store.state.rims_description = '19" Gemini Wheels';
        this.$store.state.rims_cost = "0";
      } else if (value === "20") {
        this.rimsCost = "20’’ Induction Wheels $2,000";
        this.$store.state.rims_description = "20’’ Induction Wheels";
        this.$store.state.rims_cost = "2000";
      } else if (value === "21") {
        this.rimsCost = "21’’ Uberturbine Wheels Included";
        this.$store.state.rims_description = "21’’ Uberturbine Wheels";
        this.$store.state.rims_cost = "0";
      }
    },

    interiorSelect(value) {
      this.interiorSelected = value;
      if (value === "Black") {
        this.interiorColor = "Black";
        this.interiorCost = "Black Interior Included";
        this.$store.state.interior_description = "Interior - Black";
        this.$store.state.interior_cost = "0";
        this.interiorImageSrc = "/img/vehicles/InteriorBlack.jpg";
      } else if (value === "White") {
        this.interiorColor = "White";
        this.interiorCost = "Black and White Interior $1,000";
        this.$store.state.interior_description = "Interior - White/Black";
        this.$store.state.interior_cost = "1000";
        this.interiorImageSrc = "/img/vehicles/InteriorWhite.jpg";
      } else if (value === "5") {
        this.interiorRowCost = "5 Seat Option Included";
        this.$store.state.interior_rows = "5 Seat option";
        this.$store.state.interior_row_cost = "0";
        this.seatIcon5 = "/img/vehicles/5seatSelected.png";
        this.seatIcon7 = "/img/vehicles/7seatUnselected.png";
      } else if (value === "7") {
        this.interiorRowCost = "7 Seat Option $2,500";
        this.$store.state.interior_rows = "7 Seat option";
        this.$store.state.interior_row_cost = "2500";
        this.seatIcon5 = "/img/vehicles/5SeatUnselected.png";
        this.seatIcon7 = "/img/vehicles/7seatSelected.png";
      }
    },

    savings(input) {
      if (input === "without") {
        this.showSavings = false;
        this.modelInfo(this.type);
        this.clearHighlight(this.buttonsGroup1);
        this.buttonsGroup1[0].highlighted = true;
      } else {
        this.showSavings = true;
        this.modelInfo(this.type);
        this.clearHighlight(this.buttonsGroup1);
        this.buttonsGroup1[1].highlighted = true;
      }
    },

    modelInfo(type) {
      if (type === "Standard") {
        this.range = this.$store.state.StandardRange;
        this.speed = this.$store.state.StandardTopSpeed;
        this.accel = this.$store.state.StandardAccel;
        if (!this.showSavings) {
          this.pPrice = this.$store.state.StandardPprice;
          this.loanPrice = this.$store.state.StandardLoanPrice;
          this.leasePrice = this.$store.state.StandardLeasePrice;
        } else {
          this.pPrice = this.$store.state.StandardPpriceSavings;
          this.loanPrice = this.$store.state.StandardLoanPriceSavings;
          this.leasePrice = this.$store.state.StandardLeasePriceSavings;
        }
        this.type = "Standard";
        this.$store.state.vehicle_price = this.$store.state.StandardActualPrice;
        this.rimsSelect("19");
      } else if (type === "Long Range") {
        this.range = this.$store.state.LongRangeRange;
        this.speed = this.$store.state.LongRangeTopSpeed;
        this.accel = this.$store.state.LongRangeAccel;
        if (!this.showSavings) {
          this.pPrice = this.$store.state.LongRangePprice;
          this.loanPrice = this.$store.state.LongRangeLoanPrice;
          this.leasePrice = this.$store.state.LongRangeLeasePrice;
        } else {
          this.pPrice = this.$store.state.LongRangePpriceSavings;
          this.loanPrice = this.$store.state.LongRangeLoanPriceSavings;
          this.leasePrice = this.$store.state.LongRangeLeasePriceSavings;
        }
        this.rimsSelect("19");
        this.type = "Long Range";
        this.$store.state.vehicle_price =
          this.$store.state.LongRangeActualPrice;
      } else if (type === "Performance") {
        this.range = this.$store.state.PerformanceRange;
        this.speed = this.$store.state.PerformanceTopSpeed;
        this.accel = this.$store.state.PerformanceAccel;
        if (!this.showSavings) {
          this.pPrice = this.$store.state.PerformancePprice;
          this.loanPrice = this.$store.state.PerformanceLoanPrice;
          this.leasePrice = this.$store.state.PerformanceLeasePrice;
        } else {
          this.pPrice = this.$store.state.PerformancePpriceSavings;
          this.loanPrice = this.$store.state.PerformanceLoanPriceSavings;
          this.leasePrice = this.$store.state.PerformanceLeasePriceSavings;
        }
        this.$store.state.vehicle_price =
          this.$store.state.PerformanceActualPrice;
        this.type = "Performance";
        this.rimsCost = "21’’ Uberturbine Wheels Included";
        this.$store.state.rims_description = "21’’ Uberturbine Wheels";
        this.$store.state.rims_cost = "0";
      }
      this.$store.state.vehicle_description = this.Vehicle + " " + this.type;
    },

    async retrieveAllData() {
      try {
        const response = await ParamDataService.getAll("Model Y");
        this.dataTable = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveParamData() {
      try {
        const response = await ParamDataService.findByModel(this.Vehicle); // Fix the method call
        this.dataTable = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    const store = useStore();
    this.vehicleTitle = this.Vehicle;
    document.getElementById("autoPilot").checked = false;
    document.getElementById("fullSelfDriving").checked = false;
    this.buttonsGroup1[0].highlighted = true;
    this.buttonsGroup2[0].highlighted = true;
    await this.retrieveParamData();
    for (const row of this.dataTable) {
      store.state[row.name] = row.value;
      console.log(`Value for ${row.name} set to ${row.value}`);
    }
    this.range = this.$store.state.StandardRange;
    this.speed = this.$store.state.StandardTopSpeed;
    this.accel = this.$store.state.StandardAccel;
    this.pPrice = this.$store.state.StandardPprice;
    this.loanPrice = this.$store.state.StandardLoanPrice;
    this.leasePrice = this.$store.state.StandardLeasePrice;
    this.calculateDeliveryDates();
  },
};
</script>
<style scoped>
.flex-container img {
  width: 80%;
  height: 80%;
  object-fit: contain;
  margin: 0;
}
.flex-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 270vh;
  overflow: hidden;
  margin: 0; /* Reset margin to remove any unwanted space */
  padding: 0; /* Reset padding to remove any unwanted space */
  background-color: white;
}
.flex-container2 {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0; /* Reset margin to remove any unwanted space */
  padding: 0; /* Reset padding to remove any unwanted space */
  align-items: flex-start;
  background-color: white;
}
.flex-child {
  margin: 0; /* Reset margin to remove any unwanted space */
  padding: 0; /* Reset padding to remove any unwanted space */
  border: 0;
  height: 50vh;
}
.flex-child2 {
  margin: 0; /* Reset margin to remove any unwanted space */
  padding: 0; /* Reset padding to remove any unwanted space */
  height: 220vh;
}
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
  margin: 0;
  padding: 0;
  text-align: center;
  margin-bottom: 0.1em;
  margin-top: 0.1em;
  font-size: 14px;
}
table {
  margin: 10px;
  font-size: 14px;
  border-collapse: collapse;
}
table,
th,
td {
  border: none;
}
.container1 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh; /* Adjust this value based on your needs */
  border: 0;
}
.options1 {
  text-align: center;
}
.button-group {
  display: flex;
}
.highlightable-button {
  padding: 5px 8px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}
.highlightable-button.highlight {
  border: 0.5px solid black;
}
.bullet-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bullet-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.bullet-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
}
.bullet-list li::before {
  content: "\2022"; /* Bullet character */
  margin-right: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1ch; /* Adjust the spacing as needed */
}
.button {
  margin-top: 0;
  font-size: 12px;
  cursor: pointer;
}
.flex-child3 {
  position: relative;
}
.image-container1 {
  position: relative;
}
.button-container1 {
  position: absolute;
  bottom: 3%;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 15px;
}
.button1 {
  font-size: 12px;
  cursor: pointer;
}
</style>
