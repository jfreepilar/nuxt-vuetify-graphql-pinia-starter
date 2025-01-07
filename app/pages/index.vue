<template>
  <div>
    <main>
      <div class="launches-container">
        <div ref="launchesText" class="text-container slide-in-bottom">
          <h1>WELCOME TO SPACEX</h1>
          <p>Explore the latest SpaceX launches and missions</p>
          <nuxt-link to="/launches" class="launches-link">GO TO LAUNCHES</nuxt-link>
        </div>
      </div>

      <div class="upcoming-launch-container">
        <div ref="upcomingText" class="text-container slide-in-bottom">
          <p>UPCOMING LAUNCH</p>
          <h2>STARSHIP'S SEVENTH FLIGHT TEST</h2>
          <nuxt-link to="/next-launch" class="learn-more-btn">Learn More</nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const launchesText = ref<HTMLElement | null>(null);
    const upcomingText = ref<HTMLElement | null>(null);

    onMounted(() => {
      const observerOptions = {
        threshold: 0.1,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      if (launchesText.value) {
        observer.observe(launchesText.value);
      }

      if (upcomingText.value) {
        observer.observe(upcomingText.value);
      }
    });

    return {
      launchesText,
      upcomingText,
    };
  },
});
</script>

<style scoped>
.slide-in-bottom {
  position: relative; 
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 2s ease-out, transform 2s ease-out; 
}

.slide-in-bottom.visible {
  opacity: 1;
  transform: translateY(0);
}

.launches-container {
  background-image: url('@/assets/image/spacex-launch.jpg');
  background-position: center;
  background-size: cover;
  height: 100vh;
}

.text-container {
  display: flex;
  flex-direction: column;
  padding: 250px 0 0 130px;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.75rem;
  width: 500px;
  line-height: normal;
}

p {
  font-size: 1.25rem;
}

.launches-link,
.learn-more-btn {
  border: 2px solid white;
  font-size: .75rem;
  width: 180px;
  text-align: center;
  padding: 8px 24px;
  margin: 5px 0 0;
  transition: all 0.5s ease-in-out;
}

.learn-more-btn {
  font-size: 1rem;
  padding: 5px 20px;
}

a {
  text-decoration: none;
  color: white;
}

.launches-link:hover,
.learn-more-btn:hover {
  background-color: white;
  color: black;
}

.upcoming-launch-container {
  background-image: url('@/assets/image/spacex-upcoming.jpg');
  background-position: center;
  background-size: cover;
  height: 100vh;
}

@media (max-width: 768px) {
  .text-container {
    padding-left: 70px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 2rem;
  }

  .launches-link,
  .learn-more-btn {
    width: 160px;
  }
}
</style>
