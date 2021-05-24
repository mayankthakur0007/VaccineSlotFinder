import { useState } from "react";
import Header from "./Header"
import SearchForm from "./SearchForm";
import Results from "./Results";

function App() {

const [results,resultsChanged] = useState([]);
const [showResults,showResultsChanged] = useState(false);

const resultFetched = (result) => {
  resultsChanged(result);
  showResultsChanged(true);
}

  return (
    <div>
      <Header />
      <SearchForm onResult = {resultFetched}/>
      {showResults? <Results data= {results} />: null}
    </div>
  );
}

export default App;
