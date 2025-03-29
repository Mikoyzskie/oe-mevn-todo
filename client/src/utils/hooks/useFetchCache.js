import { computed, reactive } from "vue";
import useFetch from "./hooks";

const cacheMap = reactive(new Map());

export const useFetchCache = (key, url, config) => {
  const result = useFetch(url, { skip: true, ...config });

  const update = () => cacheMap.set(key, result.response.value);
  const clear = () => cacheMap.set(key, undefined);

  const fetch = async () => {
    try {
      await result.fetch();
      update();
    } catch {
      clear();
    }
  };

  const response = computed(() => cacheMap.get(key));
  const data = computed(() => response.value?.data);

  if (response.value == null) fetch();

  return { ...result, fetch, data, response, clear };
};
