import * as Colyseus from "colyseus.js";
/*  Colyseus */
var client = new Colyseus.Client(process.env.ColyseysUrl);

 export default client;