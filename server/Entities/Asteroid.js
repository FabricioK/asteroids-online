const schema = require('@colyseus/schema');
const Schema = schema.Schema;
import { Sprite } from '../../node_modules/kontra/kontra.mjs';

class Asteroid extends Schema {

    constructor(id) {
        super();
        this.id = id;
        this.type = "asteroid";
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.radius = 30;
    }

    createSprite() {
        return Sprite({
            type: 'asteroid',
            x: 100,
            y: 100,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            radius: 30,
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

schema.defineTypes(Asteroid, {
    type: "string",
    id: "string",
    x: "number",
    y: "number",
    radius: "number"
});

module.exports = Asteroid;