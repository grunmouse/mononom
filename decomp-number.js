

function decompFloat64(number){
	let [low, high] = new Uint32Array(new Float64Array([number]).buffer);
	let s = high>>>31;
	let exponent = (high & (1<<31)-1)>>>20;
	let mantissHight = (high & (1<<20)-1);
	
	let expVal = exponent - 1023;
	
	let isZero = exponent===0;
	
	return {
		sign:s,
		exponent,
		high: mantissHight,
		low
	};
}

module.exports = decompFloat64;