/**
 * > async I/O (simple)
 *
 * Will only execute its callback after sync code is done.
 */
const fs = require( 'fs' );

console.log( 'start' );

fs.readFile( 't.txt', err => {
	console.log( 'sync code is loaded' );
} );

const ago = Date.now();

while ( Date.now() - ago < 2000 );

console.log( 'finish' );