var kérdések;
var sorszam = 0;
var kattinthatoe = true;


window.onload= function letöltés(){
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );

    function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés")
        console.log(d)
        kérdések = d;
        kérdésMegjelenítés(kérdések[0])
    }

    
}

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kérdés_szöveg").innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;

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

        if (szam == kérdések[sorszam].correctAnswer) {
            document.getElementById("válasz" + szam).classList = "kerdes jó";
        }
        else {
            document.getElementById("válasz" + szam).classList = "kerdes rossz";
            document.getElementById("válasz" + kérdések[sorszam].correctAnswer).classList = "kerdes jó";
        }
        kattinthatoe = false;
    }

    
}


function elore() {
    if (sorszam == (kérdések.length - 1)) {
        sorszam = 0;
    }
    else { sorszam++; }
    kérdésMegjelenítés(kérdések[sorszam]);
    visszaallit();
}
function vissza() {
    if (sorszam == 0) {
        sorszam = kérdések.length - 1;
    }
    else { sorszam--; }
    kérdésMegjelenítés(kérdések[sorszam]);
    visszaallit();
}
