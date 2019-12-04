const MononomBase = require('./mononom-base.js');
const {
	operators,
	symbols
} = require('@multioperator/ariphmetic');

/**
 * Класс представляет собой математическое выражение, представляющее собой произведение констант и переменных, взятых в константных степенях
 */
class Mononom extends MononomBase{
	_validKey(key){
		if(!['string', 'number'].includes(typeof key)){
			throw new TypeError(`Invalid key type: ${typeof key}`);
		}
	}
	
	_validValue(value){
		if(typeof value !== 'number'){
			throw new TypeError(`Invalid value type: ${typeof value}`);
		}
		if(Number.isNaN(value)){
			throw new RangeError('Value is NaN');
		}
	}
	
	
	
}


const {
	add
	sub
	neg
	mul
	div
	pow
} = operators;
	
//add.def

const mulNumber = (a, b)=>{
	let c = a.clone()
	c.add(b, 1);
	return c;
}

neg.def(Mononom, (a)=>(mulNumber(a, -1)));

mul.def(Mononom, Mononom, (a, b)=>{
	let c = a.clone();
	for(let [key, value] of b){
		c.add(key, value);
	}
	return c;
});
mul.def(Mononom, Number, mulNumber);
mul.def(Number, Mononom, (a, b)=>(mulNumber(b, a));

div.def(Mononom, Mononom, (a, b)=>{
	let c = a.clone();
	for(let [key, value] of b){
		c.add(key, -value);
	}
	return c;
});
div.def(Mononom, Number, (a, b)=>{
	let c = a.clone()
	c.add(b, -1);
	return c;
});
div.def(Number, Mononom, (a, b)=>{
	let c = b.clone()
	c.add(a, -1);
	return c;
});

pow.def(Mononom, Number, (a, b)=>{
	let c = a.clone();
	c.pow(b);
	return c;
});

module.exports = Mononom;