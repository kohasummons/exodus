<script setup lang="ts">
interface Props {
  title: string
  url: string
  icon?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  external: true,
})

function handleClick() {
  if (props.external === false) {
    navigateTo(props.url)
  } else {
    window.open(props.url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <button
    class="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white/5 px-6 py-4 text-base font-medium transition-all duration-200 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98]"
    @click="handleClick"
  >
    <span
      v-if="icon"
      class="absolute left-5 text-lg transition-transform duration-200 group-hover:scale-110"
    >
      {{ icon }}
    </span>
    <span>{{ title }}</span>
  </button>
</template>
