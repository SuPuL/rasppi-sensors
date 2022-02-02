<!-- src/lib/components/NavLink.svelte -->
<script>
    import { page } from '$app/stores';
    $: isActive = $page.url.pathname === $$props.href;
</script>

<a {...$$props} class:active={isActive}>
    <slot />
</a>
