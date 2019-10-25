import { Sprite } from 'kontra';
import { players } from '../TileEngine';

const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
}
export const onAddShip = (player, key) => {
    players[player.id] = Sprite({
        id: player.id,
        type: 'ship',
        x: player.x,
        y: player.y,
        width: player.width,
        dt: player.dt,
        rotation: player.rotation,
        render: function (session) {
            this.context.save();
            this.context.strokeStyle = (session === this.id) ? 'white' : 'red';
            this.context.translate(this.viewX, this.viewY);
            this.context.rotate(degreesToRadians(this.rotation));
            this.context.beginPath();
            this.context.moveTo(-3, -5);
            this.context.lineTo(12, 0);
            this.context.lineTo(-3, 5);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
    });

    player.onChange = function (changes) {
        changes.forEach(change => {
            players[player.id][change.field] = change.value;
        })
    };
};

export const onRemoveShip = (opcao) => {
    delete players[opcao.id];
}