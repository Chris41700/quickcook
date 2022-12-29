import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RecipeInfo from './RecipeInfo';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSubmit = async (event) => {
        const response = await fetch(`http://localhost/api/read.php?s=${searchTerm}`);
        const data = await response.json();

        setSearchResults(data.meals);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = (option) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = option[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            } else {
                break;
            }
        }

        setSelectedRecipe({...option, ingredients});
    };

    return (
        <div>
            <Autocomplete className="wrapper"
                          id="recipe-select-demo"
                          sx={{width: 300}}
                          options={searchResults}
                          autoHighlight
                          getOptionLabel={(option) => option.strMeal}
                          renderOption={(props, option) => (
                              <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}
                                   onClick={() => setSelectedRecipe(option)}>
                                  <img
                                      loading="lazy"
                                      width="20"
                                      src={option.strMealThumb}
                                      srcSet={option.strMealThumb}
                                      alt={option.strMeal}
                                  />
                                  <div>{option.strMeal}</div>
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
            {selectedRecipe && (
                <RecipeInfo
                    selectedRecipe={selectedRecipe}
                    setSelectedRecipe={setSelectedRecipe}
                />
            )}
        </div>
    );
}

export default SearchBar;
