<template>
  <header>
    <div id="navbar" class="navbar navbar-brand navbar-dark bg-dark shadow-sm">
      <div
        class="container d-flex justify-content-space-between align-items-center"
      >
        <div>
          <div class="d-flex">
            <!-- Wrap Model links in a flex container -->
            <router-link
              :to="{ name: 'Start' }"
              class="navbar-brand"
              style="font-size: 14px"
              :class="{
                'active-link':
                  !isModelActive('Model 3') &&
                  !isModelActive('Model Y') &&
                  !isModelActive('Model X') &&
                  !isModelActive('Model S') &&
                  activeLink !== 'Products',
              }"
            >
              Home
            </router-link>
            <router-link
              :to="{
                name: 'VehicleWithModel',
                params: { VehicleModel: 'Model 3' },
              }"
              class="navbar-brand"
              style="font-size: 14px"
              :class="{ 'active-link': isModelActive('Model 3') }"
            >
              Model 3
            </router-link>
            <router-link
              :to="{
                name: 'VehicleWithModel',
                params: { VehicleModel: 'Model Y' },
              }"
              class="navbar-brand d-flex align-items-center"
              style="font-size: 14px"
              :class="{ 'active-link': isModelActive('Model Y') }"
            >
              Model Y
            </router-link>
            <router-link
              :to="{
                name: 'VehicleWithModel',
                params: { VehicleModel: 'Model X' },
              }"
              class="navbar-brand d-flex align-items-center"
              style="font-size: 14px"
              :class="{ 'active-link': isModelActive('Model X') }"
            >
              Model X
            </router-link>
            <router-link
              :to="{
                name: 'VehicleWithModel',
                params: { VehicleModel: 'Model S' },
              }"
              class="navbar-brand d-flex align-items-center"
              style="font-size: 14px"
              :class="{ 'active-link': isModelActive('Model S') }"
            >
              Model S
            </router-link>
            <router-link
              :to="{ name: 'Products' }"
              class="navbar-brand"
              style="font-size: 14px"
              :class="{ 'active-link': activeLink === 'Products' }"
            >
              Products
            </router-link>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div>
            <ul v-if="includedRoutes.includes($route.name)">
              <router-link
                class="nav-link"
                :class="$route.name == 'Cart' ? 'active' : ''"
                aria-current="page"
                :to="{ name: 'Cart' }"
              >
                <span
                  v-if="$store.state.cart.length > 0"
                  class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary bi bi-cart3 h4"
                  style="margin-bottom: -30px; margin-top: 20px"
                >
                  {{ $store.state.cart.length }}
                </span>
              </router-link>
            </ul>
          </div>
          <!-- Conditional rendering for Login/Logout -->
          <router-link
            v-if="auth.currentUser"
            :to="{ name: 'Logout' }"
            class="navbar-brand d-flex align-items-center"
            style="font-size: 17px; margin-bottom: -10px"
          >
            <i
              class="bi bi-box-arrow-left"
              style="font-size: 1.5rem; margin-bottom: 7px"
            ></i>
          </router-link>
          <router-link
            v-else
            :to="{ name: 'Login' }"
            class="navbar-brand d-flex align-items-center"
            style="font-size: 17px; margin-bottom: -10px"
          >
            <i class="bi bi-person h4" style="font-size: 1.5rem"></i>
          </router-link>
          <div class="dropdown">
            <button
              id="dropdownButton"
              class="navbar-toggler dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="navbar-toggler-icon" style="font-size: 1rem"></span>
            </button>
            <div
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <a class="dropdown-item">
                <router-link
                  :to="{
                    name: 'Modal2',
                    params: { open: true, doctype: 'Plan' },
                  }"
                  class="navbar-brand d-flex align-items-center"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  Master Plan
                </router-link>
              </a>
              <a class="dropdown-item">
                <router-link
                  :to="{
                    name: 'Modal2',
                    params: { open: true, doctype: 'FAQs' },
                  }"
                  class="navbar-brand d-flex align-items-center"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  FAQs
                </router-link>
              </a>
              <a class="dropdown-item">
                <router-link
                  :to="{
                    name: 'Modal2',
                    params: { open: true, doctype: 'Ordering' },
                  }"
                  class="navbar-brand d-flex align-items-center"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  Ordering
                </router-link>
              </a>
              <a class="dropdown-item">
                <router-link
                  :to="{
                    name: 'Modal2',
                    params: { open: true, doctype: 'Warranty' },
                  }"
                  class="navbar-brand d-flex align-items-center"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  Warranty
                </router-link>
              </a>
              <a class="dropdown-item">
                <router-link
                  :to="{
                    name: 'Modal2',
                    params: { open: true, doctype: 'ChargingDoc' },
                  }"
                  class="navbar-brand d-flex align-items-center"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  Charging
                </router-link>
              </a>
              <div
                v-if="
                  !auth.currentUser ||
                  auth.currentUser.email === 'admin@tuskla.com'
                "
              >
                <p @click="noUser" style="font-size: 15px; color: black">
                  User Menus
                </p>
              </div>
              <div v-else>
                <p style="font-size: 15px; color: black; margin-bottom: -10px">
                  User Menus
                </p>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'SearchOrders' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Search Shopping Orders
                  </router-link>
                </a>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'SearchVehicleOrders' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Search Vehicle Orders
                  </router-link>
                </a>
              </div>
              <div
                v-if="
                  !auth.currentUser ||
                  auth.currentUser.email != 'admin@tuskla.com'
                "
              >
                <p
                  @click="noAdmin"
                  style="font-size: 15px; color: black; margin-bottom: -10px"
                >
                  Admin Menus
                </p>
              </div>
              <div v-else>
                <p style="font-size: 17px; color: black; margin-bottom: -10px">
                  Admin Menus
                </p>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'OrderStatusAdmin' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Search Shopping Orders
                  </router-link>
                </a>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'VehicleOrderStatusAdmin' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Search Vehicle Orders
                  </router-link>
                </a>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'ProductMaintenance' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Product Maintenance
                  </router-link>
                </a>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'DataProperties' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Data Properties
                  </router-link>
                </a>
                <a class="dropdown-item">
                  <router-link
                    :to="{ name: 'TruncateEmailLog' }"
                    class="navbar-brand d-flex align-items-center"
                    style="font-size: 15px; color: black; margin-bottom: -10px"
                  >
                    - Truncate Email Log
                  </router-link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { auth } from "../firebase/init.js";
import { on } from "vue"; // Import the on function from Vue 3
import eventBus from "../eventBus.js"; // Import the event bus
import mitt from "mitt";

export default {
  data() {
    return {
      includedRoutes: ["Products", "Test", "Cart"],
      auth: auth, // Make sure auth is available in your component
      activeLink: "Start",
    };
  },

  watch: {
    // Watch for route changes and update the active link accordingly
    $route(to) {
      this.activeLink = to.name;
    },
  },

  methods: {
    isModelActive(modelName) {
      return (
        this.$route.name === "VehicleWithModel" &&
        this.$route.params.VehicleModel === modelName
      );
    },

    noAdmin() {
      alert("You must be logged in as an admin@tuskla.com user to view these menus");
    },
    noUser() {
      alert("You must be logged in as a regular user to view these menus");
    },

    openDropdown() {
      // Find the dropdown button element and trigger a click event
      const dropdownButton = document.getElementById("dropdownButton");
      console.log("openDropdown called");
      if (dropdownButton) {
        dropdownButton.click();
      }
    },
  },

  created() {
    // Listen for the "open-dropdown" event from the child component
    eventBus.emitter.on("open-dropdown", () => {
      console.log("Received open-dropdown event in parent component");
      // Call the method to open the dropdown
      this.openDropdown();
    });
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap; /* Prevent flex items from wrapping */
}
.dropdown-menu {
  margin-top: 0; /* Adjust margin-top as needed */
}
#navbar .navbar-brand:hover {
  display: block;
  padding: 0.25em;
  background-color: #bbb;
  color: #000;
  border-bottom: 0.25em solid #444;
}

#navbar .navbar-brand.active-link {
  /* Define the style for the active link here */
  display: block;
  padding: 0.25em;
  background-color: #bbb;
  color: #000;
  border-bottom: 0.25em solid #444;
}
</style>
