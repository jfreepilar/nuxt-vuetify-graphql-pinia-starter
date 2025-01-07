import type { Ref } from 'vue';
import { ref, computed } from 'vue';

export interface Launch {
  mission_name: string;
  launch_date_utc: string;
  launch_site?: { site_name: string };
  rocket: { rocket_name: string };
  details?: string;
}

export function useLaunchesFilter(launches: Ref<Launch[]>) {
  const filterYear = ref('All Years');

  const uniqueYears = computed(() => {
    const yearsSet = new Set(launches.value.map(launch => new Date(launch.launch_date_utc).getFullYear()));
    return ['All Years', ...Array.from(yearsSet)];
  });

  const filteredLaunches = computed(() => {
    if (filterYear.value === 'All Years') return launches.value;
    return launches.value.filter(
      launch => new Date(launch.launch_date_utc).getFullYear() === parseInt(filterYear.value)
    );
  });

  return {
    filterYear,
    uniqueYears,
    filteredLaunches,
  };
}
