import { Sprite } from 'kontra';
import { asteroids } from '../TileEngine';

export const onAddAsteroids = (asteroid, key) => {
    // add your player entity to the game world!
    asteroids[asteroid.id] = Sprite({
        ...asteroid,
        render() {
            this.context.save();
            this.context.strokeStyle = 'white';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.viewX, this.viewY, this.radius, 0, Math.PI * 2);
            this.context.stroke();     // outline the circle
            this.context.restore();
        }
    });

    asteroid.onChange = function (changes) {
        changes.forEach(change => {
            asteroids[asteroid.id][change.field] = change.value;
        })
    };
}

export const onRemoveAsteroids = (opcao) => {
    delete asteroids[opcao.id];
}