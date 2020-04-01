const buttonsid = ["btn1","btn2","btn3","btn4"];
const vincite = ["500", "1.000", "1.500", "2.000", "3.000", "5.000", "7.000", "10.000", "15.000", "20.000", "30.000", "70.000", "150.000", "300.000", "1.000.000"];
const aiutiid = ["fifty1", "fifty2", "switch1", "switch2"]

let indexDomanda=-1;
const NUM_DOMANDE = 15;
const NUM_AIUTI_5050 = 2;
const NUM_AIUTI_SWITCH = 2;
let wannawin = 0;

const SECRET = "Secre7:Pa55phras3";
let domande;

let lastclick = null;
let lastrisp = null;
let aiutoUsatoInDom=-1;	//contiene il numero della domanda in cui è stato usato un aiuto per l'ultima volta
let fiftyfiftyjustused = false;
let actualid = null;

function decryptDomande() {
	// leggo dal file domandeEncrypetd.js la variabile ecrypetdJSON contenente le domande in formato
	// json criptate e le decripto usando SECRET (la stessa parola chiave con cui le ho criptate)
	let decrypted = CryptoJS.AES.decrypt(ecrypetdJSON, SECRET);
	domandeStr = decrypted.toString(CryptoJS.enc.Utf8);
	// restituisco le domande in chiaro
	return JSON.parse(domandeStr);
}


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
	domande = decryptDomande();
	document.getElementById("countdown").style.display = "block";
	document.getElementById("barra").style.display = "flex";
	document.getElementById("btniniziale").style.display = "none";
	document.getElementById("domgroup").style.display = "block";
	document.getElementById("montepremi").style.display = "flex";
	document.getElementById("intestazione").style.display = "none";
	document.getElementById("switchenfifty").style.display = "block";

	//Populate();
	dom = shuffle(domande);
	//NextDomanda(0)
	ProxDom();
};


function Verifica(indexDomanda, buttonid){
	rispostaselzionata = $(document.getElementById(buttonid)).text();
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
	if (lastclick === buttonid && lastrisp === $(document.getElementById(buttonid)).text()){
		alert("Hai già risposto");
		return false;
	}

	if (fiftyfiftyjustused === true){
		aiutiid.forEach((e, i, arr) => document.getElementById(e).disabled = false);
		document.getElementById(actualid).disabled = true;
	}

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
	lastclick = buttonid;
	lastrisp = $(document.getElementById(buttonid)).text();
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
	barra.innerHTML = vincite[indexDomanda];
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

function aiutoUtilizzabile(){
	if (aiutoUsatoInDom===indexDomanda){
		alert("Hai già usato un aiuto per questa domanda!");
		return false;
	}
	else
		return true;
}

function aiutofiftyfifty(fiftyid){
	if (!aiutoUtilizzabile())
		return false;


	fiftyfiftyjustused = false;
	let i = aiutiid.indexOf(fiftyid);
	let x = aiutiid.splice(i,1);
	aiutiid.forEach((e, i, arr) => document.getElementById(e).disabled = true);


	let c = 0;
	shufflebutton = shuffle(buttonsid);
	shufflebutton.forEach((e, i, arr) => {
		if (c === 2)
			return false;
		if (!Verifica(indexDomanda, e)){
			++ c;
			document.getElementById(e).disabled = true;
		}
	}); 

	// aiutiid.push(fiftyid);

	aiutoUsatoInDom=indexDomanda;
	fiftyfiftyjustused = true;
	actualid = fiftyid;
}

function aiutoswitch(switchid){
	if (!aiutoUtilizzabile())
		return false;

	// TODO: creare logica

	aiutoUsatoInDom=indexDomanda;
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
