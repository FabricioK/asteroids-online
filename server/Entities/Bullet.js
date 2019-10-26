const schema = require('@colyseus/schema');
const Schema = schema.Schema;
import { Sprite } from '../../node_modules/kontra/kontra.mjs';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}

class Bullet extends Schema {
    constructor(id, playerid, player) {
        super();
        this.id = id;
        this.type = "bullet";
        this.playerid = playerid;
        const cos = Math.cos(degreesToRadians(player.rotation));
        const sin = Math.sin(degreesToRadians(player.rotation));
        this.x = player.x + cos * 12;
        this.y = player.y + sin * 12;
    }

    createSprite(id, playerid, player) {
        const cos = Math.cos(degreesToRadians(player.rotation));
        const sin = Math.sin(degreesToRadians(player.rotation));
        return Sprite({
            type: 'bullet',
            // start the bullet on the ship at the end of the triangle
            x: player.x + cos * 12,
            y: player.y + sin * 12,
            // move the bullet slightly faster than the ship
            dx: player.dx + cos * 5,
            dy: player.dy + sin * 5,
            // live only 50 frames
            ttl: 50,
            // bullets are small
            width: 2,
            height: 2,
            color: 'white',
            collidesWith: function (object) {
                let dx = object.x - this.x;
                let dy = object.y - this.y;

                if (object.radius)
                    return Math.sqrt(dx * dx + dy * dy) < object.radius + this.width;

                // take into account sprite anchors
                let x = this.x - this.width * this.anchor.x;
                let y = this.y - this.height * this.anchor.y;

                let objX = object.x;
                let objY = object.y;
                if (object.anchor) {
                    objX -= object.width * object.anchor.x;
                    objY -= object.height * object.anchor.y;
                }

                return x < objX + object.width &&
                    x + this.width > objX &&
                    y < objY + object.height &&
                    y + this.height > objY;
            },
        })
    }
}

schema.defineTypes(Bullet, {
    type: "string",
    id: "string",
    x: "number",
    y: "number",
    width: "number",
    height: "number",
    color: "string",
    playerid: "string"
});

module.exports = Bullet;