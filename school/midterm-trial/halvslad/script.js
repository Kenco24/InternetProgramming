
(() => {
   
    // Assuming you have a JSON file named 'yourfile.json' in the same directory as your HTML file.
fetch('authors.json')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching the JSON file:', error);
});

    
  })();
  

