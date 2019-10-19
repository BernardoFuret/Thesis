/**
 * async IO test
 */

const fs = require( 'fs' );

let c = 0;

async function task() {
	return new Promise( ( r, e ) => {
		fs.writeFile( 't.txt', 'test', err => {
			console.log( c )
			if ( err || c === 1 ) {
				e( err || 'fail' );
			} else {
				console.log( "Updated with success!" );
				r();
			}
		} );
	} );
}

async function a() {
	try {
		await task();

		console.log( 'succ', c );
	} catch ( err ) {
		console.error( 'err', err );
	}
	c += 1;
}


a();
a();
a();