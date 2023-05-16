import { useEffect, useState } from "react";
//utils
import useDebounceDirect from "../utils/useDebounceDirect";
// import useDebounce from "../utils/useDebounce";
import "./search.css";
const Search = () => {
  const [meals, setMeals] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = async (value) => {
    try {
      const resp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
      );
      const res = await resp.json();
      console.log(res);
      if (res.meals) {
        setIsSearching((p) => !p);
        setMeals(res.meals);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const optimizedFn = useDebounceDirect(handleChange, 500);
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // useEffect(
  //   () => {
  //     if (debouncedSearchTerm) {
  //       setIsSearching((p) => !p);
  //       handleChange(debouncedSearchTerm);
  //     } else {
  //       setMeals([]);
  //       setIsSearching((p) => !p);
  //     }
  //   },
  //   [debouncedSearchTerm] // Only call effect if debounced search term changes
  // );
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
        Debouncing in React JS
      </h2>

      <input
        type="text"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => {
          // setSearchTerm(e.target.value);
          optimizedFn(e.target.value);
        }}
      />

      {meals?.length > 0 && (
        <div className="mealWrapper">
          {isSearching ? (
            <p>Wait a seconds...</p>
          ) : (
            meals?.map((meal) => (
              <div key={meal?.idMeal} className="meal">
                <img src={meal?.strMealThumb} alt={meal?.strMeal} />
                <div>
                  <h3>{meal?.strMeal}</h3>
                  <h5>{meal?.strArea}</h5>
                  <p>{meal?.strInstructions}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
