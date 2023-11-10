document.addEventListener("DOMContentLoaded", SiteCode);



//function thats called after site is loaded
async function SiteCode()
{
  // declaring event listeners for the used buttons
  const hitbutton=document.getElementById("hitBtn")
  hitbutton.addEventListener("click", hitFunc);      

  const standbutton=document.getElementById("standBtn")
  standbutton.addEventListener("click", standFunc); 

  const restartbutton=document.getElementById("restartBtn")
  restartbutton.addEventListener('click',restartFunc);

  firstDraw();
}

// initializing scores and the deckid that is needed for drawing cards later
var playerScore=0;
var dealerScore=0;
var deckid="";


// This fetches a 2 decks equaling about 100 cards and sets the deckid
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

// function to fetch cards depending on the number 
const fetchCard = async (number) =>{

  const url = `https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=${number}`;
  const response = await fetch(url,{method:"GET"});
  const data = await response.json();

  return data;

  }



// map of card values 
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


//initializing Values and cards(which we will need to calculate the score)
let dealerCards=[]
let playerCards=[]
let dealerValue=0;
let playerValue=0;


// Function to extract first part of the card because the json file has declared cards like for example "AC" -ace of clubs or "8D" 8 of diamonds. We will use the return value  for the map 
const sliceCardValue=(val) =>{
   
      return val.slice(0,1);
    
};


// calculates what your score is with the use of the cardValueMap and also calculates whether your Ace card will count as a 1 or 10
const getSum = (cards) => {
  if (Array.isArray(cards)) {
    let totalValue = cards.map((card) => cardValueMap[card]).reduce((sum, value) => sum + value, 0);
    let numAces = cards.filter((card) => card === 'A').length;

    while (numAces > 0 && totalValue <= 11) {
      totalValue += 10; 
      numAces--; 
    }

    return totalValue;
  } else {
    return cardValueMap[cards] || 0;
  }
}




//This function will be called when we click the Hit Button
const hitFunc = async () => {

  //fetching/drawing a card
  const data = await fetchCard(1);

  //PlayerHand is where the images are displayed 
  const playerHand = document.getElementById("playerHand");
  const playerValue = document.getElementById("playerValue");
  const hitbutton = document.getElementById("hitBtn");
  const standbutton = document.getElementById("standBtn");


  
    hitbutton.style.display="none";
    standbutton.style.display="none";

  //cardCode is sliced card value for example "8" from "8D"
  const cardCode = sliceCardValue(data.cards[0].code);
  playerCards.push(sliceCardValue(cardCode));   // we push them here so we can calculate the score/value later

  const img = document.createElement("img");  // creating the images and adding them to HTML
 
    playerHand.appendChild(img);
   
    img.src = data.cards[0].image;
      
     animateCard(img, 500).then(async () => {    
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 500 milliseconds (adjust as needed)
      playerValue.innerHTML = `Value : ${getSum(playerCards)}`;  // sets HTML Value to the sum of playercards
      playerScore = getSum(playerCards);  //adds it to the playerscore to calc who wins etc.
      if (playerScore > 21) {    
        showhiddenCard();   //If player busts the hiddencard for dealer is shown
        showResult("PLAYER BUST, DEALER WINS!");  
        gameover = true; 
      } else if (playerScore === 21) {
        showResult('');
        standFunc();   // if player gets blackjack we automatically stand and see what dealer has
      }
    
      if (gameover) {

        const restartbtn = document.getElementById("restartBtn");
        restartbtn.style.display = "block";
        // when the round ends we display a restart button
      }
    
    });
    

    if(!gameover)
    {
      setTimeout(() => {
        hitbutton.style.display="block";
        standbutton.style.display="block";
        
      }, 2000);
    }
   
  

  
  console.log(getSum(playerCards));
  console.log(playerScore);
};


// this function displays the text inputed and sets displays of buttons to none.
const showResult = (text) =>{
  const resultHead=document.getElementById("resultHeader");
  const hitButton=document.getElementById("hitBtn");
  const standButton=document.getElementById("standBtn");

  const playerValue=document.getElementById("playerValue");
  playerValue.innerHTML = `Value : ${getSum(playerCards)}`
  const dealerValue=document.getElementById("dealerValue");
  dealerValue.innerHTML = `Value : ${getSum(dealerCards)}`
  hitButton.style.display = "none";
  standButton.style.display = "none";
  resultHead.innerText = text;
}

//When the gamer is over a restart button is displayed which when clicked calls this fucntion. What this function does is reset everything like it was at the start. Then calls first draw
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


//Function to show hidden card
const showhiddenCard= async ()=>
{
    const dealerHand=document.getElementById("dealerHand");
    const dealerValue=document.getElementById("dealerValue");

    console.log("Stand button clicked!")  //test purpose
    console.log(tempimg); //test
    dealerHand.innerHTML="";   //clears the previous 2 cards 
    const img1=document.createElement("img"); //creating img element
    img1.src=tempimg[0]; // we stored the actual images pulled into this tempimg array one which we are going to after hit/stand was called.
    const img2=document.createElement("img"); //creating img element
    img2.src=tempimg[1]; // same thing as above
    dealerHand.appendChild(img1);  // we add the images to the div DealerHand
    dealerHand.appendChild(img2);
    await animateCard(img2);  //aniamtion of card
    
    setTimeout(async () => {    dealerValue.innerHTML=`Value : ${getSum(dealerCards)}`;},1000);  //setting a delay to show after 1s becuase of card animation

} 

let tempimg = [];  //declaring empty array for tempimg
let gameover=false;  //declaring boolean for gameover
let i=0; //casual int i declaration
let animateTime=500;



// function for animating card 
async function animateCard(cardElement,time) {
  cardElement.classList.add("card-animation");
  setTimeout(() => {
      cardElement.style.transform = "scale(1)";  
  }, time); 
}

//this function is for standing
const standFunc =async () =>
{   
 
  const hitButton=document.getElementById("hitBtn");
  const standButton=document.getElementById("standBtn");
  hitButton.style.display="none";
  standButton.style.display="none";

    if(i===0)
    {
      showhiddenCard(500);
      i++;
    }
    

  

    
    console.log(dealerCards);
    console.log("Dealer"+getSum(dealerCards));
    console.log("Player"+getSum(playerCards));
    console.log("Player score "+ playerScore)
    console.log("Dealer score "+ dealerScore)


    if (dealerScore <= 16) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await fetchCard(1);

      console.log(data);

      const cardCode = sliceCardValue(data.cards[0].code);
      dealerCards.push(sliceCardValue(cardCode));
      dealerScore = getSum(dealerCards);
      console.log(data.cards.image);

      const img = document.createElement("img");

      img.src = data.cards[0].image;
      dealerHand.appendChild(img);
      animateCard(img,animateTime);
      setTimeout(() => {
        console.log("Dealer Score :" +dealerScore);
      
      dealerValue = document.getElementById("dealerValue");
      }, 1500);
      
      
      standFunc();

 
      };

      setTimeout(async () => {

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
    if (playerScore>dealerScore && dealerScore>16)
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
    

      },1000)
      
     
      



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

  playerValue.innerHTML=`Value :`;
  dealerValue.innerHTML=`Value :`;
 

  const data = await response.json();

  for (let i =0; i < 4; i++) {
    const img = document.createElement("img");
    const card = data.cards[i];
    const cardCode = sliceCardValue(card.code)
    if (i % 2 === 0) {
      
      if(i===2){
        playerCards.push(cardCode);
        img.src = card.image;
        playerHand.appendChild(img);
        await animateCard(img,1500);
        
        setTimeout(() => {
          playerValue.innerHTML=`Value : ${getSum(playerCards)}`;
        }, 2000);
      }
      else{
        playerCards.push(cardCode);
        img.src = card.image;
        playerHand.appendChild(img);
        await animateCard(img,500);
        
        setTimeout(() => {
          playerValue.innerHTML=`Value : ${getSum(playerCards[0])}`;
        }, 2000);
      }
      }
     
      else {

      if(i===3)
      {
        
        dealerCards.push(cardCode);
        tempimg.push(card.image);
        img.src = "https://andrewthamcc.github.io/blackjack2.0/assets/facedown.png";
        dealerHand.appendChild(img);
        await animateCard(img,2000)

        setTimeout(() => {
          dealerValue.innerHTML=`Value : ${getSum(dealerCards[0])}`;
        }, 2000);
     
      }
      else{
        dealerCards.push(cardCode);
        img.src = card.image;
        tempimg.push(card.image);
        dealerHand.appendChild(img);
        await animateCard(img,1000)
        setTimeout(() => {
          dealerValue.innerHTML=`Value : ${getSum(dealerCards[0])}`;
        }, 1000);
      }
     
  
    }
  }
  if (playerScore===21)
  {
    standFunc();
  }
  const hitButton=document.getElementById("hitBtn");
  const standButton=document.getElementById("standBtn");
  setTimeout(() => {
      hitButton.style.display="block";
      standButton.style.display="block";
      
  }, 3000);
  



  dealerScore=getSum(dealerCards);
  playerScore=getSum(playerCards);


 
 



}







