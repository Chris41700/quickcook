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

    return (
        <div>
            <h2 className="recipe-name" onClick={() => setSelectedRecipe(null)}>{selectedRecipe.strMeal}</h2>
            <p className="recipe-description">{selectedRecipe.strInstructions}</p>
            <ul className="recipe-ingredient">
                {selectedRecipe.ingredients.map((ingredient) => (
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
        </div>
    );
}

export default RecipeInfo;
