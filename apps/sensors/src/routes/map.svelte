<script lang="ts" context="module">
    import { sensors } from '../lib/sensor';

    export async function load({ fetch, params }) {
        let sensorMap;
        try {
            const sensorMapTest = await fetch('/sensorMap.svg');
            if (sensorMapTest.status === 200) {
                sensorMap = '/sensorMap.svg';
            }
        } catch (e) {
            console.error('Error getting map.', e);
        }

        return {
            props: {
                sensorMap
            }
        };
    }
</script>

<script lang="ts">
    import SensorMap from '$lib/sensor/SensorMap.svelte';
    export let sensorMap: unknown;
</script>

<svelte:head>
    <title>Overview</title>
</svelte:head>

{#if $sensors.isLoading}
    <div class="justify-center card-actions">
        <button class="btn btn-sm btn-outline btn-primary loading">loading</button>
    </div>
{:else}
    <div class="flex flex-col w-full">
        <SensorMap {sensorMap} />
    </div>
{/if}
