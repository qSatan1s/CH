<script setup>
import { ref } from "vue";
import { debounce } from "@/shared/lib/debounce";

const nonce = ref(1);
const price = ref(1);
const qty = ref(1);
const amount = ref(1);
const emit = defineEmits(["sendRequest", "events"]);

defineProps({
  localStorageData: {
    type: String,
    default: "",
  },
});

const updatePrice = debounce(function () {
  if (!price.value || price.value === 0) {
    price.value = 1;
  }
  if (price.value && qty.value && price.value !== 0 && qty.value !== 0) {
    amount.value = price.value * qty.value;
  }
  emit("events", `Price update: ${price.value}`);
}, 300);

const updateQuantity = debounce(function () {
  if (!qty.value || qty.value === 0) {
    qty.value = 1;
  }

  if (price.value && qty.value && price.value !== 0 && qty.value !== 0) {
    amount.value = price.value * qty.value;
  }
  emit("events", `Quantity update: ${qty.value}`);
}, 300);

const updateAmount = debounce(function () {
  if (!amount.value || isNaN(amount.value)) {
    if (price.value && qty.value && price.value !== 0 && qty.value !== 0) {
      amount.value = price.value * qty.value;
    }
  } else {
    const newPrice = amount.value / qty.value;
    const newQty = amount.value / price.value;

    if (Math.abs(newPrice - price.value) > 0.01) {
      price.value = newPrice;
    } else if (Math.abs(newQty - qty.value) > 0.01) {
      qty.value = newQty;
    }
  }
  emit("events", `Amount  update: ${amount.value}`);
}, 300);

const sendRequest = () => {
  emit("sendRequest", {
    price: price.value,
    qty: qty.value,
    amount: amount.value,
    nonce: nonce.value,
  });
  nonce.value++;
};
</script>

<template>
  <section>
    <form :class="$style['container']">
      <label>
        <input
          v-model.number.trim="price"
          placeholder="price"
          type="number"
          @input="updatePrice"
        />
        <pre>price: {{ price }}</pre>
      </label>
      <label>
        <input
          v-model.number.trim="qty"
          placeholder="qty"
          type="number"
          @input="updateQuantity"
        />
        <pre>quantity: {{ qty }}</pre>
      </label>
      <label>
        <input
          v-model.number.trim="amount"
          placeholder="amount"
          type="number"
          @input="updateAmount"
        />
        <pre>amount: {{ amount }}</pre>
      </label>
      <div :class="$style['label']">
        <button type="submit" @click.prevent="sendRequest">Send</button>
        <pre>LocalStorage: {{ localStorageData }}</pre>
      </div>
    </form>
  </section>
</template>

<style module>
.container {
  display: flex;
  justify-content: space-around;
}

.label {
  min-width: 600px;
}
</style>
