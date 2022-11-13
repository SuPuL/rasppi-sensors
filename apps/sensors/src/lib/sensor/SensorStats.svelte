<script lang="ts">
    import { orderBy } from 'lodash';
    import TD from '../TD.svelte';
    import { sensorCollection } from './store';
    import { formatDate, SensorCollection, SensorMeasures } from './types';

    let collection: SensorCollection<string>;

    sensorCollection.subscribe((newCol) => {
        const sorting = newCol.sorting || { id: 'id', direction: 'asc' };
        const sortParams: ((o: SensorMeasures<string>) => unknown)[] = [];
        switch (sorting.id) {
            case 'id':
                sortParams.push((o) => o.sensor.label);
                break;
            case 'now':
                sortParams.push((o) => o.sensor.measure?.value);
                break;
            case 'min':
                sortParams.push((o) => o.min.value);
                break;
            case 'max':
                sortParams.push((o) => o.max.value);
                break;
            case 'avg':
                sortParams.push((o) => o.avg);
                break;
        }
        const values = orderBy(newCol.values, sortParams, [sorting.direction || 'desc']);

        collection = {
            values,
            sorting,
            range: newCol.range
        };
    });
</script>

<div class="overflow-x-auto w-full">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr>
                <TD id="id">Name</TD>
                <TD id="now">Now</TD>
                <TD id="min">Min</TD>
                <TD id="max">Max</TD>
                <TD id="avg">Avg</TD>
            </tr>
        </thead>
        <tbody>
            {#each collection?.values || [] as measure}
                <tr>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="badge badge-lg" style="background: {measure.sensor.color.hex};" />
                            <div>
                                <div class="font-bold">{measure.sensor?.label}</div>
                                <div class="text-xs opacity-50">{measure.sensor.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="font-bold">{measure.sensor?.measure?.value | 0}°</div>
                        <div class="text-xs opacity-50">{formatDate(measure.sensor?.measure?.datetime)}</div>
                    </td>
                    <td>
                        <div class="font-bold">{measure.min?.value | 0}°</div>
                        <div class="text-xs opacity-50">{formatDate(measure.min?.datetime)}</div>
                    </td>
                    <td>
                        <div class="font-bold">{measure.max?.value | 0}°</div>
                        <div class="text-xs opacity-50">{formatDate(measure?.max?.datetime)}</div>
                    </td>
                    <td>
                        <div class="font-bold">{measure.avg | 0}°</div>
                        <div class="text-xs opacity-50">&nbsp;</div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
