/*
	IEEE754
	Float64
	3              3               2               1               0
	FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210
	6  6         5         4       3 3         2   1     1         0
	3210987654321098765432109876543210987654321098765432109876543210
	----------------------------------------------------------------
	SXXXXXXXXXXXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	1<---11----><--------20--------><--------------32-------------->
	SXXXXXXXXXXXHHHHHHHHHHHHHHHHHHHHLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

	http://www.softelectro.ru/ieee754.html
	
	(1) F = (-1)**s * 2**(X - 2**(b-1) + 1) * (1 + M/2**n); - значение нормализованных чисел
	(2) F = (-1)**s * 2**(X - 2**(b-1) + 2) * M/2**n; - значение денормализованных чисел
	где
	s - флаг минуса,
	b - число бит экспоненты (для Float64 b=11),
	n - число бит мантиссы (для Float64 n=52),
	X - значение смещённой экспоненты (на схеме обозначено X),
	M - значение остатка мантиссы (на схеме обозначено М).
*/

/*	
	Общегражданское выражение числа с двоичным порядком
	F = (-1)**s * 2**E * V;
	где 
	E - значение двоичного порядка,
	V - значение мантиссы.
	из (1) => E = (X - 2**(b-1) + 1), V = (1 + M/2**n);
	из (2) => E = (X - 2**(b-1) + 2), V = (M/2**n);
	Обозначим 
	d - флаг денормализованного числа,
	тогда:
	(3) V = (1 - d + M/2**n);
	(4) E = (X - 2**(b-1) + 1 + d)

 */

const HIGH_FLAG = (1<<20)-1; //Флаги, длиной как верхняя часть мантиссы
const LOW_FLAG = (1<<31)-1; //Флаги, длиной как нижняя частьмантиссы
const EXP_FLAG = 0x7FF; //Флаги, длиной как экспонента
const EXP_MASK = EXP_FLAG<<20;
const HIGH_MASK = HIGH_FLAG;

function decompFloat64(number){
	
	let [low, high] = new Uint32Array(new Float64Array([number]).buffer);
	let s = high>>>31;
	let X = (high & EXP_MASK)>>>20;
	let H = (high & HIGH_MASK);
	
	let expVal = X - 1023;
	
	let isXZero = X===0;
	let inXFlag = X === EXP_FLAG;
	let isMZero = H === 0 && low === 0;
	//let isMFlag = H === HIGH_FLAG && low === LOW_FLAG;
	
	//Особые состояния
	//1. Нули X=0, M=0
	let isZero = isXZero && isMZero;
	//2. Бесконечности X=F, M = 0
	let isInfinity = isXFlag && isMZero;
	//3. NaN X=F, кроме п.2
	let isNaN = isXFlag && !isMZero; 
	//4. Денормализованные X=0, кроме п.1
	let isSubnormal = iXZero && !isMZero;
	
	let isMinus = s === 1;
	
	return {
		sign:s,
		offsetExp:X,
		high: H,
		low,
		
		isZero,
		isInfinity,
		isNaN,
		isSubnormal,
		isMinus
		
	};
	
}

module.exports = decompFloat64;