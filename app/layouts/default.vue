<template>
	<div class="wrapper">
		<NavBar />
		<NuxtPage />
	  <Footer />
	</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
	name: 'DefaultLayout',
	components: {
	  NavBar,
	  Footer,
	},
  });
  </script>
  
  <style scoped>
  html, body {
	height: 100%;
	margin: 0;
  }
  
  .wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
  }
  
  .navbar {
	background-color: transparent;
	position: fixed;
	top:0;
	width: 100%;
	z-index: 1000;
  }
  </style>
  