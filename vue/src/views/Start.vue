<template>
  <div>
    <VideoJsPlayer :options="videoOptions" />
  </div>
</template>

<script>
import VideoJsPlayer from "../components/VideoJS.vue";
import { auth } from "../firebase/init.js";
import { initializeApp } from "firebase/app";
import { db } from "../firebase/init.js";

export default {
  name: "VideoJSExample",
  components: {
    VideoJsPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: false, // Hide control buttons
        preload: "auto",
        fluid: true,
      },
    };
  },
};
</script>
