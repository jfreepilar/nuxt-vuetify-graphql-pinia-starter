<template>
  <div>
    <h1>Rocket Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error loading data: {{ error.message }}</div>
    <div v-else-if="rocket">
      <Card :title="rocket.name">
        <p v-if="rocket.description"><strong>Description:</strong> {{ rocket.description }}</p>
        <p v-if="rocket.first_flight"><strong>First Flight:</strong> {{ rocket.first_flight }}</p>
        <p v-if="rocket.height?.meters"><strong>Height:</strong> {{ rocket.height.meters }} meters</p>
        <p v-if="rocket.diameter?.meters"><strong>Diameter:</strong> {{ rocket.diameter.meters }} meters</p>
        <p v-if="rocket.mass?.kg"><strong>Mass:</strong> {{ rocket.mass.kg }} kg</p>
        <p v-if="rocket.stages"><strong>Number of Stages:</strong> {{ rocket.stages }}</p>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { rockets } from '@/composables/rocketsData';
import Card from '@/components/Card.vue';

const GET_ROCKET_DETAILS = gql`
  query GetRocketDetails($id: ID!) {
    rocket(id: $id) {
      name
      description
      first_flight
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
    }
  }
`;

interface Rocket {
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

export default defineComponent({
  name: 'RocketDetailsPage',
  components: {
    Card,
  },
  setup() {
    const route = useRoute();
    const rocketDetail = route.params.rocket_detail;
    const rocketId = rockets.find(rocket => rocket.name === rocketDetail)?.id;
    const { result, loading, error } = useQuery(GET_ROCKET_DETAILS, () => ({ id: rocketId }));
    const rocket = ref<Rocket | null>(null);

    watchEffect(() => {
      if (result.value && result.value.rocket) {
        rocket.value = result.value.rocket;
      }
    });

    return {
      rocket,
      loading,
      error,
    };
  },
});
</script>
