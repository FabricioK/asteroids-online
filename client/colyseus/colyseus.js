import * as Colyseus from "colyseus.js";
/*  Colyseus */
var client = new Colyseus.Client(process.env.ColyseysUrl || 'wss://asteroids-war.herokuapp.com:2567');

 export default client;