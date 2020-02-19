/**
 * > setInterval (dependencies)
 *
 * `o.stop` will only be available on the next iteration.
 */
const o = {};

let n = 0;

const i = setInterval( () => {
	if ( ++n > 3 ) {
		o.stop( i );
		console.log( 'Stopping interval.' );
	} else {
		console.log( 'Interval callback call.' );
	}
}, 1000 );

o.stop = clearInterval;
