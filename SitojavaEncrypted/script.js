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

//funzione che mi cripta le domande
function decryptDomande() {
	// leggo dal file domandeEncrypetd.js la variabile ecrypetdJSON contenente le domande in formato
	// json criptate e le decripto usando SECRET (la stessa parola chiave con cui le ho criptate)
	let decrypted = CryptoJS.AES.decrypt(ecrypetdJSON, SECRET);
	domandeStr = decrypted.toString(CryptoJS.enc.Utf8);
	// restituisco le domande in chiaro
	return JSON.parse(domandeStr);
}

//mescolatore delle domande
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
	let maxTimer = 61;
	let y = 0
	timer = setInterval(function() { 
		y += 1;
		let t = maxTimer - y; 
		const countdown = document.getElementById("countdown");
		countdown.innerHTML = t; 
		if (t === 0) { 
			clearInterval(timer); 
			temposcaduto();
		} 
	}, 1000); 
};

let dom;

//funzione start quando clicco su "iniziamo"
function GetStarted(){
	domande = decryptDomande();
	document.getElementById("brand").style.display = "none";
	document.getElementById("introduction").style.display = "none";
	document.getElementById("btniniziale").style.display = "none";
	document.getElementById("schermatadomanda").style.display = "block";
	dom = shuffle(domande);
	ProxDom();
};

//verifica che il testo della rsiposta sia quello corretto
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

//funzione che gestisce la verifica e l'utilizzo degli aiuti
function NextDomanda(buttonid=0){
	if (lastclick === buttonid && lastrisp === $(document.getElementById(buttonid)).text()){
		alert("Hai già risposto");
		return false;
	}//se ho già cliccato una risposta lastlick assume il valore dell'id dell'stanza vera e propria del bottone e quindi non posso più rispondere

	if (fiftyfiftyjustused === true){
		aiutiid.forEach((e, i, arr) => document.getElementById(e).disabled = false);
		document.getElementById(actualid).disabled = true;
	}

	if (indexDomanda>=0){
		
		let i = buttonsid.indexOf(buttonid);//restituisce la prima occorrenza di buttonid
		let x = buttonsid.splice(i,1);//rimuove dall'array l'occorenza trovata prima
		buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = true);//tutti gli altri bottoni vengono disattivati

		if (Verifica(indexDomanda, buttonid) && wannawin<NUM_DOMANDE){
			let x = document.getElementById("haivintotot");
			x.innerHTML = "Complimenti! Hai vinto " + vincite[indexDomanda] +"$. Vuoi approfondire l'argomento? Clicca il bottone qui sotto.";
			$('#giusto').modal('show');
			document.getElementById("proxdomanda").style.display = "block";
			BarIncrement(indexDomanda);
		}//se la risposta è corretta passo alla domanda successiva 
		else if (wannawin === NUM_DOMANDE){
			win();
		}//se ho risposto a tutte le domande ho vinto
		else{
			$('#sbagliato').modal('show');
		} // se sbaglio esce il modale con la possibilità di rigiocare
		buttonsid.push(buttonid);//reinserisco nell'array l'id del bottone che avevo tolto
	}
	//Populate(dom, ++indexDomanda);
	Timer(true);
	lastclick = buttonid;//lastclick assume il valore dell'id del bottone selezionato in modo tale da non poterlo più schiacciare
	lastrisp = $(document.getElementById(buttonid)).text();//lastrisp assume il testo del bottone selezionato
};

//funzione di accesso alla prossima domanda
function ProxDom(){
	document.getElementById("proxdomanda").style.display = "none";
	buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = false);
	Populate(dom, ++indexDomanda);
	Timer();
};

//funzione di ricarica della pagina
function Rigioca(){
	window.location.reload();
};

//incrementatore della barra del montepremi
function BarIncrement(indexDomanda){
	const barra = document.getElementById("montepremiBar");
	let currBar = 100 * (indexDomanda + 1)/NUM_DOMANDE;
	barra.style.height = String(currBar) + "%" ;
	barra.innerHTML = vincite[indexDomanda];
};

//funzione hai vinto
function win(){
	document.getElementById("brand").style.display="block";
	document.getElementById("schermatadomanda").style.display = "none";
	document.getElementById("vinto").style.display = "block";
}

//funzione per il tempo scaduto e visulaizzazione della pagina tempo scaduto
function temposcaduto(){
	document.getElementById("brand").style.display="block";
	document.getElementById("schermatadomanda").style.display="none";
	document.getElementById("perso").style.display="block";
}

//funzione che mi controlla se un aiuto è utilizzabile
function aiutoUtilizzabile(){
	if (aiutoUsatoInDom===indexDomanda){
		alert("Hai già usato un aiuto per questa domanda!");
		return false;
	}
	else
		return true;
}

//funzione che mi esclude due possibilità sbagliate
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
	aiutoUsatoInDom=indexDomanda;
	fiftyfiftyjustused = true;
	actualid = fiftyid;
	document.getElementById(fiftyid).style.display="none"
}

function aiutoswitch(switchid){
	if (!aiutoUtilizzabile())
		return false;

	// TODO: creare logica

	aiutoUsatoInDom=indexDomanda;
}

