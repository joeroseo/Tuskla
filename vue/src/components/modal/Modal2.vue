<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <!-- Docs -->

            <div v-if="doctype === 'ChargingDoc'">
              <iframe
                src="../../docs/Charging.html"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'FAQs'">
              <iframe
                src="../../docs/FAQs.html"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'Ordering'">
              <iframe
                src="../../docs/Ordering.html"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'Warranty'">
              <iframe
                src="../../docs/Warranty.html"
                style="width: 80%; height: 350px; opacity: 5"
              ></iframe>
            </div>

            <div v-if="doctype === 'Plan'">
              <iframe
                src="../../docs/MasterPlan.html"
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
import { onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  props: { open: Boolean, doctype: String },
  setup(props, { emit }) {
    const router = useRouter(); // Use useRouter to access the router instance
    const route = useRoute(); // Use useRoute to access the current route

    // Explicitly cast the open prop to a boolean
    const isOpen = computed(() => Boolean(props.open));
    const doctype = props.doctype;

    const close = () => {
      // Use router.push to navigate back to the previous route
      router.push(route.params.from || "/");
    };

    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));
    return { isOpen, doctype, close };
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