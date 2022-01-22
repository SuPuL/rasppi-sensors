<script lang="ts" context="module">
    import { loadSensors, sensors } from '$lib/sensor';
    import SensorMap from '$lib/sensor/SensorMap.svelte';

    let errorMessage: string;
</script>

<svelte:head>
    <title>Overview</title>
</svelte:head>

<h1>Overview</h1>

<div>
    <SensorMap />
</div>
