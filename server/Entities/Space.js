const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

import { GameLoop, init } from '../../node_modules/kontra/kontra.mjs';

let nanoid = require("nanoid");

const Asteroid = require('../Entities/Asteroid');
const Player = require('../Entities/Player');
const Bullet = require('../Entities/Bullet');

class Space extends Schema {

    constructor() {
        super();

        this.asteroids = new MapSchema();
        this.players = new MapSchema();
        this.bullets = new MapSchema();

        this.sprites = {}

        this.loop = GameLoop({
            update: () => {
                for (let id in this.sprites) {
                    const sprite = this.sprites[id]
                    sprite.update();
                    // sprite is beyond the left edge
                    if (sprite.x < 0) {
                        sprite.x = 600;
                    }
                    // sprite is beyond the right edge
                    else if (sprite.x > 600) {
                        sprite.x = 0;
                    }
                    // sprite is beyond the top edge
                    if (sprite.y < 0) {
                        sprite.y = 600;
                    }
                    // sprite is beyond the bottom edge
                    else if (sprite.y > 600) {
                        sprite.y = 0;
                    }

                    if (sprite.type === 'ship') {
                        if (this.players[id]) {
                            this.players[id].rotation = sprite.rotation;
                            this.players[id].x = sprite.x;
                            this.players[id].y = sprite.y;
                        }
                    }
                }
                for (let id in this.asteroids) {
                    const asteroid = this.asteroids[id];
                    const sprite = asteroid.sprite;
                    sprite.update();
                    // sprite is beyond the left edge
                    if (sprite.x < -50) {
                        sprite.x = 650;
                    }
                    // sprite is beyond the right edge
                    else if (sprite.x > 650) {
                        sprite.x = -50;
                    }
                    // sprite is beyond the top edge
                    if (sprite.y < -50) {
                        sprite.y = 650;
                    }
                    // sprite is beyond the bottom edge
                    else if (sprite.y > 650) {
                        sprite.y = -50;

                    }
                    this.asteroids[id].sprite = sprite;
                    this.asteroids[id].radius = sprite.radius;
                    this.asteroids[id].x = sprite.x;
                    this.asteroids[id].y = sprite.y;

                    if (!sprite.isAlive()) {
                        delete this.asteroids[id];
                    }
                }

                /*for (let id in this.players) {
                    const asteroid = this.players[id];
                    const sprite = asteroid.sprite;
                    sprite.update();
                    // sprite is beyond the left edge
                    if (sprite.x < 0) {
                        sprite.x = 600;
                    }
                    // sprite is beyond the right edge
                    else if (sprite.x > 600) {
                        sprite.x = 0;
                    }
                    // sprite is beyond the top edge
                    if (sprite.y < 0) {
                        sprite.y = 600;
                    }
                    // sprite is beyond the bottom edge
                    else if (sprite.y > 600) {
                        sprite.y = 0;

                    }
                    this.players[id].sprite = sprite;
                    this.players[id].rotation = sprite.rotation;
                    this.players[id].x = sprite.x;
                    this.players[id].y = sprite.y;

                    if (!sprite.isAlive()) {
                        delete this.players[id];
                    }
                }*/

                for (let id in this.bullets) {
                    const bullet = this.bullets[id];
                    const sprite = bullet.sprite;
                    sprite.update();
                    this.bullets[id].sprite = sprite;
                    this.bullets[id].x = sprite.x;
                    this.bullets[id].y = sprite.y;
                    this.bullets[id].width = sprite.width;
                    this.bullets[id].height = sprite.height;
                    if (!sprite.isAlive()) {
                        delete this.bullets[id];
                    }
                }
                for (let a_id in this.asteroids) {
                    const asteroid = this.asteroids[a_id];
                    const a_sprite = asteroid.sprite;
                    //checking if a asteroid hitted a bullet
                    for (let b_id in this.bullets) {
                        const bullet = this.bullets[b_id];
                        const b_sprite = bullet.sprite;
                        // circle vs. circle collision detection
                        let dx = a_sprite.x - b_sprite.x;
                        let dy = a_sprite.y - b_sprite.y;
                        if (Math.sqrt(dx * dx + dy * dy) < a_sprite.radius + b_sprite.width) {
                            delete this.asteroids[a_id];
                            delete this.bullets[b_id];
                            break;
                        }
                    }
                    // if the asteroid is destroid, don't check for players
                    if (!this.asteroids[a_id])
                        break;

                    // checking if a asteroid hitted a player                    
                    for (let p_id in this.players) {
                        const player = this.players[p_id];
                        const p_sprite = player.sprite;
                        // circle vs. circle collision detection
                        let dx = a_sprite.x - p_sprite.x;
                        let dy = a_sprite.y - p_sprite.y;
                        if (Math.sqrt(dx * dx + dy * dy) < a_sprite.radius + p_sprite.width) {
                            delete this.asteroids[a_id];
                            delete this.players[p_id];
                            break;
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
    }

    initialize() {
        init({
            width: 600,
            height: 600,
            getContext: () => {
                return { clearRect: () => { } }
            }
        });

        /*  for (var i = 0; i < 2; i++) {
              const asteroid = new Asteroid(nanoid(8));
              this.asteroids[asteroid.id] = asteroid;
          }*/
        this.loop.start();
    }
}

schema.defineTypes(Space, {
    asteroids: { map: Asteroid },
    bullets: { map: Bullet },
    players: { map: Player }
});

module.exports = Space;