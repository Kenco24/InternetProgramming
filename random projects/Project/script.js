const pageCode = () => {
 document.getElementById("fetch")?.addEventListener("click",fetchClick);
};

var id="";
const resultDiv=document.getElementById("result");


const fetchClick =  async () =>{

    var result =confirm("Are you sure u want to fetch?")
    
    if (result === true)
    {
        
        const url= 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        const response = await fetch(url, {method : "GET"});
    
    
        if (!response.ok)
        {
            resultDiv.innerHTML="error";
            return;
        }
    
        const data= await response.json();
        id=data.deck_id;
        const output= `id: ${data.deck_id}, amount of cards ${data.remaining}`;
        resultDiv.innerHTML=output;
    }
    else 
    {
        alert("You clicked 'No' or closed the dialog.");

   
}
}


const drawCard = async () =>
{
    
        if(id)
        {

            const drawDiv=document.getElementById("drawdiv");
            const url= `https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=1`;
            const cardNamePar=document.getElementById("cardname");
            console.log(url);
            const response = await fetch(url, {method : "GET"});
            const img = document.getElementById("cardImg");
            if (!response.ok)
            {
                resultDiv.innerHTML="error";
                return;
            }
            const data= await response.json();
            console.log(data.cards[0].image);
            img.src=data.cards[0].image;
            const res=`${data.cards[0].value} of ${data.cards[0].suit}`;
            cardNamePar.innerHTML=res;

          
            
        }
        else 
        {
            alert("You must fetch a deck first!");
        }
       
        

        


}

document.getElementById("drawcard").addEventListener("click",drawCard);

document.addEventListener("DOMContentLoaded", pageCode);