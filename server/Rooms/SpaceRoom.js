
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

  onMessage(client, message) {
    const sprite = this.state.getPlayer(client.id);
    if (sprite) {
      if (message === 'left') {
        sprite.rotation += -4
      }
      else if (message === 'right') {
        sprite.rotation += 4
      }

      if (message === 'up_pressed') {
        sprite.thrusterOn = true;
      }
      else if (message === 'up_released') {
        sprite.thrusterOn = false;
      }

      if (message === 'fire' && sprite.dt > 0.25) {
        sprite.dt = 0;
        this.state.playerFire(client.id, sprite);
      }
      this.state.setPlayer(client.id, sprite);
    } else {
      if (message === 'reset') {
        this.state.addPlayer(client);
      }
    }
  }

  onDispose() {

  }
}