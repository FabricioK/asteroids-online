import './index.css'
import { init, initKeys, on, emit, GameLoop, Sprite, keyPressed } from 'kontra';
import { mappedAsteroids, mappedPlayers, mappedBullets } from './mappers';
import { JoinOrCreate, sendMessage } from './colyseus/actions';

function component() {
    const element = document.createElement('canvas');
    element.width = 600;
    element.height = 600;
    return element;
}

document.body.appendChild(component());

let sprites = [];
let up_pressed = false;
let sessionId = '';

on('state', (state) => {
    sprites = mappedAsteroids(state.asteroids);
    sprites = sprites.concat(mappedPlayers(sessionId, state.players));
    sprites = sprites.concat(mappedBullets(sessionId, state.bullets));
})

init()
initKeys();

JoinOrCreate("room").then(room => {
    room.onStateChange((state) => {
        emit('state', state)
    });
    sessionId = room.sessionId
    on('click', (type) => {
        sendMessage(room, type);
    });
});

let loop = GameLoop({
    update: function () {
        if (keyPressed('left')) {
            emit('click', 'left');
        }
        else if (keyPressed('right')) {
            emit('click', 'right');
        }

        if (keyPressed('up') && !up_pressed) {
            up_pressed = true;
            emit('click', 'up_pressed')
        } else if (!keyPressed('up') && up_pressed) {
            up_pressed = false;
            emit('click', 'up_released')
        }

        if (keyPressed('space'))
            emit('click', 'fire');

        if (keyPressed('r'))
            emit('click', 'reset');
    },
    render: function () { // render the game state
        sprites.map(sprite => sprite.render());
    }
});
loop.start();    // start the game