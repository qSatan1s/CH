<template>
  <div id="app">
    <div :class="$style['option']">
      <label
        >enable vuex:
        <input v-model="onVuex" type="checkbox" @change="updateLocalStorage" />
      </label>
      <hr />
    </div>

    <PriceCalculator
      :local-storage-data="storageData"
      @sendRequest="sendRequest"
      @events="addLog"
    />

    <hr />
    <LogsCalculator :logs="logs" />
  </div>
</template>

<script setup>
import PriceCalculator from "@/widgets/PriceCalculator.vue";
import LogsCalculator from "@/features/LogsCalculator.vue";
import store from "./store/index";
import { ref, computed } from "vue";
const onVuex = ref(false);

const localLogs = ref([]);

const logs = computed(() =>
  onVuex.value ? store.getters.getLogs : localLogs.value
);
const localStorageData = ref(localStorage.getItem("data") || "{}");

const updateLocalStorage = () =>
  !onVuex.value
    ? (localStorageData.value = localStorage.getItem("data") || "{}")
    : store.commit("setLocalStorageData", localStorageData.value);

const storageData = computed(() =>
  onVuex.value ? store.getters.getLocalStorageData : localStorageData.value
);

const addLog = (log) => {
  if (onVuex.value) {
    store.commit("addLog", log);
  } else {
    localLogs.value.unshift(log);
  }
};

const sendRequest = (data) => {
  if (onVuex.value) {
    store.dispatch("sendRequest", data);
  } else {
    const json = JSON.stringify(data);
    logs.value.unshift(
      `Sent a request to change data from:${storageData.value} to ${json}`
    );
    setTimeout(() => {
      const success = data.amount % 2 === 0;
      if (success) {
        localStorage.setItem("data", json);
        localStorageData.value = json;
        logs.value.unshift(
          `Data successfully sent to backend: from ${storageData.value} to ${json}`
        );
      } else {
        logs.value.unshift(`Error sending data to backend: ${json}`);
      }
    }, 1000);
  }
};
</script>

<style module>
.option {
  display: flex;
  margin: 20px 0;
}
</style>
