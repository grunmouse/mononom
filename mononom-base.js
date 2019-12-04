
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
	
	add(key, b){
		let a = this.get(key);
		this.set(key, a + b);
	}
	
	pow(b){
		for(let [key, a] of this){
			this.set(key, a*b);
		}
	}
	
	isConst(){
		for(let key of this.keys()){
			if(typeof key !== 'number'){
				return false;
			}
		}
		return true;
	}
	
	clone(){
		return new this.constructor(this);
	}
}

module.exports = MononomBase;