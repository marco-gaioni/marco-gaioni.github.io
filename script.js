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
				descrizione: "rilevanza s. f. [der. di rilevante]. – Il fatto, la caratteristica di essere rilevante, cioè di notevole importanza o anche gravità, soprattutto riguardo a determinati fini.",
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
				descrizione: "Al Jazeera è una rete televisiva satellitare con sede in Qatar, talvolta menzionata come Al Jazira.",
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
				descrizione: "Mandragola è una commedia di Niccolò Machiavelli, considerata il capolavoro del teatro del Cinquecento e un classico della drammaturgia italiana. Composta da un prologo e cinque atti, è una potente satira sulla corruttibilità della società italiana dell'epoca.",
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
				descrizione: "L'Aminta è una favola pastorale composta da Torquato Tasso nel 1573 e pubblicata nel 1580 circa. La prima rappresentazione ebbe luogo con buone probabilità al Belvedere di Ferrara",
			},
		]
	},
];


const buttonsid = ["btn1","btn2","btn3","btn4"];
const vincite = ["500", "1.000", "1.500", "2.000", "3.000", "5.000", "7.000", "10.000", "15.000", "20.000", "30.000", "70.000", "150.000", "300.000", "1.000.000"];

let indexDomanda=-1;
const NUM_DOMANDE = 1;
let wannawin = 0;

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
			temposcaduto();
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
	let scopri = document.getElementById("scopridipiu");
	for (let i = 0; i < risposteList.length; i++) {
	  if (risposteList[i].risposta === rispostaselzionata){
			if (risposteList[i].isCorrect){
				ret = risposteList[i].isCorrect;
				scopri.innerHTML = risposteList[i].descrizione;
				++ wannawin;
			};
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

		if (Verifica(indexDomanda, buttonid) && wannawin<NUM_DOMANDE){
			let x = document.getElementById("haivintotot");
			x.innerHTML = "Complimenti! Hai vinto " + vincite[indexDomanda] +"$. Vuoi approfondire l'argomanto? Clicca il bottone qui sotto.";
			$('#giusto').modal('show');
			//document.getElementById("giusto").style.display = "block";
			document.getElementById("proxdomanda").style.display = "block";
			BarIncrement(indexDomanda);
		}
		else if (wannawin === NUM_DOMANDE){
			win();
		}
		else{
			$('#sbagliato').modal('show');
			//document.getElementById("giusto").style.display = "none";
		} 
		buttonsid.push(buttonid);
	}
	//Populate(dom, ++indexDomanda);
	Timer(true);
};

function ProxDom(){
	document.getElementById("proxdomanda").style.display = "none";
	buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = false);
	Populate(dom, ++indexDomanda);
	Timer();
};


function Rigioca(){
	window.location.reload();
};


function BarIncrement(indexDomanda){
	const barra = document.getElementById("montepremiBar");
	let currBar = 100 * (indexDomanda + 1)/NUM_DOMANDE;
	barra.style.height = String(currBar) + "%" ;
	barra.innerHTML = vincite[NUM_DOMANDE*currBar/100-1];
};


function win(){
	let tutto = document.getElementById("tutto");
	let haivinto = document.getElementById("vinto");
	tutto.style.display = "none";
	haivinto.style.display = "block";
}

function temposcaduto(){
	let tutto = document.getElementById("tutto");
	let perso = document.getElementById("perso");
	tutto.style.display = "none";
	perso.style.display = "block";
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
