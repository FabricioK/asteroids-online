import * as Colyseus from "colyseus.js";
/*  Colyseus */
var client = new Colyseus.Client(process.env.ColyseysUrl || 'ws://192.168.0.141:2567');

 export default client;