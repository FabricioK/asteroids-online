const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

import { GameLoop, init, TileEngine } from '../../node_modules/kontra/kontra.mjs';

let nanoid = require("nanoid");

const Asteroid = require('./Asteroid');
const Player = require('./Player');
const Bullet = require('./Bullet');
const Arena = require('./Arena');

class Space extends Schema {

    constructor() {
        super();

        this.asteroids = new MapSchema();
        this.players = new MapSchema();
        this.bullets = new MapSchema();

        this.sprites = {}

        this.arena = new MapSchema();

        this.tileEngine = TileEngine({
            // tile size
            tilewidth: 64,
            tileheight: 64,

            // map size in tiles
            width: 64,
            height: 64,
            tilesets: [],
            // layer object
            layers: [{
                name: 'ground',
                visible: false,
                data: []
            }]
        });

        this.loop = GameLoop({
            update: () => {
                for (let id in this.sprites) {
                    const sprite = this.sprites[id]
                    sprite.update();
                    if (sprite.type === 'ship') {
                        if (this.players[id]) {
                            this.players[id].rotation = sprite.rotation;
                            this.players[id].x = sprite.x;
                            this.players[id].y = sprite.y;
                        }
                    } else if (sprite.type === 'asteroid') {

                        if (this.asteroids[id]) {
                            this.asteroids[id].radius = sprite.radius;
                            this.asteroids[id].x = sprite.x;
                            this.asteroids[id].y = sprite.y;
                        }
                    } else if (sprite.type === 'bullet') {
                        if (this.bullets[id]) {
                            this.bullets[id].x = sprite.x;
                            this.bullets[id].y = sprite.y;
                            this.bullets[id].width = sprite.width;
                            this.bullets[id].height = sprite.height;
                            if (!sprite.isAlive()) {
                                delete this.sprites[id];
                                delete this.bullets[id];
                            }
                        }
                    }
                }
            },
            render: function () { // render the game state

            }
        });
    }

    addPlayer(client) {
        const player = new Player(client);
        this.players[client.id] = player;
        this.sprites[client.id] = player.createSprite();
    }

    removePlayer(client) {
        delete this.players[client.id];
    }

    getPlayer(id) {
        return this.sprites[id];
    }

    setPlayer(id, player) {
        this.sprites[id] = player;
    }

    playerFire(client, player, cos, sin) {
        const bullet = new Bullet(nanoid(8), client, player);
        this.bullets[bullet.id] = bullet;
        this.sprites[bullet.id] = bullet.createSprite(bullet.id, client, player);
    }

    initialize() {

        this.arena[nanoid(8)] = new Arena();
        for (let id in this.arena) {
            this.arena[id].Generate();
            //this.tileEngine.setLayer('ground', this.arena[id].collision);
        }

        init({
            width: 600,
            height: 600,
            getContext: () => {
                return { clearRect: () => { } }
            }
        });

        for (var i = 0; i < 10; i++) {
            const asteroid = new Asteroid(nanoid(8));
            this.asteroids[asteroid.id] = asteroid;
            this.sprites[asteroid.id] = asteroid.createSprite();
        }
        this.loop.start();
    }
}

schema.defineTypes(Space, {
    asteroids: { map: Asteroid },
    bullets: { map: Bullet },
    players: { map: Player },
    arena: { map: Arena }
});

module.exports = Space;