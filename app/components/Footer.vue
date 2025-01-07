<template>
  <footer>
    <ul>
      <li v-for="item in footerItems" :key="item.text">
        <a v-if="item.link" :href="item.link">{{ item.text }}</a>
        <span v-else>{{ item.text }}</span>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  data() {
    return {
      footerItems: [
        { text: 'SpaceX © 2024' },
        { text: 'Privacy Policy', link: '/launch' },
        { text: 'Suppliers', link: '/launch' },
      ],
    };
  },
});
</script>

<style scoped>
footer {
  background-color: #000;
  color: #fff;
  padding: 1rem;
  text-align: center;
  width: 100%;
  height: 80px;
  margin-top: auto;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 50px;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  text-decoration: none;
}

a {
  color: #fff;
  text-decoration: none;
  transition: color 0.5s ease;
}

a:hover {
  color: #ccc;
}
</style>
