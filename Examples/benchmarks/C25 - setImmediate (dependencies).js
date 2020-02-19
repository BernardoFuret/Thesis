/**
 * > setImmediate (dependencies)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

setImmediate( m => {
	o.print( m );
}, 'Program ended; Stack is empty; Sync code is done.' );

o.print = console.log;
