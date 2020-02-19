/**
 * > Unexpected execution order (same API)
 * 
 */
const now = Date.now();

while( Date.now() - now < 1000 );

setTimeout( console.log, 101, 101 );
setTimeout( console.log, 100, 100 );