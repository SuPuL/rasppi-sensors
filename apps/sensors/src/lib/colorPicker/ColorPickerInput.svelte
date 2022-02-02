<script lang="ts">
    import type { Hex } from 'svelte-awesome-color-picker/type/types';
    export let button: HTMLElement;
    export let color: Hex;
    export let isOpen: boolean;
    function keyup(e: KeyboardEvent) {
        if (document?.activeElement?.isSameNode(button) && !e.shiftKey && e.key === 'Tab') isOpen = true;
    }
</script>

<svelte:window on:keyup={keyup} />

<div class="flex">
    <button
        type="button"
        bind:this={button}
        class="rounded btn btn-sm rounded-r-none"
        style="background-color: {color?.hex};"
    />
    <input
        on:mousemove={(e) => e.preventDefault}
        type="text"
        value={color.hex.substring(0, 7)}
        class="w-full input rounded-l-none input-sm"
        disabled
    />
</div>
