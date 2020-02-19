/**
 * > setTimeout (dependencies)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

setTimeout( () => {
	o.print = console.log;
}, 500 );

o.print( 'Program ended; Stack is empty; Sync code is done.' );