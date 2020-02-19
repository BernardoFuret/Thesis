/**
 * > Unexpected Execution Order (async I/O)
 *
 * `o.print` will only be available on the next iteration.
 */
const fs = require( 'fs' );

const o = {};

fs.readFile( 't.txt', err => {
	o.print = console.log;
} );

o.print( 'test' );
