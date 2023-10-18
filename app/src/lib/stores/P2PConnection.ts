
import type Peer from 'peerjs';
import type { DataConnection } from 'peerjs';
import { writable } from 'svelte/store';

export const peerStore = writable<Peer | null>(null);
export const connectionsStore = writable<DataConnection[]>([]);
export const connectedPeerIdStore = writable<string | null>(null);
export const hostNicknameStore = writable("");
export const roomIdStore = writable("");
export const usersInRoomStore = writable<string[]>([]);