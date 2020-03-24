const domande = [ 
	{
		domanda: "Quale tra questi non è un sinonimo di piccolezza",
		risposte: [
			{
				risposta: "Esiguità",
				isCorrect: false,
			},
			{
				risposta: "Mediocrità",
				isCorrect: false,
			},
			{
				risposta: "Limitatezza",
				isCorrect: false,
			},
			{
				risposta: "Rilevanza",
				isCorrect: true,
			},
		]
	},


	{
		domanda: "Al Jazeera è:",
		risposte: [
			{
				risposta: "Un'associazione terroristica",
				isCorrect: false,
			},
			{
				risposta: "Una sezione del Corano",
				isCorrect: false,
			},
			{
				risposta: "Uno scrittore arabo",
				isCorrect: false,
			},
			{
				risposta: "L'emittente ufficiale del mondo arabo",
				isCorrect: true,
			},
		]
	},

	{
		domanda: "Chi scrisse la commedia 'La Mandragola?'",
		risposte: [
			{
				risposta: "Verga",
				isCorrect: false,
			},
			{
				risposta: "Del Tufo",
				isCorrect: false,
			},
			{
				risposta: "Tasso",
				isCorrect: false,
			},
			{
				risposta: "Machiavelli",
				isCorrect: true,
			},
		]
	},

	{
		domanda: "Quale tra queste affermazioni su Dante Alighieri è falsa?",
		risposte: [
			{
				risposta: "E' nato a Firenze",
				isCorrect: false,
			},
			{
				risposta: "Ha fatto parte dei guelfi bianchi",
				isCorrect: false,
			},
			{
				risposta: "Ha scritto il Convivio",
				isCorrect: false,
			},
			{
				risposta: "Ha scritto l'Aminta",
				isCorrect: true,
			},
		]
	},
];


buttonsid = ["btn1","btn2","btn3","btn4"]
vincite = ["500", "1.000", "1.500", "2.000", "3.000", "5.000", "7.000", "10.000", "15.000", "20.000", "30.000", "70.000", "150.000", "300.000", "1.000.000"]

let indexDomanda=-1;
const NUM_DOMANDE = 15;

function shuffle(array) {
 	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
  	}
	return array;
}


//popolo domande e risposte
function Populate(domande, index){
	document.getElementById("domanda").innerHTML = domande[index].domanda;
	let risp = domande[index].risposte;
	let rispshuffle = shuffle(risp);
	document.getElementById("btn1").innerHTML = rispshuffle[0].risposta;
	document.getElementById("btn2").innerHTML = rispshuffle[1].risposta;
	document.getElementById("btn3").innerHTML = rispshuffle[2].risposta;
	document.getElementById("btn4").innerHTML = rispshuffle[3].risposta;
};


let timer;
//Timer funzionante
function Timer(clearinterval=false){
	if (clearinterval){
		clearInterval(timer);
		return;
	}
	let maxTimer = 60;
	let y = 0
	//let timer = setInterval(function() { 
	timer = setInterval(function() { 
		y += 1;
		let t = maxTimer - y; 
		const countdown = document.getElementById("countdown");
		const barra = document.getElementById("demo");
		countdown.innerHTML = t + " sec"; 
		let currBar = 100*t/maxTimer;
		barra.style.width = String(currBar) + "%";
		if (t < 0) { 
			clearInterval(timer);
			countdown.innerHTML = "TEMPO SCADUTO"; 
		} 
	}, 1000); 
};



let dom;

function GetStarted(){
	document.getElementById("countdown").style.display = "block";
	document.getElementById("barra").style.display = "flex";
	document.getElementById("btniniziale").style.display = "none";
	document.getElementById("domgroup").style.display = "block";
	document.getElementById("montepremi").style.display = "flex";
	//Populate();
	dom = shuffle(domande);
	//NextDomanda(0)
	ProxDom();
};


function Verifica(indexDomanda, buttonid){
	rispostaselzionata = $(document.getElementById(buttonid)).text();
	document.getElementById("debug").innerHTML=rispostaselzionata;
	risposteList = domande[indexDomanda].risposte;
	ret = false;
	for (let i = 0; i < risposteList.length; i++) {
	  if (risposteList[i].risposta === rispostaselzionata){
			if (risposteList[i].isCorrect)
				ret = risposteList[i].isCorrect;
		};
	}
	return ret;
};


function NextDomanda(buttonid=0){
	if (indexDomanda>=0){
		//Verifica(indexDomanda, buttonid) ? document.getElementById("giusto").style.display = "block" : document.getElementById("sbagliato").style.display = "block";
		let i = buttonsid.indexOf(buttonid);
		let x = buttonsid.splice(i,1);
		buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = true);

		if (Verifica(indexDomanda, buttonid)){
			$('#giusto').modal('show');
			//document.getElementById("giusto").style.display = "block";
			document.getElementById("sbagliato").style.display = "none";
			document.getElementById("proxdomanda").style.display = "block";
			BarIncrement(indexDomanda);
		}
		else{
			document.getElementById("sbagliato").style.display = "block";
			//document.getElementById("giusto").style.display = "none";
			GameOver()
		} 
		buttonsid.push(buttonid);
	}
	//Populate(dom, ++indexDomanda);
	Timer(true);
};

function ProxDom(){
	buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = false);
	Populate(dom, ++indexDomanda);
	Timer();
}


function GameOver(){
	Timer(true);
	document.getElementById("gameover").style.display = "block";
	document.getElementById("rigioca").style.display = "block";
}

function Rigioca(){
	window.location.reload();
}


function BarIncrement(indexDomanda){
	const barra = document.getElementById("montepremiBar");
	let currBar = 100 * (indexDomanda + 1)/NUM_DOMANDE;
	barra.style.height = String(currBar) + "%" ;
	barra.innerHTML = vincite[15*currBar/100-1];
}



/*
let maxTimer = 60;
let y = 0
let x = setInterval(function() { 
y += 1;
let t = maxTimer - y; 
let countdown = document.getElementById("countdown");
let barra = document.getElementById("demo");
countdown.innerHTML = t + " sec"; 
currBar = 100*t/maxTimer;
barra.style.width = String(currBar) + "%";
if (t < 0) { 
	clearInterval(x);
	countdown.innerHTML = "TEMPO SCADUTO"; 
} 
}, 1000); 


*/
/*let maxTimer = 60000;
let y = 0
let increment = 100;
let x = setInterval(function() { 
y += increment;
let t = maxTimer - y; 
let countdown = document.getElementById("countdown");
let barra = document.getElementById("demo");

if ((t%100)==0)
	countdown.innerHTML = Math.floor(t/1000) + " sec"; 

currBar = Math.floor(100*t/(maxTimer));
barra.style.width = String(currBar) + "%";
if (t <= 0) { 
    clearInterval(x);
    countdown.innerHTML = "TEMPO SCADUTO"; 
} 
}, increment); 
*/