<script lang="ts" context="module">
  import { loadSensors, sensors } from '$lib/sensor';
  import SensorMap from '$lib/sensor/SensorMap.svelte';

  let errorMessage: string;
</script>

<div>
  SensorList: {$sensors}<br />
  Error: {errorMessage}
</div>

<SensorMap />
