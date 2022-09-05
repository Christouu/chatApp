import People from "../people/People";
import "./Search.scss";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <People />
    </div>
  );
};

export default Search;