import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./searchBar.module.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  return (
    <form
      action={`/search/${searchTerm}`}
      role="form"
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Search Movies, TV, or People..."
        className={styles.input}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button className={styles.button}>{search}</button>
    </form>
  );
};

export default SearchBar;
