import styles from "./styles.module.css";

export const Search = ({ query, setQuery, queryHandler }) => {
  return (
    <input
      id={styles.input}
      type="text"
      aria-label="Search"
      placeholder="Search"
      value={query}
      name="query"
      onKeyDown={(e) => {
        if (e.key === "Escape") e.target.blur();
        if (e.key === "Enter") queryHandler(e);
      }}
      onClick={(e) => {
        e.target.select();
      }}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      spellCheck={false}
    />
  );
};
