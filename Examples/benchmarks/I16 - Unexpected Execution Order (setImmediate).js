/**
 * > Unexpected Execution Order (setImmediate)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

setImmediate( () => {
	o.print = console.log;
} );

o.print( 'test' );