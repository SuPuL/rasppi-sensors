<script lang="ts">
    import InlineSVG from 'svelte-inline-svg';
    import { formatDate, Sensor } from '.';
    import { sensors } from './store';

    const createTextNode = (x: number, y: number, color: string = '#444444', fontSize = '1.6em'): SVGTextElement => {
        const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textNode.setAttributeNS(null, 'x', `${x}px`);
        textNode.setAttributeNS(null, 'y', `${y}px`);
        textNode.setAttributeNS(null, 'fill', color);
        textNode.style.fontSize = fontSize;

        return textNode;
    };

    const createTextSpan = (
        label: string,
        x: number,
        fontSize: string = '1em',
        color: string = '#444444'
    ): SVGTSpanElement => {
        const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        textNode.setAttributeNS(null, 'fill', color);
        textNode.style.fontSize = fontSize;
        textNode.setAttributeNS(null, 'x', `${x}px`);
        textNode.setAttributeNS(null, 'dy', '1.0em');
        textNode.appendChild(document.createTextNode(label));

        return textNode;
    };

    const createRectNode = (
        content: SVGTextElement,
        color: string = '#444444',
        height: number = 85,
        width: number = 200,
        horizontalPadding: number = 1.05,
        lineHeight: number = 1.25
    ): SVGElement => {
        const rectobj = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        const x = Number.parseFloat(content.getAttribute('x')) - 15;
        const y = Number.parseFloat(content.getAttribute('y')) - 5;
        rectobj.setAttribute('x', x.toFixed(0));
        rectobj.setAttribute('y', y.toFixed(0));
        rectobj.setAttribute('height', (lineHeight * height).toFixed(1));
        rectobj.setAttribute('width', (horizontalPadding * width).toFixed(1));
        rectobj.setAttribute('fill', color);
        rectobj.setAttribute('fill-opacity', '0.1');

        return rectobj;
    };

    const transformFactory = (sensorData: Sensor<string>[]) => (svg) => {
        sensorData
            .filter((s) => !s.hide)
            .forEach(({ label, x, y, fontSize, color: { hex }, measure: { datetime, value } }) => {
                const textNode = createTextNode(x, y, hex);
                textNode.appendChild(createTextSpan(label, x, `${fontSize}em`, hex));
                textNode.appendChild(createTextSpan(`${value.toFixed(2)}°`, x, `${fontSize - 0.2}em`));
                textNode.appendChild(createTextSpan(formatDate(datetime), x, `${fontSize - 0.2}em`));
                const rect = createRectNode(textNode, hex);
                svg.appendChild(rect);
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

    export let sensorMap;
</script>

<div class="text-center">
    <div class="card p-4 shadow card-bordered card-compact lg:card-normal">
        {#if sensorMap}
            <figure>
                <InlineSVG class="margin-auto" src={sensorMap} transformSrc={transform} />
            </figure>
        {:else}
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
                        <span class="">No sensor map found. Please upload a new file.</span>
                    </div>
                </div>
                <div class="flex-none">
                    <a href="/settings" class="btn btn-sm">Settings</a>
                </div>
            </div>
        {/if}
    </div>

    <div class="flex justify-center mt-4">
        <h2>Overview</h2>
    </div>
</div>
