/**
 * > Unexpected Execution Order (setInterval)
 *
 * `o.print` will keep getting updated, but never used.
 */
let n = 0;

const o = {
	print: console.log.bind( console, n )
};

const i = setInterval( () => {
	o.print = console.log.bind( console, ++n );

	if ( n > 3 ) {
		clearInterval( i );
	}
}, 500 );

o.print( 'test' );