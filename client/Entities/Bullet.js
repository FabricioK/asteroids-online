
import { Sprite } from 'kontra';
import { bullets } from '../TileEngine';

export const onAddBullets = (bullet, key) => {
    bullets[bullet.id] = Sprite({
        ...bullet,
        render: function (session) {
            this.context.save();
            this.context.strokeStyle = (session === this.playerid) ? 'white' : 'red';
            this.context.beginPath();
            this.context.arc(this.viewX, this.viewY, 2, 0, Math.PI * 2);
            this.context.stroke();
            this.context.restore();
        }
    });

    bullet.onChange = function (changes) {
        changes.forEach(change => {
            bullets[bullet.id][change.field] = change.value;
        })
    };
}

export const onRemoveBullets = (opcao) => {
    delete bullets[opcao.id];
}