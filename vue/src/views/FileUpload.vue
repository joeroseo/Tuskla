<template>
  <div class="flex-container">
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <h2>File Preview</h2>
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        @change="previewImage"
        ref="fileInput"
      />
      <div v-if="!imagePreview">
        <strong>
          <p id="placeBottom" style="font-size: 15px">
            All images should be set to 500X500 pixels. <br />
            This can be done at:<br />
            https://www.img2go.com/resize-image
          </p>
        </strong>
      </div>
      <div v-if="imagePreview" style="margin-top: 20px">
        <img
          :src="imagePreview"
          class="img-fluid mt-2"
          style="max-width: 50%; margin-top: 100px"
          alt="Preview"
        />
      </div>
    </div>
    <div class="flex-child" style="border: 0.5px solid #d3d3d3">
      <h2>Form Data Upload</h2>
      <br />
      <form @submit.prevent="submitForm">
        <div class="form-container">
          <div class="form-row">
            <label class="form-label" for="name">Product Name:</label>
            <input
              class="form-input"
              type="text"
              id="name"
              name="name"
              maxlength="35"
              required
              v-model="name"
            />
          </div>
          <div class="form-row">
            <label class="form-label" for="price">Price:</label>
            <input
              class="form-input"
              type="number"
              id="price"
              name="price"
              maxlength="35"
              required
              v-model="price"
              input
              style="max-width: 30%"
            />
            <i>$</i>
          </div>
          <div class="mb-3">
            <label for="filename" class="form-label">File Name</label>
            <input
              v-if="imagePreview"
              v-model="filename"
              class="form-input"
              readonly="readonly"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label><br />
          <select name="category" id="category" v-model="category">
            <option value="Exterior" selected>Exterior</option>
            <option value="Interior">Interior</option>
            <option value="Detailing">Detailing</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <br />
        <button
          type="submit"
          class="btn btn-sm"
          style="border: 0.5px solid black; background-color: #e0e0e0"
        >
          Submit
        </button>
        &nbsp &nbsp
        <router-link to="/productmaintenance">
          <button
            class="btn btn-sm"
            style="border: 0.5px solid black; background-color: #e0e0e0"
            type="button"
          >
            Cancel
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecordProduct from "../services/RecordProduct";
import { auth } from "../firebase/init.js";
import { db } from "../firebase/init.js";

import mitt from "mitt";
import eventBus from "../eventBus"; // Adjust the import path

export default {
  data() {
    return {
      imagePreview: null,
      filename: {
        name,
      },
      name: "",
      price: "",
      category: "Exterior",
    };
  },

  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(file);
      this.filename = event.target.files[0].name;
    },

    uploadFile() {
      // Perform the file upload to the server using Axios
      const fileInput = this.$refs.fileInput;
      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      axios
        .post("http://localhost:8080/upload", formData)
        .then((response) => {
          console.log("File uploaded successfully:", response.data.filename);
          alert("File and Form data uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          alert("Error uploading file.");
          return;
        });
      this.imagePreview = null;
      this.filename = null;
      this.submitted = true;
      this.name = "";
      this.price = "";
      this.category = "Exterior";
      this.filename = "";
    },

    submitForm() {
      var data = {
        name: this.name,
        price: this.price,
        category: this.category,
        filename: this.filename,
        image: "../img/uploads/" + this.filename,
        isAvailable: "yes",
      };
      this.image = "../img/uploads/" + this.filename;
      RecordProduct.create(data)
        .then((response) => {
          //this.tutorial.id = response.id;
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          alert("Error submitting form data.");
          return;
        });
      this.uploadFile();
    },
  },

  mounted() {
    if (!auth.currentUser || auth.currentUser.email != "admin@tuskla.com") {
      alert("You must be admin to view this");
      this.$router.push({ path: "/" });
    }
  },
};
</script>
<style>
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
#placeBottom {
  position: relative;
  bottom: -200px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.flex-container {
  display: flex;
  padding: 30px;
}
.flex-child {
  flex: 1;
  padding: 30px;
}
.flex-child:first-child {
  margin-right: 20px;
}
</style>
