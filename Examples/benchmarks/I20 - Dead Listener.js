/**
 * > Dead Listener
 *
 * (Based on https://nodejs.org/api/events.html)
 * Listener is registered but the respective event
 * is never triggered.
 */
const EventEmitter = require( 'events' );

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on( 'event', () => {
	console.log( 'an event occurred!' );
} );
