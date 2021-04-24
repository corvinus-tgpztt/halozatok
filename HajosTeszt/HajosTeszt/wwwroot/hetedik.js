var kérdések;
var sorszam = 2;
var kattinthatoe = true;


window.onload= function letöltés(){
   /* fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );

    function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés")
        console.log(d)
        kérdések = d;
        kérdésMegjelenítés(kérdések[0])
    } */
    kérdésBetöltés(sorszam)
    
}
function kérdésBetöltés(id) {
            fetch(`/questions/${id}`)
                .then(response => {
                    if (!response.ok) {
                        console.error(`Hibás válasz: ${response.status}`)                        
                    }
                    else {
                        return response.json()
                    }
                })
                .then(data => letöltésBefejeződött(data));                
}    
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdések)
}

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3   
    if (kérdés.image == "") {
        document.getElementById("kép1").src = "";
    }
    else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;    
    }
         
}

function visszaallit() {
    document.getElementById("válasz1").classList = "kerdes kattintható";
    document.getElementById("válasz2").classList = "kerdes kattintható";
    document.getElementById("válasz3").classList = "kerdes kattintható";
    kattinthatoe = true;
}


function ertekeles(szam) {

    if (kattinthatoe==true) {
        document.getElementById("válasz1").classList = "kerdes megvalaszolt";
        document.getElementById("válasz2").classList = "kerdes megvalaszolt";
        document.getElementById("válasz3").classList = "kerdes megvalaszolt";

        if (szam == kérdések.correctAnswer) {
            document.getElementById("válasz" + szam).classList = "kerdes jó";
        }
        else {
            document.getElementById("válasz" + szam).classList = "kerdes rossz";
            document.getElementById("válasz" + kérdések.correctAnswer).classList = "kerdes jó";
        }
        kattinthatoe = false;
    }

    
}


function elore() {

    if (sorszam >= 800) {
        sorszam = 0;
    }

    sorszam++;
    kérdésBetöltés(sorszam);
    visszaallit();
}
function vissza() {
    if (sorszam <= 1) {
        sorszam = 801;
    }

    sorszam--; 
    kérdésBetöltés(sorszam);
    visszaallit();
}
