import { Sprite, imageAssets, TileEngine } from 'kontra';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}

export const onAddAsteroids = (asteroid, key) => {
    // add your player entity to the game world!
    asteroids[asteroid.id] = Sprite({
        ...asteroid,
        render() {
            this.context.save();
            this.context.strokeStyle = 'white';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.viewX, this.viewY, this.radius, 0, Math.PI * 2);
            this.context.stroke();     // outline the circle
            this.context.restore();
        }
    });
    arena.addObject(asteroids[asteroid.id]);
    // If you want to track changes on a child object inside a map, this is a common pattern:
    asteroid.onChange = function (changes) {
        changes.forEach(change => {
            asteroids[asteroid.id][change.field] = change.value;
        })
    };
}

export const onAddBullets = (bullet, key) => {
    // add your player entity to the game world!
    bullets[bullet.id] = Sprite({
        ...bullet,
        render: function (session) {
            this.context.save();
            this.context.strokeStyle = (session === this.playerid) ? 'white' : 'red';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.viewX, this.viewY, 2, 0, Math.PI * 2);
            this.context.stroke();     // outline the circle
            this.context.restore();
        }

    });
    arena.addObject(bullets[bullet.id]);
    // If you want to track changes on a child object inside a map, this is a common pattern:
    bullet.onChange = function (changes) {
        changes.forEach(change => {
            bullets[bullet.id][change.field] = change.value;
        })
    };
}

export const onAddPlayers = (player, key) => {
    // add your player entity to the game world!
    players[player.id] = Sprite({
        id: player.id,
        type: 'ship',
        x: player.x,
        y: player.y,
        width: player.width,  // we'll use this later for collision detection
        dt: player.dt,
        rotation: player.rotation,
        render: function (session) {
            this.context.save();
            this.context.strokeStyle = (session === this.id) ? 'white' : 'red';
            // transform the origin and rotate around it
            // using the ships rotation
            this.context.translate(this.viewX, this.viewY);
            this.context.rotate(degreesToRadians(this.rotation));
            // draw a right facing triangle
            this.context.beginPath();
            this.context.moveTo(-3, -5);
            this.context.lineTo(12, 0);
            this.context.lineTo(-3, 5);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
    })
    arena.addObject(players[player.id]);
    // If you want to track changes on a child object inside a map, this is a common pattern:
    player.onChange = function (changes) {
        changes.forEach(change => {
            players[player.id][change.field] = change.value;
        })
    };
};

export const onAddArena = (map) => {
    arena.setLayer('ground', map.data)
}

export const onRemoveArena = (opcao) => {
    //delete arena;
}

export const startArena = (foto) => {
    arena = TileEngine({
        // tile size
        tilewidth: 64,
        tileheight: 64,

        // map size in tiles
        width: 64,
        height: 64,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: imageAssets[foto]
        }],

        // layer object
        layers: [{
            name: 'ground',
            data: []
        }]
    })
}


export const onRemoveBullets = (opcao) => {
    arena.removeObject(bullets[opcao.id]);
    delete bullets[opcao.id];
}
export const onRemovePlayers = (opcao) => {
    arena.removeObject(players[player.id]);
    delete players[opcao.id];
}
export const onRemoveAsteroids = (opcao) => {
    arena.removeObject(asteroids[opcao.id]);
    delete asteroids[opcao.id];
}

export let arena = {};
export let players = {};
export let asteroids = {};
export let bullets = {};