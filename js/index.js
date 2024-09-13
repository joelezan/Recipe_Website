async function getData() {
    try {
        const response = await fetch('https://api.sampleapis.com/recipes/recipes');
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function showRecipes(recipes, selectedTime) {
    const selection = document.getElementById("selection");
    selection.innerHTML = ''; 

    const filteredRecipes = recipes.filter(recipe => {
        if (selectedTime === 'under30') {
            return recipe.totalTime <= 30;
        } else if (selectedTime === '30ormore') {
            return recipe.totalTime > 30;
        } else {
            return true;
        }
    });

    filteredRecipes.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.id;
        option.textContent = recipe.title;
        selection.appendChild(option);
    });
}

function displayRecipeImage(recipeId, recipes) {
    const recipeIdInt = parseInt(recipeId, 10);
    const recipe = recipes.find(r => r.id === recipeIdInt);
    const recipeImages = document.getElementById("recipeImages");

    if (recipe && recipe.photoUrl) {
        recipeImages.innerHTML = `<img src="${recipe.photoUrl}" alt="${recipe.title}" />`;
    } else {
        recipeImages.innerHTML = ''; 
    }
}

let selectedCookingTime = 'notImportant';

getData().then(recipes => {
    showRecipes(recipes, selectedCookingTime);

    const selectedTime = document.querySelector('select[name="cooking_time"]');
    selectedTime.addEventListener('change', function () {
        selectedCookingTime = this.value;
        showRecipes(recipes, selectedCookingTime);
    });

    const selection = document.getElementById("selection");
    selection.addEventListener('change', function () {
        const selectedRecipeId = this.value;
        displayRecipeImage(selectedRecipeId, recipes);
    });
});
