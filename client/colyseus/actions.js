import client from './colyseus';

export function JoinOrCreate(name) {
    return client.joinOrCreate(name);
}

export function onStateChangeOnce(room) {
    return room.onStateChange.once;
}

export function sendMessage(room, msg) {
    room.send(msg);
}

export function onStateChange(room) {
    return room.onStateChange;
}