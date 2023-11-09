document.addEventListener("DOMContentLoaded", SiteCode);



async function SiteCode()
{
  const hitbutton=document.getElementById("hitBtn")
  hitbutton.addEventListener("click", hitFunc);

  const standbutton=document.getElementById("standBtn")
  standbutton.addEventListener("click", standFunc); 

  const restartbutton=document.getElementById("restartBtn")
  restartbutton.addEventListener('click',restartFunc);

  firstDraw();
}
var playerScore=0;
var dealerScore=0;
var deckid="";

const  fetchDeckId = async() => {
  try {
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2', { method: "GET" });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    deckid = data.deck_id;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const fetchCard = async (number) =>{

     
  const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=${number}`;
  const response = await fetch(url,{method:"GET"});
  const data = await response.json();

  return data;

  }




const cardValueMap = {
  'A' : 1,
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
  
}

let dealerCards=[]
let playerCards=[]
let dealerValue=0;
let playerValue=0;

const sliceCardValue=(val) =>{
   
      return val.slice(0,1);
    
};

const getSum = (cards) => {
  if (Array.isArray(cards)) {
    let totalValue = cards.map((card) => cardValueMap[card]).reduce((sum, value) => sum + value, 0);
    let numAces = cards.filter((card) => card === 'Ace').length;

    // Check if there are Aces in the hand and the total value is less than or equal to 11
    while (numAces > 0 && totalValue <= 11) {
      totalValue += 10; // Add 10 to the total value for the Ace (making it count as 11)
      numAces--; // Reduce the count of Aces
    }

    return totalValue;
  } else {
    return cardValueMap[cards] || 0;
  }
}





const hitFunc = async () =>
{ 
    
    const data = await fetchCard(1);

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
      
        showhiddenCard();
        showResult("PLAYER BUST, DEALER WINS!");
        gameover=true;
      
    

      
  } else if (playerScore === 21) {
       
       standFunc();
        
       
    
  }
  
  if(gameover)
      {
        const restartbtn=document.getElementById("restartBtn");
        restartbtn.style.display="block";


        
      }
    
    
}



const showResult = (text) =>{
  const resultHead=document.getElementById("resultHeader");
  const hitButton=document.getElementById("hitBtn");
  const standButton=document.getElementById("standBtn");
  hitButton.style.display = "none";
  standButton.style.display = "none";
  resultHead.innerText = text;
}

const restartFunc = () =>
{
  i=0;
  document.getElementById("playerHand").innerHTML="";
  document.getElementById("dealerHand").innerHTML="";
  dealerCards=[]
  playerCards=[]
  tempimg=[];
  
  document.getElementById("resultHeader").innerHTML="";
  document.getElementById("restartBtn").style.display="none";
  document.getElementById("hitBtn").style.display = "block";
  document.getElementById("standBtn").style.display = "block";
  
  firstDraw();
  
}

const showhiddenCard= ()=>
{
    const dealerHand=document.getElementById("dealerHand");
    const dealerValue=document.getElementById("dealerValue");

    console.log("Stand button clicked!")
    console.log(tempimg);
    dealerHand.innerHTML="";
    const img1=document.createElement("img");
    img1.src=tempimg[0];
    const img2=document.createElement("img");
    img2.src=tempimg[1];
    dealerHand.appendChild(img1);
    dealerHand.appendChild(img2);
    
    document.getElementById("dealerValue").innerHTML=`Value : ${getSum(dealerCards)}`;;
}

let tempimg = [];
let gameover=false;
let i=0;
const standFunc =async () =>
{   
 
    const data = await fetchCard(1);


    if(i===0)
    {
      showhiddenCard();
      i++;
    }
    

  

    
    console.log(dealerCards);
    console.log("Dealer"+getSum(dealerCards));
    console.log("Player"+getSum(playerCards));
    console.log("Player score "+ playerScore)
    console.log("Dealer score "+ dealerScore)


    if(dealerScore<=16)
    {
        
        
   
        console.log(data);
          
        const cardCode = sliceCardValue(data.cards[0].code)
        dealerCards.push(sliceCardValue(cardCode))
        dealerScore=getSum(dealerCards);
        console.log(data.cards.image);
    
        const img = document.createElement("img");
        img.src=data.cards[0].image;
        console.log(dealerHand);
        dealerHand.appendChild(img);
        dealerScore=getSum(dealerCards);
        console.log(dealerScore);
        dealerValue = document.getElementById("dealerValue"); // Update dealerValue here
        dealerValue.innerHTML = dealerScore;
    
    
        
        standFunc();
    }
    if(dealerScore>21)
    {
      showResult("DEALER BUST,PLAYER WINS");
      gameover=true;
    
      
    }
    if (dealerScore===21)
    {   
        if(dealerScore==playerScore)
        { 
          showResult("BOTH DEALER AND PLAYER GOT BLACKJACK!");
          gameover=true;
        }
          
        else
        {
          
          showResult("DEALER BLACKJACK WINS!");
        
          gameover=true;
        }
    }
    if (dealerScore>playerScore && dealerScore<21)
    {      
            showResult("DEALER WINS!");
            gameover=true;
        
    }
    if (dealerScore===playerScore)
    {
      showResult("TIE!");
      gameover=true;
    }
    if (playerScore>dealerScore)
    {
      if (playerScore===21)
      {
       showResult("BLACKJACK PLAYER WINS!")
      gameover=true;
      }
      else {
       
        showResult("PLAYER WINS!")
      gameover=true;
      }
    }
     
      if(gameover)
      {
        const restartbtn=document.getElementById("restartBtn");
        restartbtn.style.display="block";


        
      }
  
    dealerValue.innerHTML=`Value : ${getSum(dealerCards)}`;
    console.log(dealerCards)
    console.log("Dealer value " +getSum(dealerCards));


}



const firstDraw = async () =>
{ await fetchDeckId();
  const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
  const response = await fetch(url,{method : "GET"});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  
  gameover=false;
  const dealerHand=document.getElementById("dealerHand");
  const playerHand=document.getElementById("playerHand");
  const dealerValue=document.getElementById("dealerValue");
  const playerValue=document.getElementById("playerValue");

 

  const data = await response.json();

  for (let i =0; i < 4; i++) {
    const img = document.createElement("img");
    const card = data.cards[i];
    const cardCode = sliceCardValue(card.code)
    if (i % 2 === 0) {
      

      playerCards.push(cardCode);
      img.src = card.image;
      playerHand.appendChild(img);
    } else {

      if(i===3)
      {
        
        dealerCards.push(cardCode);
        tempimg.push(card.image);
        img.src = "https://andrewthamcc.github.io/blackjack2.0/assets/facedown.png"
        dealerHand.appendChild(img);
      }
      else{
        dealerCards.push(cardCode);
        img.src = card.image;
        tempimg.push(card.image);
        dealerHand.appendChild(img);
      }
     
  
    }
  }
 
  console.log(getSum(dealerCards));
  dealerValue.innerHTML=`Value : ${getSum(dealerCards[0])}`;
  dealerScore=getSum(dealerCards);

  console.log(playerCards);
  console.log(getSum(playerCards));
  playerValue.innerHTML=`Value : ${getSum(playerCards)}`;
  playerScore=getSum(playerCards);



}







