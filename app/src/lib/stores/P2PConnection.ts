
import type { P2PStore } from '$lib/models/Stores';
import { writable } from 'svelte/store';
import { produce } from 'immer';

export const p2pStore = writable<P2PStore>({
    peer: null,
    connections: [],
    connectedPeerId: null,
    hostNickname: "",
    roomId: "",
    usersInRoom: []
})

/**Allows to update the store with mutations using Immer */
export const updateP2PStore = (cb: (draft: P2PStore) => void) => {
    p2pStore.update(store => produce(store, cb));
}