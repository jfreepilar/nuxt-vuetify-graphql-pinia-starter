<template>
  <div class="card">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <div v-for="property in properties" :key="property.key">
        <p v-if="property.value !== null && property.value !== undefined">
          <strong>{{ property.label }}:</strong> {{ property.value }}
        </p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface Property {
  key: string;
  label: string;
  value: string | number | null;
}

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    properties: {
      type: Array as PropType<Property[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 8px;
}

.card-body {
  padding: 8px;
}
</style>
