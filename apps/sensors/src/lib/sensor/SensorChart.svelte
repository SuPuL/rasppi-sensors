<script lang="ts">
    import map from 'lodash/map.js';
    import reduce from 'lodash/reduce.js';
    import Chart from 'svelte-frappe-charts';
    import { formatDate, getColorString } from './types';
    import type { SensorCollection } from './types';
    import { sensorCollection } from './store';

    interface ChartData {
        datasets: { values: number[] }[];
        labels: string[];
    }

    const exmpteData = (): ChartData => ({
        datasets: [],
        labels: []
    });

    const maxDataPoints = 25;

    let collection: SensorCollection<string>;
    sensorCollection.subscribe((value) => {
        collection = value;
    });

    export let axisOptions = { xIsSeries: true };
    export let lineOptions = { spline: 1, hideDots: 1, xIsSeries: true };

    let colors: string[] = [];
    let data: ChartData = exmpteData();

    const reduceValues = (base: unknown[]) => {
        if (base.length <= maxDataPoints) {
            return base;
        }

        const ratio = Math.ceil(base.length / maxDataPoints);

        return base.filter((_value, index) => index % ratio == 0);
    };

    $: {
        const { newColors, newData } = reduce(
            collection?.values || [],
            ({ newColors, newData: { labels, datasets } }, { values, sensor: { color, label } }) => ({
                newColors: [...newColors, getColorString(color)],
                newData: {
                    labels: labels.length ? labels : map(reduceValues(values), ({ datetime }) => formatDate(datetime)),
                    datasets: [...datasets, { name: label, values: map(reduceValues(values), 'value') }]
                }
            }),
            { newColors: [], newData: exmpteData() }
        );

        colors = newColors;
        data = newData;
    }
</script>

<div class="mb-8">
    <div class="card shadow card-bordered card-compact lg:card-normal overflow-visible">
        {#if data?.datasets.length < 1 && colors}
            <div class="alert shadow-lg">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="stroke-info flex-shrink-0 w-6 h-6"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <div>
                        <span class="">No data found for the selected timerange.</span>
                    </div>
                </div>
            </div>
        {:else}
            <Chart {data} {axisOptions} {colors} {lineOptions} type="line" />
        {/if}
    </div>

    <div class="flex justify-center mt-4">
        <h2>Sensor Chart</h2>
    </div>
</div>
