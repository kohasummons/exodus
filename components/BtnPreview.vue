<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <a :href="href ?? '#'" class="btn-preview">
    <slot>Preview</slot>
  </a>
</template>

<style scoped>
.btn-preview {
  background-color: #91a89e;
  background-image: 
    linear-gradient(
      167deg, 
      rgba(255, 255, 255, 0.1) 50%, 
      rgba(0, 0, 0, 0) 55%
    ),
    linear-gradient(
      to bottom, 
      rgba(255, 255, 255, 0.15), 
      rgba(0, 0, 0, 0)
    );
  border-radius: 6px;
  box-shadow:
    0 0 0 1px #829B90 inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 8px 0 0 #647D72,
    0 8px 0 1px rgba(0, 0, 0, 0.4),
    0 8px 8px 1px rgba(0, 0, 0, 0.5);
  color: #FFF;
  display: inline-block;
  font-family: "Lucida Grande", Arial, sans-serif;
  font-size: 22px;
  font-weight: bold;
  height: 61px;
  letter-spacing: -1px;
  line-height: 61px;
  margin: 30px 0 10px;
  position: relative;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-decoration: none !important;
  top: 0;
  width: 186px;
  transition: all 0.15s ease;
}

.btn-preview:hover,
.btn-preview:focus {
  background-color: #759185;
  box-shadow: 
    0 0 0 1px #829B90 inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 10px 0 0 #5B7167,
    0 10px 0 1px rgba(0, 0, 0, 0.4),
    0 10px 8px 1px rgba(0, 0, 0, 0.6);
  top: -2px;
}

.btn-preview:active {
  box-shadow: 
    0 0 0 1px #647D72 inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 0 0 1px rgba(0, 0, 0, 0.4);
  transform: translateY(10px);
}
</style>
