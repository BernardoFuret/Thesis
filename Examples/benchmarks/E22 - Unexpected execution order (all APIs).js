const fs = require( 'fs' );

fs.readFile( "t.txt", err => console.log( "async I/O" ) );

setTimeout( console.log, 70, "time" );

setImmediate( console.log, "immediate" );

queueMicrotask( () => console.log( "queueMicrotask 1" ) );

Promise.resolve( "promise" ).then( console.log );

queueMicrotask( () => console.log( "queueMicrotask 2" ) );

process.nextTick( console.log, "nextTick" );

( function sync() {
	const st = Date.now();

	while ( Date.now() - st < 2000 ) { /*do nothing*/ }

	console.log( "sync" );
} )();