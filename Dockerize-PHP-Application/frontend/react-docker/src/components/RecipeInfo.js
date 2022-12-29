import React from 'react';

// Function to parse the source URL and extract the website name
function parseURL(url) {
    const parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
}

function RecipeInfo(props) {
    const {selectedRecipe, setSelectedRecipe} = props;

    if (!selectedRecipe) {
        return null;
    }

    let playbackId = selectedRecipe.strYoutube.split('v=')[1];

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

    const instructions = selectedRecipe.strInstructions;
    const steps = instructions.split('\n');
    const stepsList = steps.map((step, index) => <li key={index}> {step}</li>);
    const websiteName = parseURL(selectedRecipe.strSource).toLowerCase();

    return (
        <div>
            <h2 className="recipe-name" onClick={() => setSelectedRecipe(null)}>{selectedRecipe.strMeal}</h2>
            <img className="recipe-image" src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal}/>
            <h3 className="recipe-label">{selectedRecipe.strMeal} Recipe</h3>
            <ol className="recipe-steps">{stepsList}</ol>
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
            <p className="recipe-source">Source:
                <a href={selectedRecipe.strSource}
                   rel="noopener noreferrer"
                   target="_blank">
                    {websiteName}
                </a>
            </p>
        </div>
    );
}

export default RecipeInfo;
