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
            radius: 30
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