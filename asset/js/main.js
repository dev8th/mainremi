var deckBottom = document.getElementsByClassName("deck-bottom")[0];
var deckTop = document.getElementsByClassName("deck-top")[0];
var closeDeck = document.getElementsByClassName("close-deck")[0];
var openDeck = document.getElementsByClassName("open-deck")[0];
var comCard = deckTop.getElementsByClassName("card");
var playerCard = deckBottom.getElementsByClassName("card");
var notif = document.getElementsByClassName("notif")[0];
var notifText = notif.getElementsByClassName("text")[0];
var notifReset = notif.getElementsByClassName("reset")[0];

var servingDeck = 10;
var turnKind = 1;
var cekPemenang;
var card,
serveTurn,
cardKind,
gameTurn,
beforeCardSimbol,
beforeCardTingkatan,
beforeCardAlphanum,
openCardSimbol,
openCardTingkatan,
openCardAlphanum,
selectedCard_alphanum,
selectedCard_Simbol,
selectedCard_arrayId,
selectedCard_tingkatan;

var player = [
    ["Pemain","Fase Pemain"],
    ["Komputer","Fase Komputer"]
];
var theCard = [
    ["A","♠",14],
    [2,"♠",2],
    [3,"♠",3],
    [4,"♠",4],
    [5,"♠",5],
    [6,"♠",6],
    [7,"♠",7],
    [8,"♠",8],
    [9,"♠",9],
    [10,"♠",10],
    ["J","♠",11],
    ["Q","♠",12],
    ["K","♠",13],
    ["A","♥",14],
    [2,"♥",2],
    [3,"♥",3],
    [4,"♥",4],
    [5,"♥",5],
    [6,"♥",6],
    [7,"♥",7],
    [8,"♥",8],
    [9,"♥",9],
    [10,"♥",10],
    ["J","♥",11],
    ["Q","♥",12],
    ["K","♥",13],
    ["A","♦",14],
    [2,"♦",2],
    [3,"♦",3],
    [4,"♦",4],
    [5,"♦",5],
    [6,"♦",6],
    [7,"♦",7],
    [8,"♦",8],
    [9,"♦",9],
    [10,"♦",10],
    ["J","♦",11],
    ["Q","♦",12],
    ["K","♦",13],
    ["A","♣",14],
    [2,"♣",2],
    [3,"♣",3],
    [4,"♣",4],
    [5,"♣",5],
    [6,"♣",6],
    [7,"♣",7],
    [8,"♣",8],
    [9,"♣",9],
    [10,"♣",10],
    ["J","♣",11],
    ["Q","♣",12],
    ["K","♣",13],
];

serveCard();
play();
closeDeck.addEventListener("click",function(){
    takeCloseDeck(0,gameTurn);
});
notifReset.addEventListener("click",function(){
    location.reload();
});

function play(){
    if(gameTurn!=0){
        comMind();
    }
}

function clickCard(element){
    if(gameTurn!=0){
        return false;
    }

    if(element.classList.contains("slide-top")){
        gameProcess(element);
    }else{
        Object.keys(playerCard).forEach(element => {
            playerCard[element].classList.remove("slide-top");
            playerCard[element].classList.remove("roll-in-blurred-left");
            playerCard[element].classList.remove("roll-in-blurred-right");
        });
        element.classList.add("slide-top");
    }
}

function gameProcess(element){
    console.log("TurnKind => "+turnKind);
    console.log("GameTurn => "+gameTurn);
    console.log(element);

    var time = 0;
    selectedCard_Simbol = element.getAttribute("simbol");
    selectedCard_tingkatan = element.getAttribute("tingkatan");
    selectedCard_alphanum = element.getAttribute("alphanum");
    selectedCard_arrayId = element.getAttribute("arrayId");

    if(openCardSimbol!=""){
        if(selectedCard_Simbol!=openCardSimbol&&selectedCard_alphanum!=openCardAlphanum){
            return false;
        }
    }

    if(gameTurn==0){
        element.classList.add("fade-out-top");
    }else{
        element.classList.add("fade-out-bottom");
    }

    setTimeout(() => {
        element.remove();
        cekPemenang = gameOver();
    }, time+=350);
            
    setTimeout(() => {

        card = "";
        card = document.createElement("div");
        card.classList.add("open-card");  
        card.style.marginLeft="-124px";
        card.innerHTML="<div class='cover'></div>";
        openDeck.appendChild(card); 

        card.classList.add("flip");
        card.innerHTML="";

        cardKind="card-kind";
        if(selectedCard_Simbol=="♦"||selectedCard_Simbol=="♥"){
            cardKind="card-kind-red";
        }
        card.setAttribute("arrayId",selectedCard_arrayId);
        card.setAttribute("id",Math.random().toString(36).slice(2));
        card.setAttribute("alphanum",selectedCard_alphanum);
        card.setAttribute("simbol",selectedCard_Simbol);
        card.setAttribute("tingkatan",selectedCard_tingkatan);

        card.innerHTML="<div class='top-left-card'>"+
        "<div class='card-value'>"+selectedCard_alphanum+"</div>"+
        "<div class='"+cardKind+"'>"+selectedCard_Simbol+"</div>"+
    "</div>"+
    "<div class='center-card'>"+
        "<div class='card-value'>"+selectedCard_alphanum+"</div>"+
        "<div class='"+cardKind+"'>"+selectedCard_Simbol+"</div>"+
    "</div>";            

    }, time+=500);    

    setTimeout(() => {
        gameProcess2(cekPemenang);
    }, time+=500);

    // 

}

function gameProcess2(cekPemenang){

    var time = 0;
    if(cekPemenang){

        console.log("menang");
        return notifMaker("over");

    }else{

        console.log("belum menang");
        
        if(turnKind==1){

            setTimeout(() => {

                turnKind = 2;

                if(gameTurn==0){
                    notifMaker(1);
                    gameTurn = 1;
                }else{
                    notifMaker(0);
                    gameTurn = 0;
                }
            
            }, time+=500);

            openCardAlphanum = selectedCard_alphanum;
            openCardSimbol = selectedCard_Simbol;
            openCardTingkatan = selectedCard_tingkatan;

        }else{ //TURN KIND 2

            turnKind=1;

            if(parseInt(openCardTingkatan)>parseInt(selectedCard_tingkatan)){

                console.log("GAME TURN GANTI");
                console.log(openCardTingkatan+">"+selectedCard_tingkatan);

                setTimeout(() => {
                    if(gameTurn==0){
                        notifMaker(1);
                        gameTurn = 1;
                    }else{
                        notifMaker(0);
                        gameTurn = 0;
                    }
                }, time+=500);

            }else{

                console.log("GAME TURN TETAP");
                console.log(openCardTingkatan+"<="+selectedCard_tingkatan);
                
                setTimeout(() => {
                    notifMaker(gameTurn);
                }, time+=500);

            }

            openCardAlphanum = "";
            openCardSimbol = "";
            openCardTingkatan = "";

            setTimeout(() => {
                var cardOpen = document.getElementsByClassName("open-card");
                for(var i=0;i<cardOpen.length;i++){
                    if(i>0){
                        cardOpen[i].classList.add("buang-kartu");
                    }
                }
            }, time+=500); 

        }
    }

    setTimeout(() => {
        play();
    }, time+=500);

}

function gameOver(){
    var comA = deckTop.getElementsByClassName("card").length;
    var pemB = deckBottom.getElementsByClassName("card").length;

    if(comA==0||pemB==0){
        return true;
    }

    return false;
}

function serveCard(){
    var time = 0;

    //BAGIKAN KARTU ANTARA PEMAIN DAN KOMPUTER
    for(var z = 0;z<player.length;z++){
        var card = "";
        card = document.createElement("div");
        card.classList.add("card-none");
        card.style.backgroundColor="transparent";
        card.style.width="80px";
        if(z==0){
            deckBottom.appendChild(card);
        }else{
            deckTop.appendChild(card);
        }
        for(var i = 0;i<servingDeck;i++){
            setTimeout(() => {
                createCard();
            }, time);
            time += 500;
        }
    } 

    //MEMBUAT KARTU TERBUKA
    setTimeout(() => {
        createOpenCard();
    }, time += 500);

    //NOTIFIKASI
    setTimeout(() => {
        notifMaker(2);
        sortingCard();
    }, time += 1400);
}

function createCard(){
    var randomNum = Math.floor(Math.random()*theCard.length);

    var card = "";
    card = document.createElement("div");
    card.classList.add("card");
    card.style.marginLeft="-80px";

    card.setAttribute("arrayId",randomNum);
    card.setAttribute("id",Math.random().toString(36).slice(2));
    card.setAttribute("alphanum",theCard[randomNum][0]);
    card.setAttribute("simbol",theCard[randomNum][1]);
    card.setAttribute("tingkatan",theCard[randomNum][2]);

    cardKind = "card-kind";
    if(theCard[randomNum][1]=="♦"||theCard[randomNum][1]=="♥"){
        cardKind="card-kind-red";
    }

    if(deckBottom.getElementsByClassName("card").length<servingDeck){ //KARTU PEMAIN

        card.classList.add("roll-in-blurred-left");

        card.innerHTML = "<div class='top-left-card'>"+
                         "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
                            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
                        "</div>"+
                        "<div class='center-card'>"+
                            "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
                            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
                        "</div>";
    
        deckBottom.appendChild(card);

        card.addEventListener("click",function(){
            clickCard(card);
        });

    }else{

        card.classList.add("roll-in-blurred-right");

        card.innerHTML = "<div class='cover'></div>";
        
        deckTop.appendChild(card);
    }

    theCard.splice(randomNum,1);
    
}

function createOpenCard() {

    closeDeck.classList.add("to-right");

    setTimeout(() => {
        var card = "";
        card = document.createElement("div");
        card.classList.add("close-card");
        card.style.marginLeft="-124px";
        card.innerHTML="<div class='cover'></div>";
        closeDeck.appendChild(card);
    }, 400);

    setTimeout(() => {
        var randomNum = Math.floor(Math.random()*theCard.length);
        card = "";
        card = document.createElement("div");
        card.classList.add("open-card");
        card.style.marginLeft="-124px";
        card.innerHTML="<div class='cover'></div>";
        openDeck.appendChild(card);

        setTimeout(() => {

            card.classList.add("flip");
            card.innerHTML="";
            cardKind="card-kind";
            if(theCard[randomNum][1]=="♦"||theCard[randomNum][1]=="♥"){
                cardKind="card-kind-red";
            }

            card.setAttribute("arrayId",randomNum);
            card.setAttribute("id",Math.random().toString(36).slice(2));
            card.setAttribute("alphanum",theCard[randomNum][0]);
            card.setAttribute("simbol",theCard[randomNum][1]);
            card.setAttribute("tingkatan",theCard[randomNum][2]);

            openCardAlphanum = theCard[randomNum][0];
            openCardSimbol = theCard[randomNum][1];
            openCardTingkatan = theCard[randomNum][2];

            card.innerHTML="<div class='top-left-card'>"+
            "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
        "</div>"+
        "<div class='center-card'>"+
            "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
        "</div>";

        theCard.splice(randomNum,1);

        }, 800);

    }, 100);
}

//FUNGSI UNTUK MEMBERIKAN NOTIFIKASI TENTANG GILIRAN SIAPA
function notifMaker(mode){

    //HAPUS SEGALA JENIS CLASS ANIMASI PADA ELEMEN NOTIF
    notif.classList.remove("fade-out-left");

    //TAMPILKAN NOTIF
    notif.style.display="block";

    //MEMBERIKAN ANIMASI PADA NOTIF
    notif.classList.add("fade-in-right");
    notifText.classList.add("slide-in-blurred-left");

    if(mode=="over"){

        notifText.innerHTML="<div>"+player[gameTurn][0]+" Menang</div>";
        notifReset.style.display="block";

    }else{

        
        //MENENTUKAN GILIRAN SIAPA
        gameTurn = mode;

        //JIKA MODE ADALAH 2 MAKA GILIRAN AKAN DILAKUKAN SECARA ACAK
        if(mode==2){
            mode = Math.floor(Math.random()*player.length);
        }

        //MEMBERIKAN TEXT PADA NOTIF SESUAI DENGAN GILIRAN YANG TELAH DITENTUKAN
        // notifText.innerHTML="<div>"+player[mode][1]+"</div><div>Game Turn : "+gameTurn+"</div><div>Turn Kind : "+turnKind+"</div>";
        notifText.innerHTML="<div>"+player[mode][1]+"</div>";

        setTimeout(() => {

            //HAPUS CLASS ANIMASI SEBELUMNYA
            notif.classList.remove("fade-in-right");

            //HAPUS CLASS ANIMASI SEBELUMNYA
            notifText.classList.remove("slide-in-blurred-left");

            //TAMBAHKAN CLASS ANIMASI FADE OUT
            notif.classList.add("fade-out-left");

        }, 1200);

    }

}

//FUNGSI KETIKA MENARIK KARTU DARI DECK KARTU TERTUTUP
function takeCloseDeck(id,gameTurn){
    //CHECK SISA KARTU CLOSE DECK
    if(theCard.length==0){
        //RESET DECK KEMBALI
        resetCloseDeck();
    }

    //SET WAKTU UNTUK TIMER
    var time = 0;

    //JIKA ID DAN GAMETURN GK SAMA MAKA GK BISA DIJALANKAN
    if(id!=gameTurn){
        return false;
    }

    //BUAT KARTU DARI DECK TERTUTUP DENGAN ANIMASI BERGERAK KE KANAN
    var card = "";
    card = document.createElement("div");
    card.classList.add("close-card");
    card.style.marginLeft="-124px";
    card.innerHTML="<div class='cover'></div>";
    closeDeck.appendChild(card);
    card.classList.add("slide-out-blurred-right");

    //HAPUS KARTU YANG TELAH DIBUAT TADI
    setTimeout(() => {
        card.remove();
    }, time+=500);

    //BUAT KARTU UNTUK DECK PEMAIN/KOMPUTER
    setTimeout(() => {

        //MENENTUKAN KARTU YANG AKAN DIKELUARKAN DARI ARRAY
        var randomNum = Math.floor(Math.random()*theCard.length);

        //MEMBUAT NODE KARTU
        card = "";
        card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("roll-in-blurred-right");
        card.style.marginLeft="-80px";

        //MEMBUAT WARNA PADA MASING2 SIMBOL
        cardKind = "card-kind";
        if(theCard[randomNum][1]=="♦"||theCard[randomNum][1]=="♥"){
            cardKind="card-kind-red";
        }

        //MEMBUAT ATRIBUT UNTUK KARTU SUPAYA MUDAH DIKENALI DAN DIOLAH DATANYA
        card.setAttribute("arrayId",randomNum);
        card.setAttribute("id",Math.random().toString(36).slice(2));
        card.setAttribute("alphanum",theCard[randomNum][0]);
        card.setAttribute("simbol",theCard[randomNum][1]);
        card.setAttribute("tingkatan",theCard[randomNum][2]);

    //JIKA PEMROSES ADALAH PEMAIN
    if(id==0){

        //ISI KARTU DENGAN DATA BERIKUT
        card.innerHTML = "<div class='top-left-card'>"+
                            "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
                            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
                        "</div>"+
                        "<div class='center-card'>"+
                            "<div class='card-value'>"+theCard[randomNum][0]+"</div>"+
                            "<div class='"+cardKind+"'>"+theCard[randomNum][1]+"</div>"+
                        "</div>";

        //TAMBAHKAN KARTU PADA ELEMEN DECK
        deckBottom.appendChild(card);

        //PENAMBAHAN FUNGSI CLICK AGAR BISA DISELEKSI OLEH PEMAIN
        card.addEventListener("click",function(){
            clickCard(card);
        });

        sortingCard();

    //JIKA PEMROSES ADALAH KOMPUTER
    }else{

        //ISI KARTU DENGAN DATA BERIKUT
        card.innerHTML = "<div class='cover'></div>";
        
        //TAMBAHKAN KARTU PADA ELEMEN DECK
        deckTop.appendChild(card);

    }

    //HAPUS DATA YANG DIKELUARKAN DARI ARRAY AGAR TIDAK BISA DIPILIH LAGI
    theCard.splice(randomNum,1);

    }, time+=500);
}

function sortingCard(){
    var order = 1;
    var sort = deckBottom.getElementsByClassName("card");
    var arraySimbol = [
        "♦","♣","♥","♠"
    ];
    for(var a = 0;a<arraySimbol.length;a++){
        for(var i = 2;i<=14;i++){
            Object.keys(sort).forEach(element => {
                var simbol = sort[element].getAttribute("simbol");
                var tingkatan = sort[element].getAttribute("tingkatan");
                    if(arraySimbol[a]==simbol){
                        if(tingkatan==i){
                            sort[element].style.order=order;
                            sort[element].style.zIndex=order;
                            order++;
                        }
                    }      
            });
        }
    }
}

function resetCloseDeck(){
    var id;
    var num = 0;
    var array = [];
    theCard = [];
    theCard = [["A","♠",14],[2,"♠",2],[3,"♠",3],[4,"♠",4],[5,"♠",5],[6,"♠",6],
        [7,"♠",7],[8,"♠",8],[9,"♠",9],[10,"♠",10],["J","♠",11],["Q","♠",12],
        ["K","♠",13],["A","♥",14],[2,"♥",2],[3,"♥",3],[4,"♥",4],[5,"♥",5],[6,"♥",6],
        [7,"♥",7],[8,"♥",8],[9,"♥",9],[10,"♥",10],["J","♥",11],["Q","♥",12],
        ["K","♥",13],["A","♦",14],[2,"♦",2],[3,"♦",3],[4,"♦",4],[5,"♦",5],[6,"♦",6],
        [7,"♦",7],[8,"♦",8],[9,"♦",9],[10,"♦",10],["J","♦",11],["Q","♦",12],["K","♦",13],
        ["A","♣",14],[2,"♣",2],[3,"♣",3],[4,"♣",4],[5,"♣",5],[6,"♣",6],[7,"♣",7],
        [8,"♣",8],[9,"♣",9],[10,"♣",10],["J","♣",11],["Q","♣",12],["K","♣",13],
    ];

    var deckB = deckBottom.getElementsByClassName("card");
    var deckT = deckTop.getElementsByClassName("card");
    var deckO = openDeck.getElementsByClassName("card");

    Object.keys(deckB).forEach(element => {
        id = deckB[element].getAttribute("arrayId");
        array[num] = id;
        num++;
    });

    Object.keys(deckT).forEach(element => {
        id = deckT[element].getAttribute("arrayId");
        array[num] = id;
        num++;
    });

    array[num] = deckO[deckO.length-1];

    for(var i = 0;i<array.length;i++){
        theCard.splice(array[i],1);
    }

    console.log("Reset Deck Berhasil");

}

//PIKIRAN KOMPUTER
function comMind(){

    //AMBIL DATA SIMBOL DARI DECK KARTU KOMPUTER
    var daftarSimbol = comMindCollectingSymbol();

    //AMBIL DATA ALPHANUM DARI DECK KARTU KOMPUTER
    var daftarAlpha = comMindCollectingAlpha();

    //JIKA DATA SIMBOL DAN ALPHANUM TIDAK ADA
    if(daftarSimbol.length==0&&daftarAlpha==0){

        //AMBIL KARTU DARI DECK KARTU TERTUTUP
        takeCloseDeck(1,gameTurn);

        setTimeout(() => {
            //CEK ULANG DATA
            play();

        }, 1000);

    //JIKA DATA SIMBOL ATAU ALPHANUM TERSEDIA
    }else{

        //JIKA DATA SIMBOL TERSEDIA
        if(daftarSimbol!=0){

            //AMBIL SALAH SATU DATA SIMBOL SECARA ACAK
            var random = Math.floor(Math.random()*daftarSimbol.length);

            //SELEKSI ELEMEN BERDASARKAN ID YANG TELAH DIAMBIL
            var comSelectElement = document.getElementById(daftarSimbol[random]);

            setTimeout(() => {
                //KELUARKAN KARTU 
                gameProcess(comSelectElement);
            }, 1000);

        //JIKA DATA SIMBOL TIDAK TERSEDIA
        }else{

            //AMBIL SALAH SATU DATA ALPHANUM SECARA ACAK
            var random = Math.floor(Math.random()*daftarAlpha.length);

            //SELEKSI ELEMEN BERDASARKAN ID YANG TELAH DIAMBIL
            var comSelectElement = document.getElementById(daftarAlpha[random]);

            setTimeout(() => {
                //KELUARKAN KARTU
                gameProcess(comSelectElement);
            }, 1000);

        }

    }


}

//FUNGSI DARI KOMPUTER UNTUK KOLEK DATA SIMBOL
function comMindCollectingSymbol(){
    var s = 0;
    var SimbolSame = [];

    Object.keys(comCard).forEach(element => {

        //AMBIL DATA DARI ATRIBUT SIMBOL DARI ELEMEN
        var select_simbol = comCard[element].getAttribute("simbol");

        //JIKA OPEN CARD NULL
        if(openCardSimbol==""){
            SimbolSame[s] = comCard[element].getAttribute("id");
            s++;
        }

        //JIKA SIMBOL SAMA DENGAN SIMBOL DARI KARTU YANG DIBUKA
        if(select_simbol==openCardSimbol){

            //MASUKKAN DATA ID KEDALAM ARRAY
            SimbolSame[s] = comCard[element].getAttribute("id");
            s++;
        }
    });

    return SimbolSame;
}

//FUNGSI DARI KOMPUTER UNTUK KOLEK DATA ALPHANUM
function comMindCollectingAlpha(){
    var a = 0;
    var alphanumSame = [];
    
    Object.keys(comCard).forEach(element => {

        //AMBIL DATA DARI ATRIBUT ALPHANUM DARI ELEMEN
        var select_alphanum = comCard[element].getAttribute("alphanum");

        //JIKA OPEN CARD NULL
        if(openCardAlphanum==""){
            alphanumSame[a] = comCard[element].getAttribute("id");
            a++;
        }

        //JIKA ALPHANUM SAMA DENGAN ALPHANUM DARI KARTU YANG DIBUKA
        if(select_alphanum==openCardAlphanum){

            //MASUKKAN DATA ID KEDALAM ARRAY
            alphanumSame[a] = comCard[element].getAttribute("id");
            a++;
        }
    });

    return alphanumSame;
}

// function resetGame(){

//     turnKind = 1;
//     cekPemenang = false;
//     card,
//     serveTurn,
//     cardKind,
//     gameTurn,
//     beforeCardSimbol,
//     beforeCardTingkatan,
//     beforeCardAlphanum,
//     openCardSimbol,
//     openCardTingkatan,
//     openCardAlphanum,
//     selectedCard_alphanum,
//     selectedCard_Simbol,
//     selectedCard_arrayId,
//     selectedCard_tingkatan;

//     theCard = [
//         ["A","♠",14],
//         [2,"♠",2],
//         [3,"♠",3],
//         [4,"♠",4],
//         [5,"♠",5],
//         [6,"♠",6],
//         [7,"♠",7],
//         [8,"♠",8],
//         [9,"♠",9],
//         [10,"♠",10],
//         ["J","♠",11],
//         ["Q","♠",12],
//         ["K","♠",13],
//         ["A","♥",14],
//         [2,"♥",2],
//         [3,"♥",3],
//         [4,"♥",4],
//         [5,"♥",5],
//         [6,"♥",6],
//         [7,"♥",7],
//         [8,"♥",8],
//         [9,"♥",9],
//         [10,"♥",10],
//         ["J","♥",11],
//         ["Q","♥",12],
//         ["K","♥",13],
//         ["A","♦",14],
//         [2,"♦",2],
//         [3,"♦",3],
//         [4,"♦",4],
//         [5,"♦",5],
//         [6,"♦",6],
//         [7,"♦",7],
//         [8,"♦",8],
//         [9,"♦",9],
//         [10,"♦",10],
//         ["J","♦",11],
//         ["Q","♦",12],
//         ["K","♦",13],
//         ["A","♣",14],
//         [2,"♣",2],
//         [3,"♣",3],
//         [4,"♣",4],
//         [5,"♣",5],
//         [6,"♣",6],
//         [7,"♣",7],
//         [8,"♣",8],
//         [9,"♣",9],
//         [10,"♣",10],
//         ["J","♣",11],
//         ["Q","♣",12],
//         ["K","♣",13],
//     ];

//     deckTop.innerHTML="";
//     deckTop.innerHTML="";

//     notif.style.display="none";

//     serveCard();
//     play();

// }