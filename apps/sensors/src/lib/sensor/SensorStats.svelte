<script lang="ts">
    import { formatDate, SensorCollection } from './types';

    export let collection: SensorCollection<string>;
</script>

<div class="overflow-x-auto w-full">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr>
                <th>Name</th>
                <th>Now</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
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
