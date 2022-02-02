<script lang="ts">
    import type { ValidatorConfig } from '@felte/validator-yup';
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import * as yup from 'yup';
    import { Sensor, sensors } from '../lib/sensor';
    import ColorPickerWrapper from '../lib/colorPicker/ColorPickerWrapper.svelte';
    import ColorPickerInput from '../lib/colorPicker/ColorPickerInput.svelte';
    import ColorPicker from 'svelte-awesome-color-picker/ColorPicker.svelte';
    import cloneDeep from 'lodash/cloneDeep';

    type FormData = { sensors: Sensor[] };

    let message: string;
    let status: number;

    let initialValues: Sensor[];

    sensors.subscribe((values) => {
        if (!values.isLoading) {
            initialValues = cloneDeep(values.entries);
        }
    });

    const validateSchema = yup.object({
        sensors: yup.array(
            yup.object({
                id: yup.string().required(),
                label: yup.string().required(),
                x: yup.number().moreThan(-1),
                y: yup.number().moreThan(-1),
                colorHex: yup.string(),
                hide: yup.boolean()
            })
        )
    });
    const { form, errors, isValid, isSubmitting, isDirty } = createForm<
        yup.InferType<typeof validateSchema>,
        ValidatorConfig
    >({
        extend: validator,
        validateSchema,
        onSubmit: async (formData, context): Promise<void> => {
            const entries = $sensors.entries.map((sensor) => {
                const { colorHex, ...rest } = formData.sensors.find((entry) => entry.id === sensor.id);
                return { ...sensor, ...rest, color: { hex: colorHex } };
            });

            const submit = await fetch('/api/sensors', {
                method: 'POST',
                body: JSON.stringify(entries)
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
    {#if message}
        <div class="alert mb-6" class:alter-error={status !== 200} class:alert-success={status === 200}>
            <div class="flex-1">
                <label>{message}</label>
            </div>
        </div>
    {/if}
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
                                    class:input-error={$errors.sensors?.[i].label}
                                    class:input-bordered={$errors.sensors?.[i].label}
                                />
                                {#if $errors.sensors?.[i].label}
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
                                    class:input-error={$errors.sensors?.[i].x}
                                    class:input-bordered={$errors.sensors?.[i].x}
                                />
                                {#if $errors.sensors?.[i].x}
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
                                    class:input-error={$errors.sensors?.[i].y}
                                    class:input-bordered={$errors.sensors?.[i].y}
                                />
                                {#if $errors.sensors?.[i].y}
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
                                <input
                                    id="colorHex"
                                    type="hidden"
                                    name="sensors[{i}].colorHex"
                                    value={sensor.color.hex}
                                />
                                {JSON.stringify(sensor.color.hex)}
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

            <div class="w-full flex justify-center mb-6">
                <input
                    type="submit"
                    value="Store"
                    class="btn btn-primary"
                    disabled={!$isValid}
                    class:loading={$isSubmitting}
                />
            </div>

            <pre>{JSON.stringify(initialValues, null, 2)}</pre>
        </div>
    </form>
{/if}
