<template>
  <div class="next-launch-container">
    <main>
      <h1>Upcoming Launch</h1>
      <div class="launch-details">
        <div class="countdown">
          <h3>Countdown to Launch:</h3>
          <p>{{ countdown }}</p>
        </div>
        <h2>Mission: Mars Expedition</h2>
        <p>Date: {{ formattedLaunchDate }}</p>
        <p>Time: 10:00 AM UTC</p>
        <p>Launch Site: Kennedy Space Center, Launch Complex 39A</p>
        <p>Rocket: Starship</p>
        <p>Description: This mission will deliver a satellite to geostationary transfer orbit (GTO).</p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'NextLaunchPage',

  setup() {
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 1);
    const formattedLaunchDate = launchDate.toLocaleDateString();

    const countdown = ref('');

    const updateCountdown = () => {
      const now = new Date();
      const distance = launchDate.getTime() - now.getTime();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        countdown.value = 'Launched';
      }
    };

    onMounted(() => {
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });

    return {
      formattedLaunchDate,
      countdown,
    };
  },
});
</script>

<style scoped>
.next-launch-container {
  background-image: url('@/assets/image/launch-background.jpeg');
  background-position: center;
  background-size: cover;
  padding: 50px ;
  color: white;
  text-align: center;
}

main {
  padding: 2rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.launch-details {
  font-size: 1.2rem;
  text-align: left;
}

.launch-details h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.launch-details p {
  margin: 0.5rem 0;
}

.countdown {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.countdown h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.countdown p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffcc00;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .launch-details h2 {
    font-size: 1.5rem;
  }

  .countdown h3 {
    font-size: 1.2rem;
  }

  .countdown p {
    font-size: 1.5rem;
  }
}
</style>
