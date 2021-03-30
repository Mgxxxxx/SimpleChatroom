<template>
  <demo />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Demo from "@/components/demo.vue";
export default defineComponent({
  name: "App",
  components: { Demo },
});
</script>

<style>
</style>