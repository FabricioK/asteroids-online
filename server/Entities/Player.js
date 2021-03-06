const schema = require('@colyseus/schema');
const Schema = schema.Schema;
import { Sprite } from '../../node_modules/kontra/kontra.mjs';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}

class Player extends Schema {

    constructor(client) {
        super();
        this.id = client.id;
        this.type = 'ship';
        this.x = 300;
        this.y = 300;
        this.dx = 0;
        this.dy = 0;
        this.dt = 0;
        this.rotation = 0;
    }

    createSprite() {
        return Sprite({
            type: 'ship',
            x: 300,
            y: 300,
            width: 6,  // we'll use this later for collision detection
            dt: 0,
            rotation: 0,
            thrusterOn: false,
            rotateLeft: false,
            rotateRight: false,
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
            update() {
                if (this.rotateLeft) this.rotation += -4;

                if (this.rotateRight) this.rotation += 4;

                const cos = Math.cos(degreesToRadians(this.rotation));
                const sin = Math.sin(degreesToRadians(this.rotation));

                if (this.thrusterOn) {
                    this.ddx = cos * 0.05;
                    this.ddy = sin * 0.05;
                }
                else {
                    this.ddx = this.ddy = 0;
                }

                this.advance();

                // set a max speed
                const magnitude = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
                if (magnitude > 5) {
                    this.dx *= 0.95;
                    this.dy *= 0.95;
                }
                this.dt += 1 / 60;
            }
        });
    }
}

schema.defineTypes(Player, {
    type: "string",
    id: "string",
    x: "number",
    y: "number",
    dt: "number",
    rotation: "number"
});

module.exports = Player;