<template>
  <section>
    Logs: {{ logs.length }}
    <p
      v-for="(log, index) in logs"
      :key="`${log}_${index}`"
      :class="$style['log']"
    >
      {{ log }}
    </p>
  </section>
</template>

<script setup>
defineProps({
  logs: {
    type: Array,
    default: () => [],
  },
});
</script>

<style module>
.log {
}
</style>
