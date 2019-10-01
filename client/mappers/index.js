import { Sprite } from 'kontra';

export const mappedAsteroids = asteroids => {
    const _asteroids = [];
    for (let id in asteroids) {
        _asteroids.push(Sprite({
            ...asteroids[id],
            render: function () {
                this.context.strokeStyle = 'white';
                this.context.beginPath();  // start drawing a shape
                this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                this.context.stroke();     // outline the circle
            }
        }))
    }
    return _asteroids;
}

export const mappedBullets = (sessionId, bullets) => {
    const _bullets = [];
    for (let id in bullets) {
        _bullets.push(Sprite({
            ...bullets[id],
            color: bullets[id].playerid !== sessionId ? "#FF0000" : "#FFFFFF"
        }))
    }
    return _bullets;
}

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}

export const mappedPlayers = (sessionId, players) => {
    const _players = [];
    for (let id in players) {
        _players.push(Sprite({
            ...players[id],
            render() {
                this.context.save();
                // transform the origin and rotate around it
                // using the ships rotation
                this.context.translate(this.x, this.y);
                this.context.strokeStyle = players[id].id !== sessionId ? "#FF0000" : "#FFFFFF";
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
        }))
    }
    return _players;
}