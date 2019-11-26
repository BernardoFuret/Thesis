/**
 * A
 * Execution order depends on how it is executed:
 * - REPL
 * - script
 * Because REPL will be on the Poll phase, favoring the setImmediate callback.
 */
const fs = require( 'fs' );

setTimeout( console.log, 0, "time" );

setImmediate( console.log, "immediate" );

Promise.resolve( "promise" ).then( console.log );

fs.writeFile( "t.txt", "data", err => console.log( "async I/O" ) );

process.nextTick( console.log, "nextTick" );

( function sync() {
	const st = Date.now();

	while ( Date.now() - st < 500 ) { /*do nothing*/ }

	console.log( "sync" );
} )();

/**
 * B
 * Order is arbitrary if loaded as script.
 * But setImmediate will always execute first,
 * if called on the REPL, for the reasons mentioned
 * on the example above.
 */
setTimeout( console.log, 0, "time" );

setImmediate( console.log, "immediate" );


/**
 * C
 * SetTimeout creates a macrotask. If macrotasks are queued during their
 * respective phase, they will only be executed in the next iteration.
 * https://stackoverflow.com/questions/24117267/nodejs-settimeoutfn-0-vs-setimmediatefn/24119936#24119936
 * Order is "immediate" -> "time".
 */
setTimeout( () => {
	setTimeout( console.log, 0, "time" );

	setImmediate( console.log, "immediate" );
} );



/**
 * D
 * queueMicrotask vs Promise
 * Order is relevant.
 */
queueMicrotask( () => console.log( "queueMicrotask" ) );
Promise.resolve( "promise" ).then( console.log );


/**
 * E
 * Microtasks order
 * nextTick executes first.
 */
Promise.resolve( "promise" ).then( console.log );
process.nextTick( console.log, "nextTick" );
queueMicrotask( () => console.log( "queueMicrotask" ) );


/**
 * F
 * https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3
 */
setTimeout(() => console.log('timeout1'));
setTimeout(() => {
	console.log('timeout2')
	queueMicrotask(() => console.log('queueMicrotask'))
});
setTimeout(() => console.log('timeout3'));
setTimeout(() => console.log('timeout4'));


/**
 * G
 * Microtasks vs rendering.
 */
setTimeout( console.log, 0, "time" );
requestAnimationFrame( () => console.log( "requestAnimationFrame 1" ) );
requestAnimationFrame( () => {
	console.log( "requestAnimationFrame 2" );

	queueMicrotask( () => console.log( "requestAnimationFrame queueMicrotask" ) );
} );
queueMicrotask( () => console.log( "queueMicrotask" ) );
console.log( "sync" );


/**
 * H
 * Promise will execute once ready.
 * This is one of the changes from Node v11 onwards.
 * (Else, would execute only after all timers.)
 * https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3
 */
setTimeout( console.log, 100, 'Time 1' );
setTimeout( console.log, 200, 'Time 2' );
setTimeout( console.log, 300, 'Time 3' );
setTimeout( console.log, 400, 'Time 4' );
fetch( /**/ ).then( res => res.json() ).then( console.log );