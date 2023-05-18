"use client";

import { useState } from "react";
import styles from "./searchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
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
        <button className={styles.button}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
