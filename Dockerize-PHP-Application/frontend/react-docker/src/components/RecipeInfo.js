import React from 'react';

function RecipeInfo(props) {
    // Destructure the selectedRecipe and setSelectedRecipe props
    const { selectedRecipe, setSelectedRecipe } = props;

    // If there is no selected recipe, return null
    if (!selectedRecipe) {
        return null;
    }

    // Extract the playback ID from the strYoutube property
    let playbackId = selectedRecipe.strYoutube.split('v=')[1];

    // Create an array of ingredients with their corresponding measurements
    const ingredientsWithMeasurements = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = selectedRecipe[`strIngredient${i}`];
        const measurement = selectedRecipe[`strMeasure${i}`];
        if (ingredient) {
            ingredientsWithMeasurements.push(`${ingredient} (${measurement})`);
        } else {
            break;
        }
    }

    return (
        <div>
            <h2 className="recipe-name" onClick={() => setSelectedRecipe(null)}>{selectedRecipe.strMeal}</h2>
            <img className="recipe-image" src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            <p className="recipe-description">{selectedRecipe.strInstructions}</p>
            <h3 className="ingredients-label">Ingredients Used</h3>
            <ul className="recipe-ingredients">
                {ingredientsWithMeasurements.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <iframe
                className="recipe-video"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${playbackId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <p className="recipe-source">Source: {selectedRecipe.strSource}</p>
        </div>
    );
}

export default RecipeInfo;
