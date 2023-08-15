export default {
  state: {
    localStorageData: localStorage.getItem("data") || "{}",
    logs: [],
  },

  mutations: {
    setLocalStorageData(state, newData) {
      state.localStorageData = newData;
    },
    addLog(state, log) {
      state.logs.unshift(log);
    },
  },
  actions: {
    sendRequest({ commit, state }, data) {
      const json = JSON.stringify(data);
      commit(
        "addLog",
        `Sent a request to change data from: ${state.localStorageData} to ${json}`
      );

      setTimeout(() => {
        const success = data.amount % 2 === 0;
        if (success) {
          commit("setLocalStorageData", json);
          localStorage.setItem("data", json);
          commit(
            "addLog",
            `Data successfully sent to backend: from ${state.localStorageData} to ${json}`
          );
        } else {
          commit("addLog", `Error sending data to backend: ${json}`);
        }
      }, 1000);
    },
  },
  getters: {
    getLogs: (state) => state.logs,
    getLocalStorageData: (state) => state.localStorageData,
  },
};
