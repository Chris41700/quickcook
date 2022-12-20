import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RecipeInfo from './RecipeInfo';

function SearchBar() {
    // State to store the search term entered by the user
    const [searchTerm, setSearchTerm] = useState('');

    // State to store the search results returned by the API
    const [searchResults, setSearchResults] = useState([]);

    // State to store the selected recipe
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        // Fetch the search results from the API
        const response = await fetch(`http://localhost/api/read.php?s=${searchTerm}`);
        const data = await response.json();

        // Set the search results in the state
        setSearchResults(data.meals);
    };

    // Function to handle changes to the search term input field
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle the selection of a recipe
    const handleClick = (option) => {
        // Create an array of ingredients from the option object
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = option[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            } else {
                break;
            }
        }

        // Set the selected recipe in the state, including the ingredients array
        setSelectedRecipe({...option, ingredients});
    };

    return (
        <div>
            <Autocomplete className = "wrapper"
                id="recipe-select-demo"
                sx={{width: 300}}
                options={searchResults}
                autoHighlight
                getOptionLabel={(option) => option.strMeal}
                renderOption={(props, option) => (
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={option.strMealThumb}
                            srcSet={option.strMealThumb}
                            alt={option.strMeal}
                        />
                        <button onClick={() => handleClick(option)}>{option.strMeal}</button>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose a recipe"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        onInputChange={handleChange}
                        value={searchTerm}
                        onChange={handleSubmit}
                    />
                )}
            />
            <RecipeInfo selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}/>
        </div>
    );
}

export default SearchBar;