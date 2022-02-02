<script lang="ts" context="module">
    import SensorMap from '$lib/sensor/SensorMap.svelte';
</script>

<svelte:head>
    <title>Overview</title>
</svelte:head>

<div class="card text-center shadow-2xl card-bordered card-compact lg:card-normal">
    <figure>
        <SensorMap />
    </figure>
    <div class="card-body">
        <h2 class="card-title">Overview</h2>
    </div>
</div>
