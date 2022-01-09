<script lang="ts">
  import InlineSVG from 'svelte-inline-svg';
  import sensorMap from './sensorMap.svg';

  const sensors: Sensor[] = [];

  const transform = (svg) => {
    sensors.forEach((element) => {});

    let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', '20');
    point.setAttributeNS(null, 'cy', '20');
    point.setAttributeNS(null, 'r', '10');
    point.setAttributeNS(null, 'fill', 'red');
    svg.appendChild(point);

    let point2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point2.setAttributeNS(null, 'cx', '80');
    point2.setAttributeNS(null, 'cy', '50');
    point2.setAttributeNS(null, 'r', '10');
    point2.setAttributeNS(null, 'fill', 'green');
    svg.appendChild(point2);

    return svg;
  };
</script>

<InlineSVG src={sensorMap} transformSrc={transform} />
