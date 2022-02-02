<script lang="ts">
    import InlineSVG from 'svelte-inline-svg';
    import { sensors } from './store';
    import sensorMap from './sensorMap.svg';
    import type { Sensor } from '.';

    const transformFactory = (sensorData: Sensor[]) => (svg) => {
        sensorData.forEach((sensor) => {
            let textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textNode.setAttributeNS(null, 'cx', sensor.x.toString());
            textNode.setAttributeNS(null, 'cy', sensor.y.toString());
            textNode.setAttributeNS(null, 'fill', 'red');
            textNode.appendChild(document.createTextNode(sensor.label));
            svg.appendChild(textNode);
        });

        return svg;
    };

    let transform: (svg: any) => any;
    sensors.subscribe((sensors) => {
        if (!sensors.isLoading) {
            transform = transformFactory(sensors.entries);
        }
    });
</script>

<pre>{JSON.stringify($sensors)}</pre>

<InlineSVG class="w-full h-auto" src={sensorMap} transformSrc={transform} />
