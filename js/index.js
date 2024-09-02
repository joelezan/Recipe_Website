
function getData(){
    fetch ('https://api.sampleapis.com/recipes/recipes')
        .then(response =>{
            if (!response.ok){
            throw new Error(response.status);
            }
            return response.json()

        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('An error ocurred:',error);
        })
    
}

getData();