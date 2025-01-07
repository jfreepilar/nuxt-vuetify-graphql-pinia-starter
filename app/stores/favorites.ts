import { defineStore } from 'pinia';
import { rockets } from '@/composables/rocketsData';

interface Rocket {
  id: string;
  name: string;
  description?: string;
  first_flight?: string;
  height?: {
    meters?: number;
  };
  diameter?: {
    meters?: number;
  };
  mass?: {
    kg?: number;
  };
  stages?: number;
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Rocket[],
  }),
  actions: {
    addFavorite(rocketName: string) {
      const rocket = rockets.find(rocket => rocket.name === rocketName);
      if (rocket && !this.favorites.some(fav => fav.id === rocket.id)) {
        this.favorites.push(rocket);
      }
    },
    removeFavorite(rocketId: string) {
      const index = this.favorites.findIndex(fav => fav.id === rocketId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
    clearFavorites() {
      this.favorites.splice(0, this.favorites.length);
    },
  },
});
