import { Sprite } from 'kontra';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}


export const mappedAsteroids = (asteroid, key) => {
    // add your player entity to the game world!
    asteroid.sprite = Sprite({
        ...asteroid,
        render() {
            this.context.save();
            this.context.strokeStyle = 'white';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.stroke();     // outline the circle
            this.context.restore();
        }
    })// If you want to track changes on a child object inside a map, this is a common pattern:
    asteroid.onChange = function (changes) {
        changes.forEach(change => {
            asteroid.sprite[change.field] = change.value;
        })
    };
}

export const mappedBullets = (bullet, key) => {
    // add your player entity to the game world!
    bullet.sprite = Sprite({
        ...bullet,
        color: 'white'
    })
    // If you want to track changes on a child object inside a map, this is a common pattern:
    bullet.onChange = function (changes) {
        changes.forEach(change => {
            bullet.sprite[change.field] = change.value;
        })
    };
}

export const mappedPlayers = (player, key) => {
    // add your player entity to the game world!
    players[player.id] = Sprite({
        type: 'ship',
        x: player.x,
        y: player.y,
        width: player.width,  // we'll use this later for collision detection
        dt: player.dt,
        rotation: player.rotation,
        render() {
            this.context.save();
            this.context.strokeStyle = 'white';
            // transform the origin and rotate around it
            // using the ships rotation
            this.context.translate(this.x, this.y);
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
    // If you want to track changes on a child object inside a map, this is a common pattern:
    player.onChange = function (changes) {
        changes.forEach(change => {           
            players[player.id][change.field] = change.value;
        })
    };

};

export let players = {};