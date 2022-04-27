<script lang="ts">
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import omit from 'lodash/omit.js';
    import ColorPicker from 'svelte-awesome-color-picker/ColorPicker.svelte';
    import Dropzone from 'svelte-file-dropzone';
    import * as yup from 'yup';
    import ColorPickerInput from '../lib/colorPicker/ColorPickerInput.svelte';
    import ColorPickerWrapper from '../lib/colorPicker/ColorPickerWrapper.svelte';
    import { sensors } from '../lib/sensor/store';
    import type { Sensor } from '../lib/sensor/types';

    let fileToUpload;
    let errorResult: 'Error' | 'Success' | undefined;
    const handleFilesSelect = (e) => {
        const { acceptedFiles } = e.detail;
        fileToUpload = acceptedFiles?.[0];
        errorResult = undefined;
    };

    const handleUpload = async () => {
        /* Checks if all the data is set */
        if (fileToUpload) {
            /* Creates the form data */
            let formData = new FormData();
            /* Size must be the first part */
            formData.append('file', fileToUpload, 'sensorMap.svg');
            formData.append('size', fileToUpload.size);
            formData.append('mimeType', 'image/svg+xml');
            /* Calls the process on the server */
            const res = await fetch('api/uploadSensorMap', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                console.error('upload error status ' + res.status + ', status text: ' + res.statusText);
                errorResult = 'Error';
            } else {
                errorResult = 'Success';
            }
        }
    };

    type SensorFormData = Omit<Sensor<string>, 'measure' | 'datetime'>;

    let message: string;
    let status: number;

    let initialValues: SensorFormData[];

    sensors.subscribe((values) => {
        if (!values.isLoading) {
            initialValues = values.entries.map((s) => omit(s, ['datetime', 'measure']));
        }
    });

    const schema = yup.object({
        sensors: yup.array(
            yup.object({
                id: yup.string().required(),
                label: yup.string().required(),
                fontSize: yup.number().moreThan(0),
                x: yup.number().moreThan(-1),
                y: yup.number().moreThan(-1),
                colorHex: yup.string(),
                hide: yup.boolean()
            })
        )
    });
    const { form, errors, isValid, isSubmitting, isDirty, setFields } = createForm({
        extend: validator({ schema }),
        onSubmit: async (formData): Promise<void> => {
            console.log(formData);
            const entries = $sensors.entries.map((sensor) => {
                const { colorHex, ...rest } = formData.sensors.find((entry) => entry.id === sensor.id);
                return { ...sensor, ...rest, color: { hex: colorHex } };
            });
            const payload = entries.map((v) => omit({ ...v, color: v.color.hex }, ['datetime', 'measure']));

            const submit = await fetch('/api/sensors', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const data = await submit.json();
            status = submit.status;
            message = data.message;
            if (200 === status) {
                sensors.set({ entries, isLoading: false });
                isDirty.set(false);
            } else {
                message = data.message;
            }
        }
    });

    $: {
        (initialValues || []).forEach((sensor, i) => {
            setFields(`sensors.${i}.colorHex`, sensor.color.hex, true);
        });
    }
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

{#if $sensors.isLoading}
    <div class="justify-center card-actions">
        <button class="btn btn-sm btn-outline btn-primary loading">loading</button>
    </div>
{:else if 1 > $sensors.entries.length}
    <div class="card card-bordered shadow-sm bg-accent text-accent-content">
        <div class="card-body">
            <h2 class="card-title">Sensor settings</h2>
            <p>No sensors found in your database. Please check the sensor reader process.</p>
        </div>
    </div>
{:else}
    <div class="card card-bordered shadow-sm mb-8">
        <div class="card-body">
            <h2 class="card-title mb-4">Found Sensors</h2>
            <form use:form>
                <div class="overflow-x-auto">
                    <table class="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Label</th>
                                <th>X</th>
                                <th>Y</th>
                                <th>Color</th>
                                <th>Font Size (em)</th>
                                <th>Hide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each initialValues as sensor, i}
                                <tr>
                                    <th>{sensor.id}<input name="sensors[{i}].id" type="hidden" value={sensor.id} /></th>
                                    <td
                                        ><input
                                            id="label"
                                            name="sensors[{i}].label"
                                            type="text"
                                            value={sensor.label}
                                            placeholder="label"
                                            class="input"
                                            class:input-error={$errors.sensors?.[i]?.label}
                                            class:input-bordered={$errors.sensors?.[i]?.label}
                                        />
                                        {#if $errors.sensors?.[i]?.label}
                                            <label for="label" class="label">
                                                <span class="label-text-alt">Label cannot be empty.</span>
                                            </label>
                                        {/if}
                                    </td>
                                    <td>
                                        <input
                                            id="x"
                                            name="sensors[{i}].x"
                                            type="number"
                                            value={sensor.x}
                                            placeholder="x"
                                            class="input w-24"
                                            class:input-error={$errors.sensors?.[i]?.x}
                                            class:input-bordered={$errors.sensors?.[i]?.x}
                                        />
                                        {#if $errors.sensors?.[i]?.x}
                                            <label for="x" class="label">
                                                <span class="label-text-alt">X must be a positiv number.</span>
                                            </label>
                                        {/if}
                                    </td>
                                    <td>
                                        <input
                                            id="y"
                                            name="sensors[{i}].y"
                                            type="number"
                                            value={sensor.y}
                                            placeholder="y"
                                            class="input w-24"
                                            class:input-error={$errors.sensors?.[i]?.y}
                                            class:input-bordered={$errors.sensors?.[i]?.y}
                                        />
                                        {#if $errors.sensors?.[i]?.y}
                                            <label for="y" class="label">
                                                <span class="label-text-alt">Y must be a positiv number.</span>
                                            </label>
                                        {/if}
                                    </td>
                                    <td>
                                        <ColorPicker
                                            bind:color={sensor.color}
                                            isAlpha={false}
                                            components={{ wrapper: ColorPickerWrapper, input: ColorPickerInput }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            id="fontSize"
                                            name="sensors[{i}].fontSize"
                                            type="number"
                                            value={sensor.fontSize}
                                            placeholder="fontSize"
                                            class="input w-24"
                                            class:input-error={$errors.sensors?.[i]?.fontSize}
                                            class:input-bordered={$errors.sensors?.[i]?.fontSize}
                                        />
                                        {#if $errors.sensors?.[i]?.fontSize}
                                            <label for="fontSize" class="label">
                                                <span class="label-text-alt">Fontsize must be a positiv number.</span>
                                            </label>
                                        {/if}
                                    </td>
                                    <td>
                                        <input
                                            id="hide"
                                            name="sensors[{i}].hide"
                                            type="checkbox"
                                            bind:checked={sensor.hide}
                                            value={sensor.hide}
                                            placeholder="hide"
                                            class="toggle"
                                        />
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>

                    {#if message}
                        <div class="alert mt-6" class:alter-error={status !== 200} class:alert-success={status === 200}>
                            <div class="flex-1">
                                <label>{message}</label>
                            </div>
                        </div>
                    {/if}

                    <div class="w-full flex justify-center mt-6">
                        <input
                            type="submit"
                            value="Store"
                            class="btn btn-primary"
                            disabled={!$isValid}
                            class:loading={$isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="card card-bordered shadow-sm">
        <div class="card-body">
            <h2 class="card-title mb-4">Upload custom overview (*.svg)</h2>

            {#if errorResult}
                <div
                    class="alert mb-6"
                    class:alter-error={errorResult === 'Error'}
                    class:alert-success={errorResult === 'Success'}
                >
                    <div class="flex-1">
                        {#if errorResult === 'Error'}
                            <label>Error uploading your svg. Please try again.</label>
                        {:else}
                            <label>Svg was succesfully upload.</label>
                        {/if}
                    </div>
                </div>
            {/if}

            {#if fileToUpload}
                <div class="w-full flex justify-center">
                    <div>Select file: {fileToUpload.name}</div>
                </div>
            {/if}

            <Dropzone on:drop={handleFilesSelect} accept="image/svg+xml" multiple="false" />

            <div class="w-full flex justify-center">
                <input
                    type="submit"
                    value="Upload"
                    on:click={handleUpload}
                    class="btn btn-primary"
                    disabled={!fileToUpload}
                />
            </div>
        </div>
    </div>
{/if}
