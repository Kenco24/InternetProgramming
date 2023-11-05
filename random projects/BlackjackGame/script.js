document.addEventListener("DOMContentLoaded", () => {

var playerScore=0;
var dealerScore=0;
var deckid="";

const  fetchDeckId = async() => {
  try {
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', { method: "GET" });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    deckid = data.deck_id;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




const cardValueMap = {
  '2' : 2,
  '3' : 3,
  '4' : 4,
  '5' : 5,
  '6' : 6,
  '7' : 7,
  '8' : 8,
  '9' : 9,
  '0' : 10,
  'J' : 10,
  'Q' : 10,
  'K': 10,
  'A' : 11
}

let dealerCards=[]
let playerCards=[]
let dealerValue=0;
let playerValue=0;

const sliceCardValue=(val) =>{
   
      return val.slice(0,1);
    
};

const getSum=(hand)=>{
    
    return hand.map(card=>cardValueMap[card]).reduce((sum,value)=>sum+value,0);
};

const restOfGame = () => {
  document.getElementById("hitBtn").addEventListener("click", hitFunc);
  document.getElementById("standBtn").addEventListener("click", standFunc); 
}


const hitFunc = async () =>
{ 

    const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`;
    const response = await fetch(url,{method:"GET"});
    const data = await response.json();
    const resultHead=document.getElementById("resultHeader");
    const hitButton=document.getElementById("hitBtn");
    const standButton=document.getElementById("standBtn");

    const playerHand=document.getElementById("playerHand");
    const playerValue=document.getElementById("playerValue");

    console.log(data);
    const cardCode = sliceCardValue(data.cards[0].code)
    playerCards.push(sliceCardValue(cardCode));

  
    const img = document.createElement("img");
    img.src=data.cards[0].image;
    playerHand.appendChild(img);
    playerValue.innerHTML=`Value : ${getSum(playerCards)}`;
    playerScore=getSum(playerCards);
   

    console.log(getSum(playerCards));
    console.log(playerScore);

    if (playerScore > 21) {
      hitButton.style.display = "none";
      standButton.style.display = "none";
      resultHead.innerText = "BUST, DEALER WINS!";
      alert("Refresh the website to restart! GG");
      
  } else if (playerScore === 21) {
      hitButton.style.display = "none";
      standButton.style.display = "none";
      resultHead.innerText = "BLACKJACK PLAYER WINS!";
      alert("Refresh the website to restart! GG");
  }
  
    
    
}
const standFunc =async () =>
{
    const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`;
    const response = await fetch(url,{method:"GET"});
    const data = await response.json();
    const dealerHand=document.getElementById("dealerHand");
    const dealerValue=document.getElementById("dealerValue");
    const resultHead=document.getElementById("resultHeader");
    const hitButton=document.getElementById("hitBtn");
    const standButton=document.getElementById("standBtn");

    const playerHand=document.getElementById("dealerHand");
    const playerValue=document.getElementById("dealerValue");
    console.log(data);
    const cardCode = sliceCardValue(data.cards[0].code)
    dealerCards.push(sliceCardValue(cardCode))
    dealerScore=getSum(dealerCards);

    const img = document.createElement("img");
    img.src=data.cards[0].image;
    dealerHand.appendChild(img);
    dealerValue.innerHTML=`Value : ${getSum(dealerCards)}`;
    dealerScore=getSum(dealerCards);
    console.log(dealerScore);

    console.log(dealerCards);
    console.log("Dealer"+getSum(dealerCards));
    console.log("Player"+getSum(playerCards));
    console.log("Player score "+ playerScore)
    console.log("Dealer score "+ dealerScore)
    if(dealerScore>21)
    {
      resultHead.innerText = "PLAYER WINS!";
      alert("Refresh the website to restart! GG");
      
    }
    if (dealerScore===21)
    {   
        if(dealerCards==playerScore)
        {
          resultHead.innerText = "BOTH DEALER AND PLAYER GOT BLACKJACK!";
          alert("Refresh the website to restart! GG");
        }
        else
        {
          resultHead.innerText = "DEALER BLACKJACK WINS!";
          alert("Refresh the website to restart! GG");
        }
    }
    if (dealerScore>playerScore && dealerScore<21)
    {
      resultHead.innerText = "DEALER WINS!";
      alert("Refresh the website to restart! GG");
    }
  
   

}




const firstDraw = async () =>
{ await fetchDeckId();
  const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
  const response = await fetch(url,{method : "GET"});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  

  const dealerHand=document.getElementById("dealerHand");
  const playerHand=document.getElementById("playerHand");
  const dealerValue=document.getElementById("dealerValue");
  const playerValue=document.getElementById("playerValue");

  const data = await response.json();

  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");
    const card = data.cards[i];
    const cardCode = sliceCardValue(card.code)
    
    if (i % 2 === 0) {
      

      playerCards.push(cardCode);
      img.src = card.image;
      playerHand.appendChild(img);
    } else {
     

      dealerCards.push(cardCode);
      img.src = card.image;
      dealerHand.appendChild(img);
    }
  }

  console.log(dealerCards);
  console.log(getSum(dealerCards));
  dealerValue.innerHTML=`Value : ${getSum(dealerCards)}`;
  dealerScore=getSum(playerCards);

  console.log(playerCards);
  console.log(getSum(playerCards));
  playerValue.innerHTML=`Value : ${getSum(playerCards)}`;
  playerScore=getSum(playerCards);


  restOfGame();

}

firstDraw();



});




