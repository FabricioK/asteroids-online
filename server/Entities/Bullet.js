const schema = require('@colyseus/schema');
const Schema = schema.Schema;
import { Sprite } from '../../node_modules/kontra/kontra.mjs';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}

class Bullet extends Schema {
    constructor(id,playerid, player) {
        super();
        this.id = id;
        this.type = "bullet";
        this.playerid = playerid;
        
        const cos = Math.cos(degreesToRadians(player.rotation));
        const sin = Math.sin(degreesToRadians(player.rotation));

        this.sprite = Sprite({
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
            color: 'white'
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