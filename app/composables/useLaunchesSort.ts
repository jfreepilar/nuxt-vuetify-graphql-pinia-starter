import type { Ref } from 'vue';
import { ref, computed } from 'vue';
import type { Launch } from './useLaunchesFilter';

export function useLaunchesSort(filteredLaunches: Ref<Launch[]>) {
  const sortOrder = ref('asc');

  const sortedLaunches = computed(() => {
    const sorted = [...filteredLaunches.value];
    return sorted.sort((a, b) => {
      const dateA = new Date(a.launch_date_utc).getTime();
      const dateB = new Date(b.launch_date_utc).getTime();
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA;
    });
  });

  return {
    sortOrder,
    sortedLaunches,
  };
}

