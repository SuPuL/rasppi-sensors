<script context="module">
    import NavLink from './../lib/NavLink.svelte';
    import '../global.css';

    export async function load({ fetch }) {
        const url = `/api/sensors`;
        const res = await fetch(url);

        if (res.ok) {
            const data = (await res.json()) || [];
            const entries = data.map((e) => ({
                ...e,
                datetime: new Date(e.datetime),
                measure: {
                    ...e.measure,
                    datetime: e?.measure?.datetime
                }
            }));

            return {
                props: {
                    entries
                }
            };
        }

        return {
            status: 404,
            error: new Error(`Could not load ${url}`)
        };
    }
</script>

<script lang="ts">
    import { sensors } from '../lib/sensor';
    import { onMount } from 'svelte';

    export let entries: any;

    onMount(async () => {
        sensors.set({ entries, isLoading: false });
    });
</script>

<div class="shadow bg-base-100 drawer h-screen">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content p-4 lg:p-6">
        <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div class="flex-none lg:hidden">
                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </label>
            </div>
            <div class="flex-1 px-2 mx-2">
                <span>Sensor@RaspberryPi</span>
            </div>
            <div class="flex-none hidden lg:block">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <NavLink href="/">Sensor Map</NavLink>
                    </li>
                    <li>
                        <NavLink href="/settings">Settings</NavLink>
                    </li>
                </ul>
            </div>
        </div>

        <main class="grow container mx-auto max-w-screen-xl py-4"><slot /></main>

        <footer class="items-center pt-4 footer">
            <div class="items-center grid-flow-col">
                <a href="http://github.com/SuPuL/rasppi-sensors">
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        class="fill-current"
                    >
                        <path
                            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
                        />
                    </svg>
                </a>
                <p>Sensor@RaspberryPi: dashboard for ds18b20 sensors - by SuPuL</p>
            </div>
        </footer>
    </div>
    <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay" />
        <ul class="p-4 overflow-y-auto menu w-80 bg-neutral text-neutral-content">
            <li>
                <NavLink href="/">Sensor Map</NavLink>
            </li>
            <li>
                <NavLink href="/settings">Settings</NavLink>
            </li>
        </ul>
    </div>
</div>
