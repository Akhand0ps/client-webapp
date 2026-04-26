import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => onSearch(input)}>Search</button>
    </div>
  );
};

export default SearchBar;