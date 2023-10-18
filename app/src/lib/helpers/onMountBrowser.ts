import { browser } from "$app/environment";
import { onDestroy, onMount } from "svelte";

export function onMountBrowser(callback: (() => void) | (() => Promise<void>)) {
    onMount(() => {
        if (browser) {
            callback();
        }
    });
}

export function onDestroyBrowser(callback: () => void): void {
    onDestroy(() => {
        if (browser) {
            callback();
        }
    });
}