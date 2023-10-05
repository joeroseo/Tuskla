<template>
  <body>
    <div class="flex-container">
      <div class="flex-child1">
        <div class="list row">
          <div class="col-md-8">
            <div class="input-group mb-3">
              <select
                class="custom-select"
                id="modelSelect"
                v-model="model"
                style="border: 0.5px solid black"
              >
                <option value="All">All</option>
                <option value="Model 3">Model 3</option>
                <option value="Model Y">Model Y</option>
                <option value="Model X">Model X</option>
                <option value="Model S">Model S</option>
              </select>
              <div class="input-group-append flex-grow-1">
                <button
                  class="btn btn-sm"
                  style="
                    margin-left: 20px;
                    border: 0.5px solid black;
                    background-color: #e0e0e0;
                  "
                  type="button"
                  @click="searchModel"
                >
                  &nbsp Search
                </button>
              </div>
              <div class="input-group-append">
                <div class="flex-grow-1"></div>
                <button
                  class="btn btn-sm"
                  style="border: 0.5px solid black; background-color: #e0e0e0"
                  type="button"
                  @click="addParameter"
                >
                  &nbsp Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h4>Parameter List</h4>
        <div
          style="
            width: 425px;
            height: 300px;
            overflow-x: hidden;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        >
          <br />
          <table style="border: 0.5px solid #d3d3d3">
            <thead>
              <tr style="text-align: left; font-size: 17px">
                <th
                  style="
                    text-align: left;
                    width: 15%;
                    margin-left: 10px;
                    padding: 10px;
                    font-size: 17px;
                  "
                >
                  Model
                </th>
                <!-- Adjusted width here -->
                <th
                  style="
                    text-align: left;
                    padding: 5px;
                    width: 50%;
                    font-size: 17px;
                  "
                >
                  Parameter
                </th>
                <!-- Adjusted width here -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(param, index) in dataTable"
                :key="index"
                @click="setActiveParam(param, index)"
              >
                <td
                  style="
                    text-align: left;
                    width: 10%;
                    margin-left: 10px;
                    padding: 10px;
                    font-size: 17px;
                  "
                >
                  {{ param.model }}
                </td>
                <!-- Added padding here -->
                <td style="text-align: left; font-size: 17px">
                  {{ param.name }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="showParam">
        <div class="flex-child2">
          <div v-if="showParam">
            <br />
            <div
              class="list"
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
              "
            >
              <div>
                <label style="font-size: 18px; margin-bottom: 5px"
                  >Model Name</label
                ><br />
                <input
                  type="text"
                  :value="dataParam.model"
                  readonly
                  style="border: none; text-align: center; margin-bottom: 5px"
                />
                <br /><br />
              </div>
              <div>
                <label style="font-size: 18px; margin-bottom: 5px"
                  >Parameter Name</label
                ><br />
                <input
                  type="text"
                  :value="dataParam.name"
                  readonly
                  style="border: none; text-align: center; margin-bottom: 5px"
                />
                <br /><br />
              </div>
              <div>
                <label style="font-size: 18px; margin-bottom: 10px">Value</label
                ><br />
                <input
                  type="text"
                  v-model="dataParam.value"
                  style="width: 125%; text-align: center; margin-left: -20px"
                />
                <br /><br />
              </div>
            </div>
          </div>
          <br />
          <button
            type="submit"
            class="btn btn-sm"
            style="border: 0.5px solid black; background-color: #e0e0e0"
            @click="updateParameter"
          >
            Save
          </button>
          &nbsp &nbsp
          <button
            type="submit"
            class="btn btn-sm"
            style="border: 0.5px solid black; background-color: #e0e0e0"
            @click="removeParameter"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import ParamDataService from "../services/ParamDataService";
import axios from "axios";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";
import mitt from "mitt";
import eventBus from "../eventBus"; // Adjust the import path

export default {
  name: "params-list",
  data() {
    return {
      dataTable: [],
      model: "All",
      current_id: null,
      currentParam: null,
      currentIndex: -1,
      showParam: false, // Assuming you have this in your component
      dataParam: [], // Initialize as an empty array to store retrieved data
    };
  },

  methods: {
    addParameter() {
      alert("This feature is not yet implemented");
    },

    removeParameter() {
      alert("This feature is not yet implemented");
    },

    refreshList() {
      this.retrieveAllData();
      this.currentParam = null;
      this.currentIndex = -1;
    },

    async searchModel() {
      if (this.model == "All") {
        this.model == "";
      }
      try {
        const response = await ParamDataService.findByModel(this.model); // Fix the method call
        this.dataTable = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveAllData() {
      try {
        const response = await ParamDataService.getAll(); // Fix the method call
        this.dataTable = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveParamData() {
      try {
        const response = await ParamDataService.findByPk(this.current_id);
        this.dataParam = response.data; // Assuming response.data is an array
        console.log("retrieveParamData() called");
      } catch (error) {
        console.error(error);
      }
    },

    async setActiveParam(param, index) {
      this.currentParam = param;
      this.currentIndex = param ? index : -1;
      this.showParam = true;
      this.showStatus = false;
      this.current_id = param.id;
      this.currentIndex = param ? index : -1;
      this.retrieveParamData();
    },

    async updateParameter() {
      var data = {
        id: this.current_id,
        model: this.dataParam.model,
        name: this.dataParam.name,
        value: this.dataParam.value,
        isAvailable: "",
      };
      try {
        const response = await ParamDataService.update(this.current_id, data);
        this.dataParam = response.data; // Assuming response.data is an array
        this.showParam = !this.showParam;
      } catch (error) {
        console.error(error);
      }
    },

    async deleteParameter() {},
  },

  mounted() {
    if (!auth.currentUser || auth.currentUser.email != "admin@tuskla.com") {
      alert("You must be logged in as admin@tuskla.com to view this");
      this.$router.push({ path: "/" });
    }
    this.retrieveAllData();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.flex-container {
  display: flex;
  flex-direction: row; /* This should make children appear side by side */
  gap: 20px;
  justify-content: space-between;
  border: 0.5px solid #d3d3d3;
}
.flex-parent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0.5px solid #d3d3d3;
}
.flex-child1 {
  width: 450px; /* Set the width to 400px */
  padding: 10px;
  border: 0.5px solid #d3d3d3;
}
.flex-child2 {
  flex-grow: 1;
  padding: 10px;
  border: 0.5px solid #d3d3d3;
  width: 450px;
}
table {
  width: 100%; /* Make the table take up 100% width of its container */
  overflow-x: hidden;
  overflow-y: scroll;
}
body {
  color: rgba(0, 0, 0, 1.25); /* 25% darker: rgba(0, 0, 0, 1.25) */
}
</style>
