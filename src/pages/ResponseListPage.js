import React, { useState } from "react";
import axios from "axios";

export default function ResposnseListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Filtered Responses</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter value to search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="bg-white shadow rounded p-4">
        {results.length === 0 && !loading ? (
          <p>No results found</p>
        ) : (
          results.map((item) => (
            <li key={item._id} className="border-b py-2">
              <span className="font-mono">{item._id}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
