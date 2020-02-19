/**
 * > Event registration
 */
const net = require( 'net' );

const server = net.createServer( c => { //> H1
	console.log( 'A client connected:', c );
} );

server.on( 'listening', () => { //> H2
	console.log( 'Listening' );
} );

server.listen( 8080 );

/// H1 => H3 => H2