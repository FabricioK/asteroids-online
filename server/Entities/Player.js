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
            update() {
                const cos = Math.cos(degreesToRadians(this.rotation));
                const sin = Math.sin(degreesToRadians(this.rotation));

                this.advance();

                if (this.thrusterOn) {
                    this.ddx = cos * 0.05;
                    this.ddy = sin * 0.05;
                }
                else {
                    this.ddx = this.ddy = 0;
                }
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