const domande=[
	domanda1={
		testo:"Quale tra questi non è un sinonimo di 'piccolezza'",
		opzioni: ["Limitatezza","Esiguità","Mediocrità","Rilevanza"] 
	},
	domanda2={
		testo: "Al Jazeera è:",
		opzioni: ["L'emittente ufficiale del mondo arabo","Un'associazione terroristica","Una sezione del Corano","Uno scrittore arabo"]
	},
	domanda3={
		testo:"Chi scrisse la commedia 'La Mandragola?'",
		opzioni:["Verga","Del Tufo","Machiavelli","Tasso"]
	},
	domanda4={
		testo:"Quale tra queste affermazioni su Dante Alighieri è falsa?",
		opzioni:["Non è mai stato esiliato","E' nato a Firenze","Ha scritto il Convivio","Ha fatto parte dei guelfi bianchi"]
	},
	domanda5={
		testo:"Chi è il regista di 'Jurassik Park'?",
		opzioni:["Steven Spielberg","Tarantino","Martin Scorsese","James Cameron"]
	},
	domanda6={
		testo:"Cosa rappresentava il primo film proiettato al cinema?",
		opzioni:["Un razzo lanciato sulla luna","Un treno","Degli operai in fabbrica","Una guerra"]
	},
	domanda7={
		testo:"Chi conduce 'Che tempo che fa'?",
		opzioni:["Fabio Fazio","Amadeus","Carlo Conti","Flavio Insinna"]
	},
	domanda8={
		testo:"Chi scrisse 'Madame Bovary?",
		opzioni:["Gustave Flaubert","Emile Zola","Stendhal","Honoré de Balzac"]
	},
	domanda9={
		testo:"Quale stato è nato il 14 maggio 1948?",
		opzioni:["Israele","Iran","Giordania","Guatemala"]
	},
	domanda10={
		testo:"Qual è il monumento più famoso di Piazza dei Miracoli?",
		opzioni:["Torre di Pisa","Palazzo Medici","Duomo","Battistero di San Giovanni"]
	},
	domanda11={
		testo:"Chi cadde da cavallo vedendo Gesù?",
		opzioni:["San Paolo","San Giovanni","San Tommaso","San Bartolomeo"]
	},
	domanda12={
		testo:"Quale artista si innamorò della 'fornarina'?",
		opzioni:["Raffaello","Michelangelo","Giotto","Leonardo"]
	},
	domanda13={
		testo:"Nel 'Decameron', quale pietra conferisce l'invisibilità?",
		opzioni:["Quarzo","Diamante","Elitropia","Topazio"]
	},
	domanda14={
		testo:"Chi scrisse il flauto magico?",
		opzioni:["Mozart","Beethoven","Bach","Rossini"]
	},
	domanda15={
		testo:"A quale popolo è dedicata 'Va pensiero'?",
		opzioni:["Ebraico","Egizio","Babilonese","Curdo"]
	}
];

const giuste= [493749626,-803816897,1093766281,-802394817,-272823447,-1984280469,1212935481,-531084027,
				81156382,-832453422,-243175586,1556165798,-1984226196,1688184353,-1584533924]

buttonsid = ["btn1","btn2","btn3","btn4"]
vincite = ["500", "1.000", "1.500", "2.000", "3.000", "5.000", "7.000", "10.000", "15.000", "20.000", "30.000", "70.000", "150.000", "300.000", "1.000.000"]

let indexDomanda=-1;
const NUM_DOMANDE = 15;
let wannawin = 0

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

const Populate = ()=> {
	const mescoladomande = shuffle(domande); //rimescolo ciascun elemento dell'array
	const domandarandom = mescoladomande.map((e, i, arr) => arr[i]); //pesco  le domande 
	const opzionirandom = mescoladomande.map((e, i, arr) => shuffle(arr[i].opzioni)); //rimescolo tutte le risposte di ogni domanda
	document.getElementById("domanda").innerHTML = domandarandom[0].testo;
	document.getElementById("btn1").innerHTML = domandarandom[0].opzioni[0];
	document.getElementById("btn2").innerHTML = domandarandom[0].opzioni[1];
	document.getElementById("btn3").innerHTML = domandarandom[0].opzioni[2];
	document.getElementById("btn4").innerHTML = domandarandom[0].opzioni[3];
	domande.shift(domandarandom)
	wannawin++

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
	//let timer = setInterval(function() { 
	timer = setInterval(function() { 
		y += 1;
		let t = maxTimer - y; 
		const countdown = document.getElementById("countdown");
		countdown.innerHTML = t; 
		if (t < 0) { 
			clearInterval(timer);
			countdown.innerHTML = "TEMPO SCADUTO"; 
			temposcaduto()
		} 
	}, 1000); 
};





function GetStarted(){
	document.getElementById("intestazione").style.display ="none";
	document.getElementById("introduction").style.display = "none";
	document.getElementById("logodomanda").style.display="block";
	document.getElementById("countdown").style.display = "block";
	document.getElementById("btniniziale").style.display = "none";
	document.getElementById("domgroup").style.display = "block";
	document.getElementById("montepremi").style.display = "flex";

	//Populate();
	dom = shuffle(domande);
	//NextDomanda(0)
	ProxDom();
};


//conversione della stringa in hash

function stringToHash(string) { 
    var hash = 0; 
    if (string.length == 0) return hash; 
                  
    for (i = 0; i < string.length; i++) { 
    	char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
        } 
                  
    return hash; 
}


function NextDomanda(buttonid=0){
	if (indexDomanda>=0){
		//Verifica(indexDomanda, buttonid) ? document.getElementById("giusto").style.display = "block" : document.getElementById("sbagliato").style.display = "block";
		let i = buttonsid.indexOf(buttonid);
		let x = buttonsid.splice(i,1);
		buttonsid.forEach((e, i, arr) => document.getElementById(e).disabled = true);
		rispostaselzionata = $(document.getElementById(buttonid)).text();
		if (giuste.includes(stringToHash(rispostaselzionata)) && wannawin<NUM_DOMANDE){
			document.getElementById("giusto").style.display = "block";
			//document.getElementById("sbagliato").style.display = "none";
			document.getElementById("proxdomanda").style.display = "block";
			BarIncrement(indexDomanda);
		}
		else if (wannawin === NUM_DOMANDE){
			win()
		}
		else{
			lose()
		} 
		buttonsid.push(buttonid);
	}
	//Populate(dom, ++indexDomanda);
	Timer(true);
};


function ProxDom(){
	document.getElementById("giusto").style.display = "none";
	document.getElementById("proxdomanda").style.display = "none";
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

function win(){
	document.getElementById("spaziodomanda").style.display="none";
	document.getElementById("intestazione").style.display="block";
	document.getElementById("tutto").style.display = "none";
	document.getElementById("vinto").style.display = "block";
 	document.getElementById("rigioca").style.display="block";
}

function lose(){
	document.getElementById("spaziodomanda").style.display="none";
	document.getElementById("intestazione").style.display="block";
	document.getElementById("tutto").style.display = "none";
	document.getElementById("perso-errore").style.display = "block";
 	document.getElementById("rigioca").style.display="block";
}

function temposcaduto(){
	document.getElementById("spaziodomanda").style.display="none";
	document.getElementById("intestazione").style.display="block";
	document.getElementById("tutto").style.display = "none";
	document.getElementById("perso-tempo").style.display = "block";
	document.getElementById("rigioca").style.display="block";

}