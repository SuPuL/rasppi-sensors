<!-- src/lib/components/NavLink.svelte -->
<script lang="ts">
    import { sensorCollection, Sorting, SortingId } from './sensor';

    export let id: SortingId;

    let sorting: Sorting | undefined;

    sensorCollection.subscribe((value) => {
        sorting = value.sorting;
    });

    function handleClick() {
        sorting = {
            id,
            direction: sorting?.direction === 'asc' ? 'desc' : 'asc'
        };

        sensorCollection.update((collection) => ({
            ...collection,
            sorting
        }));
    }
</script>

<th on:click={handleClick} class="cursor-pointer"
    ><div class="flex">
        <slot>NO TITLE</slot>

        {#if sorting && sorting.id === id}
            {#if sorting.direction === 'asc'}
                <i class="sort-by-asc" />
            {:else}
                <i class="sort-by-desc" />
            {/if}
        {/if}
    </div>
</th>

<style>
    .sort-by-asc {
        left: 3px;
        display: inline-block;
        width: 0;
        height: 0;
        border: solid 5px transparent;
        margin: 4px 4px 0 3px;
        background: transparent;
        border-bottom: solid 7px;
        border-top-width: 0;
    }

    .sort-by-desc {
        left: 3px;
        display: inline-block;
        width: 0;
        height: 0;
        border: solid 5px transparent;
        margin: 4px 4px 0 3px;
        background: transparent;
        border-top: solid 7px;
        border-bottom-width: 0;
    }
</style>
