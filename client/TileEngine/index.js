import { load, TileEngine, imageAssets } from 'kontra';

const foto = require('../../assets/imgs/foto.png');
load(foto)
    .then(assets => {
        tileEngine = TileEngine({
            // tile size
            tilewidth: 64,
            tileheight: 64,

            // map size in tiles
            width: 9,
            height: 9,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets[foto]
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: [ 
                    0,  0,  0,  0,  0,  0,  0,  0,  0,
                    0,  0,  6,  7,  7,  8,  0,  0,  0,
                    0,  6,  27, 24, 24, 25, 0,  0,  0,
                    0,  23, 24, 24, 24, 26, 8,  0,  0,
                    0,  23, 24, 24, 24, 24, 26, 8,  0,
                    0,  23, 24, 24, 24, 24, 24, 25, 0,
                    0,  40, 41, 41, 10, 24, 24, 25, 0,
                    0,  0,  0,  0,  40, 41, 41, 42, 0,
                    0,  0,  0,  0,  0,  0,  0,  0,  0 ]
            }]
        });

    });
export let tileEngine = {
    notready: true
};