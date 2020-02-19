/**
 * > Unexpected Execution Order (setTimeout)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

setTimeout( () => {
	o.print = console.log;
}, 0 );

o.print( 'test' );