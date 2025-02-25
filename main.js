const title = document.querySelectorAll(".title")[0];
const bottom = document.querySelectorAll(".bottom")[0];
const type = document.querySelectorAll(".type")[0];
const desc = document.querySelectorAll(".desc")[0];
const chaos = document.querySelectorAll(".chaos")[0];
const back = document.querySelector("main");
let indexes = [];
let trash = [];



let data;
fetch("data.json").then(res=>res.json()).then(x => {
    main(x);
});

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


function addCards(length){

    for(let i = 0; i < length; i++){
        indexes.push(i);
    }
}



function showCard(data, new_index) {
    title.innerHTML = data.cards[new_index][0];
    type.innerHTML = data.cards[new_index][1];
    desc.innerHTML = data.cards[new_index][2];
    chaos.innerHTML = data.cards[new_index][3];
    back.style.backgroundImage = "url('img/"+ data.cards[new_index][4] + "')";
}

function main(data) {
    const numberOfCards = data.cards.length;
    addCards(numberOfCards)
    shuffle(indexes);
    if(indexes.length == 0){
        addCards(numberOfCards);
        shuffle(indexes);
    }

    const new_index = indexes.pop();
    trash.push(new_index);
    showCard(data, new_index)

    bottom.addEventListener("click", ()=>{
        if(indexes.length == 0){
            addCards(numberOfCards);
            shuffle(indexes);
        }

        const new_index = indexes.pop();
        trash.push(new_index);
        showCard(data, new_index)
    })

    title.addEventListener("click", ()=>{
        if(trash.length != 0){
            recovered_index = trash.pop()
            showCard(data, recovered_index)
        }
    })
}