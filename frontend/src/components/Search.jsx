import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [data, setdata] = useState({});
  const [search, setsearch] = useState("");

  const getResult = (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:5000/api/abc?q=${search}`;
    const result = axios
      .get(url)
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(result.data);
  };
  return (
    <div
      id="search"
      className="w-full flex justify-center items-center mt-20 gap-10"
    >
      <div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
          <input
            type="text"
            name="search"
            id="searhc"
            className="block w-96 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="iphone 15 pro"
            value={search}
            onChange={e=>setsearch(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={getResult}
        className="bg-gradient-to-br from-orange-400 to-orange-500 px-16 py-2 rounded-md text-white"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
