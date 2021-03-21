let kulsodoboz = document.getElementById("kulso");

kulsodoboz.innerHTML = "";

for (let i = 1; i < 11; i++) {
    let ujelem = document.createElement("div");
    kulsodoboz.appendChild(ujelem);
    ujelem.innerHTML = "<b>"+i+"</b>";
    ujelem.style.backgroundColor = "rgb(0, 0, "+(25.5*i)+")";
    ujelem.classList.add("dobozka");
}
let pascal = document.getElementById("pascal")

for (let sor = 0; sor < 10; sor++) {
    let divsor = document.createElement("div")
    divsor.classList.add("sor")
    pascal.appendChild(divsor)

    for (let oszlop = 0; oszlop <= sor; oszlop++) {
        let divelem = document.createElement("div")
        divelem.classList.add("elem")
        divsor.appendChild(divelem)


        let faktorialis = function (n) {
            let er = 1;
            for (let i = 2; i <= n; i++) {
                er = er * i;
            }
            return er;
        }
        divelem.innerText = faktorialis(sor) / (faktorialis(oszlop) * faktorialis(sor - oszlop))

    }
}