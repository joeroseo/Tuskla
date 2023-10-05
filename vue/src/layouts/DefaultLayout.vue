<template>
  <div>
    <LayoutProduct />
    <router-view />
  </div>
</template>
<script>
/* eslint-disable */
import LayoutProduct from "../components/LayoutProduct.vue";
export default {
  components: { LayoutProduct },
};
</script>