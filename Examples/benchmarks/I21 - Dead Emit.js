/**
 * > Dead Emit
 *
 * (Based on https://nodejs.org/api/events.html)
 * An event is triggered, but there is no event listener registered.
 */
const EventEmitter = require( 'events' );

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.emit( 'event' );