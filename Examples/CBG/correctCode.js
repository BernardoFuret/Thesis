/**
 * graph
 */

/**
 * A
 * from http://www.tcse.cn/~gaoyu15/paper/2017-ase-nodecb.pdf (PDF page 4)
 */
var bundle = client.bundle('someBundle');
bundle.create( something, function(){ // create is async //> A1
	bundle.uploadStr( something ); // uploadStr is async //> A2
} );

/// A1 => A2


/**
 * B
 * TODO: check CBG result (forks?)
 */
const p = new Promise( ( resolve, reject ) => { //> B1
	if ( Math.random() < 0.5 ) {
		resolve( "A" );
	} else {
		reject( "B" );
	}
} ).then(
	console.log.bind( console, "Result is A:" ) //> B2
).catch(
	console.warn.bind( console, "Result is B:" ) //> B3
);

/// B1 => B2 | B1 => B3


/**
 * D
 * Should increment 1 to 2 and then log,
 * but the callbacks are registered on the original promise.
 * AKA broken promise (forked)
 */
const logValue = console.log.bind( console, "Value should be 2:" ); //> D2

const increment = v => v + 1; //> D3

const p1 = new Promise( ( resolve, reject ) => { //> D1
	resolve( 1 );
} );

const p2 = p1.then( increment );

const p3 = p2.then( logValue );

/// D1 => D2 => D3 


/**
 * E
 * Real example using MediaWiki JS code.
 * In this case, the modules containing
 * the api code will be loaded asynchronously
 * using the `mw.loader.using` function.
 * So when the next line of code is reached,
 * `mw.Api` might not be defined yet, thus
 * generating an error due to racing issues.
 * 
 */
mw.loader.using( "mediawiki.api" ) //> E1
	.then( () => { //> E2
		const api = new mw.Api();
		// Do stuff with `api`.
	} )
;

/// E1 => E2

/**
 * F
 * Create chain of async calls by using a loop.
 * CBG does not support timers, but it should be able to
 * generate the graph if the timer is commented out.
 */
[ 1, 2, 3, 4, 5 ].reduce( ( chain, i ) => {
	return chain.then( () => new Promise( r => { ///> Fi
		window.setTimeout( () => {
			console.log( i );
			r();
		}, 1000 );
	} ) );
}, Promise.resolve() );

/// F1 => F2 => F3 => F4 => F5

/**
 * G
 * Example with `finally`. Code is correct, but the CBG
 * might have trouble due to no supporting `finally`.
 * Test? Extend?
 * Compare with example B:
 * 	then( onRes ) -> catch( onErr )
 * 	VS
 * 	then( onRes, onRej )
 */
new Promise( ( resolve, reject ) => { //> G1
	if ( Math.random() < 0.5 ) {
		resolve( "A" );
	} else {
		reject( "B" );
	}
} ).finally(
	() => console.log( "Promise ready" )
).then(
	console.log.bind( console, "Should be A:" ),
	console.log.bind( console, "Should be B:" ),
);

/**
 * H
 * In this example, a server is being created, using Node.js `net` API.
 * The method `listen` will start a TCP server listening on the given port.
 * Once that method is called, it will emit the `listening` event. If no callback
 * is provided with this method, the handler can still be registered through
 * the `on` method.
 * Code here executes correctly: the handler is registered, then the server listens.
 * Once it starts listening, it will call the registered handler.
 */
const server = net.createServer( () => {} ); //> H1

server.on( 'listening', () => { //> H2
	console.log( 'Listening' );
} );

server.listen( 8080 ); //> H3

/// H1 => H3 => H2