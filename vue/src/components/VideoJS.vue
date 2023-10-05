<template>
  <div class="video-container">
    <video ref="videoPlayer" class="video-js" loop muted>
      <source :src="localVideoSource" type="video/mp4" />
    </video>
    <img
      :src="tusklaImageSrc"
      alt="tskla"
      class="centered-image"
      style="transform: scale(0.3)"
    />
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js CSS

export default {
  name: "MinimalVideoPlayer",
  data() {
    return {
      localVideoSource: require("../../public/videos/Tesla.mp4"),
      tusklaImageSrc: "/img/other/Tuskla.jpg",
    };
  },
  mounted() {
    // Initialize the video player
    this.player = videojs(this.$refs.videoPlayer, {
      controls: false, // Hide all controls
      autoplay: true, // Autoplay if needed
      sources: [
        {
          src: "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-3-Main-Hero-Video-Desktop-NA.mp4", // Replace with your video URL
          type: "video/mp4",
        },
      ],
    });

    // Hide all text tracks (captions, subtitles)
    this.player.textTracks().tracks_.forEach((track) => {
      track.mode = "hidden";
    });

    // Hide any other elements using CSS
    this.player.addClass("minimal-player"); // Add a class for custom styling
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose(); // Dispose of the player on component destroy
    }
  },
};
</script>

<style scoped>
/* Custom CSS to hide all controls and text */
.minimal-player .vjs-control-bar,
.minimal-player .vjs-big-play-button,
.minimal-player .vjs-error-display,
.minimal-player .vjs-loading-spinner {
  display: none !important;
}

/* Flexbox container for video and centered text */
.video-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 92vh; /* Adjust to fit your layout */
  position: relative;
}

/* Set max width for video */
.video-js {
  max-width: 100%;
  max-height: 100%;
}

.centered-image {
  position: absolute;
  top: 0%; /* Adjust the distance from the top to 20% */
  left: 0%; /* Center the image horizontally */
  //transform: translateX(-50%); /* Center horizontally using translate */
  margin-top: -70px;
  margin-left: -70px;
}
</style>
