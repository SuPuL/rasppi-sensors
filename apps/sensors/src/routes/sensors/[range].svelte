<script lang="ts" context="module">
    import { sensors, SensorCollection, sensorCollection } from '../../lib/sensor';

    export async function load({ fetch, params }) {
        const res = await fetch(`/api/sensorsData/${params.range || 'week'}`);

        return res.ok
            ? {
                  props: {
                      collection: (await res.json()) || []
                  }
              }
            : {
                  status: 404,
                  error: new Error(`Could not load /api/sensorsData/${params.range || 'week'}`)
              };
    }
</script>

<script lang="ts">
    import SensorChart from '$lib/sensor/SensorChart.svelte';
    import SensorStats from '$lib/sensor/SensorStats.svelte';
    import { goto } from '$app/navigation';
    export let collection: SensorCollection<string>;

    $: {
        sensorCollection.set(collection);
    }

    const reload = (range: string) => {
        goto(range);
    };
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
        {#if collection}
            <div class="flex justify-center mb-8">
                <div class="btn-group">
                    <button class="btn" class:btn-active={'day' === collection.range} on:click={() => reload('day')}
                        >Today</button
                    >
                    <button class="btn" class:btn-active={'week' === collection.range} on:click={() => reload('week')}
                        >week</button
                    >
                    <button class="btn" class:btn-active={'month' === collection.range} on:click={() => reload('month')}
                        >month</button
                    >
                    <button
                        class="btn"
                        class:btn-active={'3month' === collection.range}
                        on:click={() => reload('3month')}>3 month</button
                    >
                </div>
            </div>

            <SensorChart />

            <SensorStats />
        {/if}
    </div>
{/if}
