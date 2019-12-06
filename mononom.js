const MononomBase = require('./mononom-base.js');
const NumberMononom = require('./number-base.js');

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
	
	splitNumber(){
		let parts = this.split(([key, value])=>(typeof key === 'number' ? 0 : 1));
		parts[0] = parts[0] ? new NumberMononom(...parts[0]) : new NumberMononom();
		parts[1] = parts[1] || new Mononom();
		return parts;
	}
	
	/**
	 * Проверка на то, что все элементы заданы числами
	 */
	isNumber(){
		for(let key of this.keys()){
			if(typeof key !== 'number'){
				return false;
			}
		}
		return true;
	}
	
}


	


module.exports = Mononom;