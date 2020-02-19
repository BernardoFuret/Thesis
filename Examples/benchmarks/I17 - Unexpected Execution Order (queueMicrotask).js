/**
 * > Unexpected Execution Order (queueMicrotask)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

queueMicrotask( () => {
	o.print = console.log;
} );

o.print( 'test' );