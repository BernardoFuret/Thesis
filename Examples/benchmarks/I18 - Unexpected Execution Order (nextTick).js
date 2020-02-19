/**
 * > Unexpected Execution Order (nextTick)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

process.nextTick( () => {
	o.print = console.log;
} );

o.print( 'test' );