
const colyseus = require('colyseus');

const Space = require('../Entities/Space');

exports.SpaceRoom = class extends colyseus.Room {
  onCreate(options) {
    this.setState(new Space());
    this.state.initialize();
  }
  onJoin(client, options) {
    this.state.addPlayer(client);
  }

  onLeave(client, consented) {
    this.state.removePlayer(client);
  }
  onMessage(client, payload) {
    const { type, buffer } = payload;
    const sprite = this.state.getPlayer(client.id);
    if (sprite) {
      switch (type) {
        case 'keybinding':
          this.handleKeys(buffer, sprite, client);
          break;
        case 'reset':
          break;
        default:
          break;
      }
    } else {
      if (type === 'reset') {
        this.state.addPlayer(client);
      }
    }
  }

  keyCheck(buffer, key, type = true) {
    return buffer.hasOwnProperty(key.toLowerCase()) === type;
  }

  handleKeys(buffer, sprite, client) {
    // dont move until attack is over     
    if (this.keyCheck(buffer, 'a')) {
      sprite.rotateLeft = true;
    }

    if (this.keyCheck(buffer, 'd')) {
      sprite.rotateRight = true;
    }

    if (this.keyCheck(buffer, 'w')) {
      sprite.thrusterOn = true;
    }

    if (this.keyCheck(buffer, 'w', false)) {
      sprite.thrusterOn = false;
    }

    if (this.keyCheck(buffer, 'a', false)) {
      sprite.rotateLeft = false;
    }

    if (this.keyCheck(buffer, 'd', false)) {
      sprite.rotateRight = false;
    }
    
    if (this.keyCheck(buffer, ' ') && sprite.dt > 0.25) {
      sprite.dt = 0;
      this.state.playerFire(client.id, sprite);
    }

    this.state.setPlayer(client.id, sprite);
  }

  onDispose() {

  }
}