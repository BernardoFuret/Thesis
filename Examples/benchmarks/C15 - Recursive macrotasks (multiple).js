/**
 * > Recursive macrotasks
 * 
 * Macrotasks will be executed on the next iteration of the
 * event loop. Meaning that if they are called from another
 * macrotask, their execution will be postponed to the next
 * cycle, rather than executing right away, as microtasks do.
 *
 * This simple program illustrates that even though each
 * asynchronous API calls itself recursively, all of them
 * get to be executed in between each other. 
 */
const fs = require( 'fs' );

function recursiveMacrotaskAsyncIO() {
	fs.readFile( 't.txt', 'utf8', ( err, data ) => {
		if ( err ) throw err;

		console.log( 'async I/O' );

		recursiveMacrotaskAsyncIO();
	} );
}

function recursiveMacrotaskImmediate() {
	setImmediate( recursiveMacrotaskImmediate );

	console.log( 'setImmediate' );
}

function recursiveMacrotaskTimeout() {
	setTimeout( recursiveMacrotaskTimeout, 10 );

	console.log( 'setTimeout' );
}

recursiveMacrotaskTimeout();

recursiveMacrotaskImmediate();

recursiveMacrotaskAsyncIO();