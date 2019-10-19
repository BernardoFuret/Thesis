
/**
 * Chain handling and forking tests.
 */

var f =  Math.floor( Math.random() * 10 ) < 5  ? "resolve" : "reject";
var p = Promise[ console.log( f ) || f ]( 1 );

/*var resChain = p
	.then( d => d + 1 )
	.then( d => d + 1 )
	.then( console.log )
	.catch( d => d - 1 )
	.catch( d => d - 1 )
	.catch( console.log )

var rejChain = p
	.catch( d => d - 1 )
	.then( d => d - 1 )
	.then( console.log )*/



var chain = p
	.then( d => {
		console.log( 'then 1' )
		return d + 1
	} )
	.then( d => {
		console.log( 'then 2' )
		return d + 1
	}  )
	.then( console.log.bind( console, 'then 3' ) )
	.catch( d => {
		console.log( 'catch 1' )
		return d - 1
	} )
	.catch( d => {
		console.log( 'catch 2' )
		return d - 1
	} )
	.catch( console.log.bind( console, 'catch 3' ) )
	.then( d => {
		console.log( 'then 4' )
		return d + 1
	}  )
	.then( console.log.bind( console, 'then 5' ) )
	.catch( console.log.bind( console, 'catch 4' ) )

/**
 * if reject: C1 => T4 => T5
 * if resolve: T1 => T2 => T3 => T4 => T5
 */
var rejChain = p
	.then( d => {
		console.log( 'then 1' )
		return d + 1
	} )
	.then( d => {
		console.log( 'then 2' )
		return d + 1
	}  )
	.then( console.log.bind( console, 'then 3' ) )
	.catch( d => {
		console.log( 'catch 1' )
		return d - 1
	} )

rejChain
	.catch( d => {
		console.log( 'catch 2' )
		return d - 1
	} )
	.catch( console.log.bind( console, 'catch 3' ) )
	.catch( console.log.bind( console, 'catch 4' ) )

rejChain
	.then( d => {
		console.log( 'then 4' )
		return d + 1
	}  )
	.then( console.log.bind( console, 'then 5' ) )