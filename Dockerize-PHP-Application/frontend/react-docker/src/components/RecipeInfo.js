import React from 'react';

function RecipeInfo(props) {
    // Destructure the selectedRecipe and setSelectedRecipe props
    const { selectedRecipe, setSelectedRecipe } = props;

    // If there is no selected recipe, return null
    if (!selectedRecipe) {
        return null;
    }

    // Extract the playback ID from the strYoutube property
    const playbackId = selectedRecipe.strYoutube.split('-')[1];

    return (
        <div>
            <h2 onClick={() => setSelectedRecipe(null)}>{selectedRecipe.strMeal}</h2>
            <p>{selectedRecipe.strInstructions}</p>
            <ul>
                {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${playbackId}`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    );
}

export default RecipeInfo;
