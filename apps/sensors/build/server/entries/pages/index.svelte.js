import { c as create_ssr_component, v as validate_component, n as noop, a as safe_not_equal, b as subscribe, e as escape } from "../../chunks/index-3c05442c.js";
import InlineSVG from "svelte-inline-svg";
var sensorMap = "/_app/assets/sensorMap-5502e00e.svg";
const SensorMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const transform = (svg) => {
    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttributeNS(null, "cx", "20");
    point.setAttributeNS(null, "cy", "20");
    point.setAttributeNS(null, "r", "10");
    point.setAttributeNS(null, "fill", "red");
    svg.appendChild(point);
    let point2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point2.setAttributeNS(null, "cx", "80");
    point2.setAttributeNS(null, "cy", "50");
    point2.setAttributeNS(null, "r", "10");
    point2.setAttributeNS(null, "fill", "green");
    svg.appendChild(point2);
    return svg;
  };
  return `${validate_component(InlineSVG, "InlineSVG").$$render($$result, { src: sensorMap, transformSrc: transform }, {}, {})}`;
});
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const sensors = writable([]);
let errorMessage;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sensors, $$unsubscribe_sensors;
  $$unsubscribe_sensors = subscribe(sensors, (value) => $sensors = value);
  $$unsubscribe_sensors();
  return `<div>SensorList: ${escape($sensors)}<br>
  Error: ${escape(errorMessage)}</div>

${validate_component(SensorMap, "SensorMap").$$render($$result, {}, {}, {})}`;
});
export { Routes as default };
