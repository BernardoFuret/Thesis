/**
 * A
 * Will include this example because it contains racing issues and CBG 
 * mostlikely won't be able to address them (`setTimeout`).
 * In this case, the `adder` and `subber` functions will read the `number`,
 * then wait (`sleep`) and only then will increment or decrement, respectively.
 * Since the sleeping time is random, and since both functions will be run
 * one after the other, asynchronously, this means that the value read by, say,
 * `adder` before it waits, might be changed by the `subber` while `adder` is waiting.
 * Then, when `adder` assigns back to `number`, it will add the previously read value incremented,
 * which is not on par with the value `subber` is decrementing. Thus, not resulting in
 * an ending result of 0, despite the number of increments and decrements being the same.
 * An example: if, on the first iteration, `adder`, after reading `number` (which is 0)
 * sleeps for so long that `suber` has time to do all subtractions, then, when `adder` resumes,
 * it will re-assign 1 to `number`; meaning all the modifications made by `subber` will disappear
 * and ending with `number` at 100.
 * Based on: https://medium.com/@ubershmekel/yes-there-are-race-conditions-in-javascript-ba044571a914
 */
function A() {
	let number = 0;
	const times = 100;

	function sleep() {
		return new Promise( r => setTimeout( r, Math.random() * 5 ) );
	}

	async function adder() {
		for ( let i = 0; i < times; i++ ) {
			await sleep();
			let read = number;
			read = read + 1;
			console.log( "+ read number", read, number );
			await sleep();
			number = read;
			console.log( "+ wrote number", number );
		}
	}

	async function subber() {
		for ( let i = 0; i < times; i++ ) {
			await sleep();
			let read = number;
			read = read - 1;
			console.log( "- read number", read, number );
			await sleep();
			number = read;
			console.log( "- wrote number", number );
		}
	}

	async function main() {
		console.log( "Started with", number );
		await Promise.all( [
			adder(),
			subber(),
		] );
		console.log( "Ended with", number );
	}

	main()
		.then( () => console.log( "All done" ) )
		.catch( console.error )
	;
}