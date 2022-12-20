import './App.css';
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="App">
        <h1 className="website-name">Recipe Finder</h1>
        <div className="search-bar-container">
            <SearchBar/>
        </div>

    </div>
  );
}

export default App;
