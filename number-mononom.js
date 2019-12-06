const MononomBase = require('./mononom-base.js');
const {
	operators,
	symbols
} = require('@multioperator/ariphmetic');


/**
 * @class NumberMononom
 * Представляет произведение константных числовых значений, возведённых в константные степени
 * Может быть вычислен в числовое значение
 */
class NumberMononom extends MononomBase {
	_validKey(key){
		if(typeof key !== 'number'){
			throw new TypeError(`Invalid key type: ${typeof key}`);
		}
		if(Number.isNaN(key)){
			throw new RangeError('Key is NaN');
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
	
	/**
	 * @private
	 * @method
	 * @returned {Number} - числовое значение одночлена
	 */
	_calculate(){
		let result = 1;
		for(let [key, value] of this){
			result *= key**value;
		}
		return result;
	}
	
	valueOf(){
		return this._calculate();
	}
}

const {
	add,
	sub,
	neg,
	mul,
	div,
	pow,
	eq
} = operators;

eq.def(NumberMononom, NumberMononom, (a,b)=>{
	if(a.equals(b)){
		return true;
	}
	return a.valueOf() === b.valueOf();
});