<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <div v-if="doctype === 'model3Pricing'">
              <iframe
                src="../img/vehicles/model3Pricing.htm"
                style="width: 100%; height: 350px"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelYPricing'">
              <iframe
                src="../img/vehicles/modelYPricing.htm"
                style="width: 100%; height: 350px"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelXPricing'">
              <iframe
                src="../img/vehicles/modelXPricing.htm"
                style="width: 100%; height: 350px"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelSPricing'">
              <iframe
                src="../img/vehicles/modelSPricing.htm"
                style="width: 100%; height: 350px"
              ></iframe>
            </div>

            <div v-if="doctype === 'GasSavings'">
              <iframe
                src="../img/vehicles/GasSavings2.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'model3Features'">
              <iframe
                src="../img/vehicles/model3Features.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelYFeatures'">
              <iframe
                src="../img/vehicles/modelYFeatures.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelXFeatures'">
              <iframe
                src="../img/vehicles/modelXFeatures.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelSFeatures'">
              <iframe
                src="../img/vehicles/modelSFeatures.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'model3RimsTires'">
              <iframe
                src="../img/vehicles/model3RimsTires.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelYRimsTires'">
              <iframe
                src="../img/vehicles/RimsTires.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelXRimsTires'">
              <iframe
                src="../img/vehicles/RimsTires.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelSRimsTires'">
              <iframe
                src="../img/vehicles/RimsTires.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'model3Interior'">
              <iframe
                src="../img/vehicles/model3Interior.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelYInterior'">
              <iframe
                src="../img/vehicles/modelYInterior.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelXInterior'">
              <iframe
                src="../img/vehicles/modelXInterior.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelSInterior'">
              <iframe
                src="../img/vehicles/modelSInterior.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'model3Seating'">
              <iframe
                src="../img/vehicles/model3Seating.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelYSeating'">
              <iframe
                src="../img/vehicles/modelYSeating.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelXSeating'">
              <iframe
                src="../img/vehicles/modelXSeating.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'modelSSeating'">
              <iframe
                src="../img/vehicles/modelSSeating.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'Charging'">
              <iframe
                src="../img/vehicles/Charging.htm"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <button type="button" @click="close">Close</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onMounted, onUnmounted } from "vue";

export default {
  props: { open: Boolean, doctype: String },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return { close };
  },
};
</script>

<style scoped>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 800px;
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>