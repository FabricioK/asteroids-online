
const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;


class Arena extends Schema {

    constructor() {
        super();
        this.data = new ArraySchema();
        this.collision = new ArraySchema();
        this.map = [];
        this.map_size = 64;
        this.rooms = [];
    }

    Generate = function () {
        for (var x = 0; x < this.map_size; x++) {
            this.map[x] = [];
            for (var y = 0; y < this.map_size; y++) {
                this.map[x][y] = 1;
            }
        }

        //var collision_array = [0, WALL];
        for (var x = 0; x < this.map_size; x++) {
            for (var y = 0; y < this.map_size; y++) {
                this.data.push(this.map[x][y]);
          //      this.collision.push(collision_array.includes(this.map[x][y]) ? 1 : 0);
            }
        }
    }
}

schema.defineTypes(Arena, {
    data: ["number"]
});


module.exports = Arena;