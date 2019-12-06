const {
	operators:{
		add,
		sub,
		neg,
		mul,
		div,
		pow,
		eq
	},
	symbols:{
		EQ,
		ADD,
		SUB,
		MUL
	}
} = require('@multioperator/ariphmetic');


const mulNumber = (a, b)=>{
	let c = a.clone()
	c.add(b, 1);
	return c;
}


const Mononom = require('./mononom.js');

	
eq.def(Mononom, Mononom, (a, b)=>{
	if(a.equal(b)){
		return true;
	}
	a = a.splitNumber();
	b = b.splitNumber();
	if(!a[1].equal(b[1])){
		return false;
	}
	
	return a[0][EQ](b[0]);
	
});

neg.def(Mononom, (a)=>(a.clone().add(-1)));

add.def(Mononom, Mononom, (a, b)=>{
	a = a.splitNumber();
	b = b.splitNumber();
	if(!a[1].equal(b[1])){
		throw new TypeError('Invalid metric');
	}
	let c = a[0][ADD](b[0]);
	
	return a[1][MUL](c);
});
sub.def(Mononom, Mononom, (a, b)=>{
	a = a.splitNumber();
	b = b.splitNumber();
	if(!a[1].equal(b[1])){
		throw new TypeError('Invalid metric');
	}
	let c = a[0][SUB](b[0]);
	
	return a[1][MUL](c);
});

mul.def(Mononom, Mononom, (a, b)=>{
	let c = a.clone();
	c.addMany(b);
	return c;
});
mul.def(Mononom, Number, mulNumber);
mul.def(Number, Mononom, (a, b)=>(mulNumber(b, a));

div.def(Mononom, Mononom, (a, b)=>{
	let c = a.clone();
	c.subMany(b);
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