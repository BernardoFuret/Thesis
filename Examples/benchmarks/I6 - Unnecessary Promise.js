/**
 * > Unnecessary Promise
 *
 * The second Promise constructor call is not
 * necessary. The `then` method already returns
 * a Promise. Promises that return Promises that
 * return values have the same semantics as the
 * first Promise returning the value.
 */
new Promise( r => r( 1 ) )
	.then( v => new Promise( r => r( v + 1 ) ) )
	.then( console.log )
;