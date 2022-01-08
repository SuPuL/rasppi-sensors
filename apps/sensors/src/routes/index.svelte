<script lang="ts" context="module">
  import { loadSensors, sensors } from '$lib/sensor';
  import SensorMap from '$lib/sensor/SensorMap.svelte';

  let errorMessage: string;

  export async function load() {
    loadSensors().catch((error) => {
      errorMessage = error.message;
    });
  }
</script>

<div>
  SensorList: {$sensors}<br />
  Error: {errorMessage}
</div>

<SensorMap />
