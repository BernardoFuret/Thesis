/**
 * source: https://stackoverflow.com/questions/55262996/does-awaiting-a-non-promise-have-any-detectable-effect
 */
console.log( 1 );
( async () => {
  const x = await 5; // remove await to see 1,3,2

  console.log( 3 );
} )();

console.log( 2 );