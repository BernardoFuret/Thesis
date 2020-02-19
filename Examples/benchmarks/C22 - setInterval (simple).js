/**
 * > setInterval (simple)
 *
 * Will only execute its callback after sync code is done.
 */
console.log( 'start' );

let n = 0;

const i = setInterval( () => {
	if ( ++n > 3 ) {
		clearInterval( i );
		console.log( 'Stopping interval.' );
	} else {
		console.log( 'Interval callback call.' );
	}
}, 500 );

const ago = Date.now();

while ( Date.now() - ago < 2000 );

console.log( 'finish' );