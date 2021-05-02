
var kérdés;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;
var repeat = 3;
var kattinthatoe = true;
var timeoutHandler;
var maxkerdes;
fetch('/questions/count').then((response) => response.json()).then(q => maxment(q));
function maxment(szam) {
    maxkerdes = szam;
}
window.onload = init();
function init() {

   
        

    let mystorage = window.localStorage.getItem("savedlist");
    if (mystorage) {
        console.log("Volt már listánk")
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }
        hotList = JSON.parse(mystorage);
        displayedQuestion = parseInt(window.localStorage.getItem("megjelenitett"));
        nextQuestion = window.localStorage.getItem("holtartunk");
        kérdésMegjelenítés();
    }
    else {
        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }

    

    
}

   
function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}




/*function kérdésBetöltés2(id) {
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
*/
/*function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdések)
}*/

function kérdésMegjelenítés() {
    var kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    window.localStorage.setItem("megjelenitett", displayedQuestion);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image == "") {
        document.getElementById("kép1").src = "";
    }
    else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;    
    }
    
    document.getElementById("kerdesszam").innerText = (hotList[displayedQuestion].question.questionId) + ". kérdés" ;
    document.getElementById("kor").innerText = hotList[displayedQuestion].goodAnswers + "/" + repeat;    
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

        if (szam == hotList[displayedQuestion].question.correctAnswer) {
            document.getElementById("válasz" + szam).classList = "kerdes jó";
            hotList[displayedQuestion].goodAnswers++;
            window.localStorage.setItem("holtartunk", nextQuestion);
            window.localStorage.setItem("savedlist", JSON.stringify(hotList));            
           console.log("localstorage mentve");
        }
        else {
            document.getElementById("válasz" + szam).classList = "kerdes rossz";
            hotList[displayedQuestion].goodAnswers=0;
            document.getElementById("válasz" + hotList[displayedQuestion].question.correctAnswer).classList = "kerdes jó";
            window.localStorage.setItem("holtartunk", nextQuestion);
          console.log(window.localStorage.getItem("savedlist"));
        }
        kattinthatoe = false;


        if (hotList[displayedQuestion].goodAnswers >= repeat)
        {
            if (nextQuestion>= maxkerdes-1) {
                alert("Nincs már több kérdés!");
                timeoutHandler = setTimeout(reset, 3000);
            }
            else {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                hotList[displayedQuestion].goodAnswers = 0;
                nextQuestion++;
                window.localStorage.setItem("holtartunk", nextQuestion);
                window.localStorage.setItem("savedlist", JSON.stringify(hotList));
            }
            
        }
        timeoutHandler = setTimeout(elore, 3000);

    }

    
}


function elore() {
    clearTimeout(timeoutHandler)
    visszaallit();
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
    
}
function vissza() {
    clearTimeout(timeoutHandler)
    visszaallit();
    displayedQuestion--;   
    if (displayedQuestion == -1) displayedQuestion = questionsInHotList-1;
    kérdésMegjelenítés()   
}
function reset() {
    localStorage.clear();
    for (var i = 0; i < questionsInHotList; i++) {
        hotList[i] = null
        
    }
    nextQuestion = 1;
    init();


}