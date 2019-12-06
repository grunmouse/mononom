
class MononomBase extends Map {
	get(key){
		if(this.has(key){
			return super.get(key);
		}
		else{
			return 0;
		}
	}
	
	/**
	 * @abstract
	 * @private
	 * @method _validKey(key) - проверяет валидность переданного ключа
	 * @param {any} key
	 * @void
	 * @throws {Error} - бросить ошибку, если ключ недопустим
	 */
	
	/**
	 * @abstract
	 * @private
	 * @method _validValue(value) - проверяет валидность переданного значения
	 * @param {any} value
	 * @void
	 * @throws {Error} - бросить ошибку, если значение недопустимо
	 */
	
	set(key, value){
		this._validKey(key);
		this._validValue(value);
		if(value===0){
			this.delete(key);
		}
		else{
			super.set(key, value);
		}
	}
	
	addMany(iterable){
		for(let [key, value] of iterable){
			this.add(key, value);
		}
		return this
	}

	subMany(iterable){
		for(let [key, value] of iterable){
			this.add(key, -value);
		}
		return this
	}
	
	add(key, b){
		let a = this.get(key);
		this.set(key, a + b);
		return this
	}
	
	pow(b){
		for(let [key, a] of this){
			this.set(key, a*b);
		}
		return this
	}
	
	handle(key, callback){
		let res = callback(this.get(key));
		this.set(key, res);
		return this;
	}
	
	
	/**
	 * Проверка на отсутствие элементов
	 */
	isEmpty(){
		return this.size === 0;
	}
	
	clone(){
		return new this.constructor(this);
	}
	
	/**
	 * Разбивает многочлен на массив многочленов, помещая каждый элемент многочлена 
	 *       в элемент массива, по номеру возвращённому функцией обратного вызова
	 * 
	 */
	split(callback){
		let result = []
		for(let pair of this){
			let i = callback(pair);
			if(!result[i]){
				result[i] = new this.constructor();
			}
			result[i].add(...pair);
		}
		return result;
	}
	
	filter(callback){
		let result = new this.constructor();
		for(let pair of this){
			if(callback(pair)){
				result.add(...pair);
			}
		}
		return result;
	}
	
	
	/**
	 * Примитивная почленная проверка равенства
	 */
	equal(b){
		let myKeys = new Set(this.keys());
		for(let [key, value] of b){
			myKeys.delete(key);
			if(value !== this.get(key)){
				return false
			}
		}
		if(myKeys.size>0){
			return false;
		}
		return true;
	}
	
	/**
	 * Находит общие множители одночленов
	 */
	cross(b, callback){
		callback = callback || (a, b)=>(a === b ? a : 0);
		let result = new this.constructor();
		for(let [key, value] of b){
			if(this.has(key)){
				value = callback(value, a.get(key));
				result.add(key, value);
			}
		}
		return result;
	}
}

module.exports = MononomBase;