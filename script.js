//array degli objects domanda
const geografia=[
	domanda1={
		testo:"Quale tra questi non è un sinonimo di 'piccolezza'",
		opzioni: ["Limitatezza","Esiguità","Piccolezza","Rilevanza"] 
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
	}
];

//Mescolatore degli elementi dell'array 
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

//Generatore di domande
const Populate = ()=> {
	const randomDgeografia = shuffle(geografia); //rimescolo ciascun elemento dell'array
	const randomDOMgeografia = randomDgeografia.map((e, i, arr) => arr[i]); //pesco  le domande 
	const randomAgeografia = randomDgeografia.map((e, i, arr) => shuffle(arr[i].opzioni)); //rimescolo tutte le risposte di ogni domanda
	document.getElementById("domanda").innerHTML = randomDOMgeografia[0].testo;
	document.getElementById("btn1").innerHTML = randomDOMgeografia[0].opzioni[0];
	document.getElementById("btn2").innerHTML = randomDOMgeografia[0].opzioni[1];
	document.getElementById("btn3").innerHTML = randomDOMgeografia[0].opzioni[2];
	document.getElementById("btn4").innerHTML = randomDOMgeografia[0].opzioni[3];

};

//array risposte giuste
const giuste = ["Limitatezza","Un'associazione terroristica","Machiavelli","Non è mai stato esiliato"]


//verifica bottone 1
const verifica1= ()=> {
    const div = document.createElement("div")
    div.setAttribute("id","alert")
    container.appendChild(div)
    var x = $(document.getElementById("btn1")).text()
    //console.log(x)
		if(giuste.includes(x)){// bisogna estrarre il testo del bottone e scorrere tutti gli elementi dell'array
	        div.setAttribute("class", "alert alert-success")
	        document.getElementById("alert").innerHTML="Complimenti! Risposta esatta"

	    }
		else{
			div.setAttribute("class", "alert alert-danger")
	        document.getElementById("alert").innerHTML="Peccato! Risposta sbagliata"
		}

}

//verifica bottone 2
const verifica2= ()=> {
    const div = document.createElement("div")
    div.setAttribute("id","alert")
    container.appendChild(div)
    var x = $(document.getElementById("btn2")).text()
		if(giuste.includes(x)){
	        div.setAttribute("class", "alert alert-success")
	        document.getElementById("alert").innerHTML="Complimenti! Risposta esatta"

	    }
		else{
			div.setAttribute("class", "alert alert-danger")
	        document.getElementById("alert").innerHTML="Peccato! Risposta sbagliata"
		}

}

//verifica bottone 3
const verifica3= ()=> {
    const div = document.createElement("div")
    div.setAttribute("id","alert")
    container.appendChild(div)
    var x = $(document.getElementById("btn3")).text()
		if(giuste.includes(x)){
	        div.setAttribute("class", "alert alert-success")
	        document.getElementById("alert").innerHTML="Complimenti! Risposta esatta"

	    }
		else{
			div.setAttribute("class", "alert alert-danger")
	        document.getElementById("alert").innerHTML="Peccato! Risposta sbagliata"
		}

}

//verifica bottone 4
const verifica4= ()=> {
    const div = document.createElement("div")
    div.setAttribute("id","alert")
    container.appendChild(div)
    var x = $(document.getElementById("btn4")).text()
		if(giuste.includes(x)){
	        div.setAttribute("class", "alert alert-success")
	        document.getElementById("alert").innerHTML="Complimenti! Risposta esatta"

	    }
		else{
			div.setAttribute("class", "alert alert-danger")
	        document.getElementById("alert").innerHTML="Peccato! Risposta sbagliata"
		}

}

//Timer funzionante
const Timer = () => {
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

};

//funzione iniziale
const GetStarted = () => {
	document.getElementById("countdown").style.display = "block";
	document.getElementById("barra").style.display = "flex";
	document.getElementById("btniniziale").style.display = "none";
	document.getElementById("domgroup").style.display = "block";
	Populate();
	Timer();
	
};






