//VARIABILI GLOBALI

const buttonsid = ["btn1","btn2","btn3","btn4"];
const vincite = ["500", "1.000", "1.500", "2.000", "3.000", "5.000", "7.000", "10.000", "15.000", "20.000", "30.000", "70.000", "150.000", "300.000", "1.000.000"];
const aiutiid = ["fifty1", "fifty2", "switch1", "switch2"]
let indexDomanda=-1;
const questionForTheWin = 15;
let wannawin = 0;
let domande;
let lastclick = null;
let lastrisp = null;
let domandeXswitch;
let rispostaFornita=false;

//FUNZIONI PRO

const SECRET = "Secre7:Pa55phras3";
function decryptDomande() {
	// leggo dal file domandeEncrypetd.js la variabile encrypetdJSON contenente le domande in formato
	// json criptate e le decripto usando SECRET (la stessa parola chiave con cui le ho criptate)
	let decrypted = CryptoJS.AES.decrypt(ecrypetdJSON, SECRET);
	domandeStr = decrypted.toString(CryptoJS.enc.Utf8);
	return JSON.parse(domandeStr);
}

function shuffle(array) {
 	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
  	}
	return array;
}

let timer;
function time(clearinterval=false){
	if (clearinterval){
		clearInterval(timer);
		return;
	}
	let maxTimer = 61;
	let y = 0
	timer = setInterval(function() { 
		y += 1;
		let t = maxTimer - y; 
		const countdown = document.getElementById("countdown");
		countdown.innerHTML = t; 
		if (t === 0) { 
			clearInterval(timer); 
			expired();
		} 
	}, 1000); 
};


//FUNZIONI CHE GESTISCONO GLI AIUTI
function aiutofiftyfifty(fiftyid){
	let i = aiutiid.indexOf(fiftyid);
	aiutiid.splice(i,1);
	disabled(aiutiid);
	let c = 0;
	shufflebutton = shuffle(buttonsid);
	shufflebutton.forEach((e, i, arr) => {
		if (c === 2)
			return false;
		if (!check(indexDomanda,e,false)){
			++ c;
			document.getElementById(e).disabled="true";
			document.getElementById(e).className ="btn btn-outline-danger";

		}
	}); 
	remove(fiftyid);
};

function aiutoswitch(switchid){

	let i = aiutiid.indexOf(switchid);
	aiutiid.splice(i,1);
	disabled(aiutiid);
	domande[indexDomanda] = domandeXswitch.splice(0,1)[0];
	populateQuestion(domande, indexDomanda);
	remove(switchid);
};

//FUNZIONI SECONDARIE

function disabled (array){
	array.forEach((e, i, arr) => document.getElementById(e).disabled = true);
};

function abled (array){
	array.forEach((e, i, arr) => document.getElementById(e).disabled = false);
};

function remove(idElement){
	document.getElementById(idElement).style.display="none";
};

function print(idElement){
	document.getElementById(idElement).style.display="block";
};

function playAgain(){
	window.location.reload();
};

function barIncrement(indexDomanda){
	const bar = document.getElementById("montepremiBar");
	let currBar = 100 * (indexDomanda + 1)/questionForTheWin;
	bar.style.height = String(currBar) + "%" ;
	bar.innerHTML = vincite[indexDomanda] + "€";
};

function win(){
	print("brand");
	remove("schermatadomanda");
	print("vinto");
};

function expired(){
	print("brand");
	remove("schermatadomanda");
	print("temposcaduto");
};

function lose(){
	print("brand");
	remove("schermatadomanda");
	print("perso");
};

//FUNZIONI PRINCIPALI
function populateQuestion(domande, index){
	document.getElementById("domanda").innerHTML = domande[index].domanda;
	let rispshuffle = shuffle(domande[index].risposte);
	document.getElementById("btn1").innerHTML = rispshuffle[0].risposta;
	document.getElementById("btn2").innerHTML = rispshuffle[1].risposta;
	document.getElementById("btn3").innerHTML = rispshuffle[2].risposta;
	document.getElementById("btn4").innerHTML = rispshuffle[3].risposta;
};

function generateQuestion(){
	remove("proxdomanda");
	abled(aiutiid);
	abled(buttonsid);
	buttonsid.forEach((e, i, arr) => document.getElementById(e).className = "btn btn-outline-light");
	rispostaFornita = false
	populateQuestion(domande, ++indexDomanda);
	time();
};

function getStarted(){
 	remove("brand");
	remove("introduction");
	remove("btniniziale");
	print("schermatadomanda");
	domande = shuffle(decryptDomande());
	domandeXswitch = domande.slice(questionForTheWin)
	generateQuestion();
};

function check(indexDomanda, buttonid, validationForProgress=true){
	rispostaselzionata = $(document.getElementById(buttonid)).text();
	risposteList = domande[indexDomanda].risposte;
	ret = false;
	for (let i = 0; i < risposteList.length; i++) {
	  if (risposteList[i].risposta === rispostaselzionata){
			if (risposteList[i].isCorrect){
				ret = risposteList[i].isCorrect;
				if (validationForProgress){
					document.getElementById("scopridipiu").innerHTML = risposteList[i].descrizione;
					++ wannawin;
				}
			};
		};
	}
	return ret;
};

function moveTo(buttonid=0){
	disabled(aiutiid);
	if (lastclick === buttonid && lastrisp === $(document.getElementById(buttonid)).text()){
		alert("Hai già risposto");
		return false;
	}
	if (indexDomanda>=0){
		let i = buttonsid.indexOf(buttonid);
		let x = buttonsid.splice(i,1);
		disabled(buttonsid);

		if (check(indexDomanda, buttonid, true) && wannawin<questionForTheWin){
			document.getElementById("haivintotot").innerHTML = "Complimenti! Hai vinto " + vincite[indexDomanda] +"€. Vuoi approfondire l'argomento? Clicca il bottone qui sotto.";
			$('#giusto').modal('show');
			print("proxdomanda");
			barIncrement(indexDomanda);
		}
		else if (wannawin === questionForTheWin){
			win();
		}
		else{
			lose();
		} 
		buttonsid.push(buttonid);
	}
	time(true);
	rispostaFornita=true;
	lastclick = buttonid;
	lastrisp = $(document.getElementById(buttonid)).text();
};
