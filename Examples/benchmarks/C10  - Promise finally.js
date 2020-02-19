/**
 * > Promise finally
 *
 * Correct example of `Promise.prototype.finally` use.
 */
Promise.resolve( 1 )
	.then( v => v + 1 )
	.catch( v => v - 1 )
	.finally( console.log.bind( console, 'Promise ended!' ) )
;