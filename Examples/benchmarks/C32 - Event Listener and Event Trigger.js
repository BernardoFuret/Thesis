/**
 * > Event Listener and Event Trigger
 *
 * (Based on https://nodejs.org/api/events.html)
 * An event listener is registered and an event is triggered.
 */
const EventEmitter = require( 'events' );

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on( 'event', () => {
	console.log( 'an event occurred!' );
} );

myEmitter.emit( 'event' );