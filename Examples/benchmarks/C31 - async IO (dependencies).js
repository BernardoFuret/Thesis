/**
 * > async I/O (dependencies)
 *
 * `o.print` will only be available on the next iteration.
 */
const fs = require( 'fs' );

const o = {};

fs.readFile( 't.txt', err => {
	o.print( 'test' );
} );

o.print = console.log;