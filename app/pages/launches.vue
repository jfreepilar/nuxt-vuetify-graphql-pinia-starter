<template>
  <div class="launches-container">
    <h1>SpaceX Launches</h1>
    <div class="filters">
      <div class="filter">
        <label for="year-filter">Filter by Year:</label>
        <select id="year-filter" v-model="filterYear">
          <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="filter">
        <label for="sort-order">Sort by Date:</label>
        <select id="sort-order" v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div class="launches-content">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error loading data: {{ error.message }}</div>
      <div v-else-if="sortedLaunches && sortedLaunches.length">
        <Card v-for="launch in sortedLaunches" :key="launch.mission_name" :title="launch.mission_name" :properties="launchProperties(launch)">
          <nuxt-link :to="`/rockets/${launch.rocket.rocket_name}`" class="details-link">View Rocket Details</nuxt-link>
          <button @click="addFavorite(launch.rocket.rocket_name)" class="favorite-button">Add to Favorites</button>
        </Card>
      </div>
      <div v-else class="no-launches">No launches found for the selected year.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useLaunchesFilter } from '@/composables/useLaunchesFilter';
import { useLaunchesSort } from '@/composables/useLaunchesSort';
import { useFavoritesStore } from '@/stores/favorites';
import Card from '@/components/Card.vue';

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      mission_name
      launch_date_utc
      launch_site {
        site_name
      }
      rocket {
        rocket_name
      }
      details
    }
  }
`;

interface Launch {
  mission_name: string;
  launch_date_utc: string;
  launch_site?: {
    site_name: string;
  };
  rocket: {
    rocket_name: string;
  };
  details?: string;
}

export default defineComponent({
  name: 'LaunchesPage',
  components: {
    Card,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_LAUNCHES);
    const launches = ref<Launch[]>([]);

    watchEffect(() => {
      if (result.value && result.value.launches) {
        launches.value = result.value.launches;
      }
    });

    const { filterYear, uniqueYears, filteredLaunches } = useLaunchesFilter(launches);
    const { sortOrder, sortedLaunches } = useLaunchesSort(filteredLaunches);

    const favoritesStore = useFavoritesStore();
    const addFavorite = (rocketName: string) => {
      favoritesStore.addFavorite(rocketName);
    };

    const launchProperties = (launch: Launch) => [
      { key: 'date', label: 'Date', value: new Date(launch.launch_date_utc).toLocaleDateString() },
      { key: 'launch_site', label: 'Launch Site', value: launch.launch_site?.site_name || null },
      { key: 'rocket', label: 'Rocket', value: launch.rocket.rocket_name },
      { key: 'details', label: 'Details', value: launch.details || null }
    ];

    return {
      launches,
      loading,
      error,
      filterYear,
      uniqueYears,
      filteredLaunches,
      sortOrder,
      sortedLaunches,
      addFavorite,
      launchProperties,
    };
  },
});
</script>

<style scoped>
.launches-container {
  margin: 100px 115px;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter {
  display: flex;
  align-items: center;
}

label {
  margin-right: 10px;
  font-size: 1rem;
}

select {
  padding: 5px 10px;
  font-size: 1rem;
  background-color: #000;
  color: white;
  border: 1px solid #fff;
  border-radius: 4px;
}

.launches-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading,
.error,
.no-launches {
  font-size: 1.25rem;
  margin-top: 20px;
}

.details-link,
.favorite-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.details-link:hover,
.favorite-button:hover {
  background-color: white;
  color: black;
}

.details-link {
  margin-right: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: center;
  }

  .filter {
    margin-bottom: 10px;
  }
}
</style>

