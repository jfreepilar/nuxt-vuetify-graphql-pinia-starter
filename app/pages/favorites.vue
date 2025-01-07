<template>
  <div class="main-container slide-in-bottom">
    <h1>Favorite Rockets</h1>
    <button class="clear-btn" @click="clearFavorites">Clear Favorites</button>
    <div v-if="favorites.length === 0" class="no-favorites">No favorite rockets added.</div>
    <div class="card-container">
      <Card v-for="rocket in favorites" :key="rocket.id" :title="rocket.name" :properties="rocketProperties(rocket)">
        <button class="remove-btn" @click="removeFavorite(rocket.id)">Remove from Favorites</button>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import Card from '@/components/Card.vue';

interface Rocket {
  id: string;
  name: string;
  description?: string;
  first_flight?: string;
  height?: { meters?: number };
  diameter?: { meters?: number };
  mass?: { kg?: number };
  stages?: number;
}

export default defineComponent({
  name: 'FavoritesPage',
  components: {
    Card,
  },
  setup() {
    const favoritesStore = useFavoritesStore();

    const rocketProperties = (rocket: Rocket) => [
      { key: 'description', label: 'Description', value: rocket.description || null },
      { key: 'first_flight', label: 'First Flight', value: rocket.first_flight || null },
      { key: 'height_meters', label: 'Height', value: rocket.height?.meters ? `${rocket.height.meters} meters` : null },
      { key: 'diameter_meters', label: 'Diameter', value: rocket.diameter?.meters ? `${rocket.diameter.meters} meters` : null },
      { key: 'mass_kg', label: 'Mass', value: rocket.mass?.kg ? `${rocket.mass.kg} kg` : null },
      { key: 'stages', label: 'Number of Stages', value: rocket.stages || null }
    ];

    const clearFavorites = () => {
      favoritesStore.clearFavorites();
    };

    const removeFavorite = (rocketId: string) => {
      favoritesStore.removeFavorite(rocketId);
    };

    return {
      favorites: favoritesStore.favorites,
      removeFavorite,
      clearFavorites,
      rocketProperties,
    };
  },
});
</script>


<style scoped>
@keyframes slide-in-bottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.main-container {
  margin: 100px 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: slide-in-bottom 0.5s ease-out;
}

.clear-btn, .remove-btn {
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.clear-btn:hover, .remove-btn:hover {
  background-color: #ff0000;
  color: #000;
}

.clear-btn {
  margin: 20px 0;
}

.no-favorites {
  margin-top: 20px;
  font-size: 1.2rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}

.remove-btn {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .main-container {
    margin: 50px 20px;
  }

  .card-container {
    flex-direction: column;
    gap: 10px;
  }
}
</style>




