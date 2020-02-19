/**
 * > Invalid Listener Removal
 *
 * (Based on https://nodejs.org/api/events.html)
 * Incorrect listener removed. The removed listener (callback)
 * was never registered.
 */
const EventEmitter = require( 'events' );

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const listener1 = () => console.log( 'listener1 called!' );

const listener2 = () => console.log( 'listener2 called!' );

myEmitter.on( 'event', listener1 );

myEmitter.off( 'event', listener2 );

myEmitter.emit( 'event' );