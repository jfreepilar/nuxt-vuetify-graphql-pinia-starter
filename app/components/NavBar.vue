<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <img src="@/assets/image/spacex-logo.png" alt="SpaceX logo" class="logo">
    <button class="menu-toggle" @click="toggleMenu">☰</button>
    <ul :class="{ open: isMenuOpen }">
      <li v-for="item in navItems" :key="item.text">
        <nuxt-link :to="item.link">{{ item.text }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      navItems: [
        { text: 'HOME', link: '/' },
        { text: 'HUMAN SPACE FLIGHT', link: '/launches' },
        { text: 'RIDE SHARE', link: '/launches' },
        { text: 'STARSHIELD', link: '/launches' },
        { text: 'STARLINK', link: '/launches' },
        { text: 'FAVORITES', link: '/favorites' },
      ],
      isMenuOpen: false,
    };
  },
  setup() {
    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
});
</script>

<style scoped>
.navbar {
  background-color: #000;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: -80px 80px 0;
  position: relative;
}

img {
  width: 200px;
  height: 200px;
  margin: -10px 0 0;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  display: none;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 60%;
  margin: 8px 0 0;
  padding: 0 0 5px;
}

ul.open {
  display: block;
}

ul li {
  margin: 10px 0;
}

a {
  position: relative;
  color: white;
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px; 
  width: 0;
  height: 1px; 
  background-color: white;
  transition: width 200ms ease-in-out;
}

a:hover::after {
  width: 100%;
}

@media (max-width: 992px) {
  .navbar {
    justify-content: space-evenly;
  }

  .menu-toggle {
    display: block;
  }

  ul {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 130px;
    right: 90px;
    background-color: black;
    width: 100%;
    padding: 0 20px;
    z-index: 1000;
  }

  ul.open {
    display: flex;
  }
}

@media (min-width: 993px) {
  .menu-toggle {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    position: static;
    width: 60%;
    margin: 8px 0 0;
    padding: 0 0 5px;
  }

  ul.open {
    display: flex; 
  }
}
</style>

