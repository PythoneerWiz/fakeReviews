import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [correctReviews, setCorrectReviews] = useState([]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const getResult = (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:5000/api/abc?q=${search}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        // Extract and set correct reviews
        const reviews = res.data.amazon.concat(res.data.flipkart);
        console.log(reviews);
        setCorrectReviews(reviews);

        // Map reviews into a JSON object with ratings and content
        const reviewsData = reviews.map((review) => ({
          rating: review.product_rating,
          content: review.products_review.map((rev) => rev.content),
        }));

        const predictUrl = `http://127.0.0.1:5000/predict`;
        axios
          .post(predictUrl, { reviews: reviewsData, category, rating })
          .then((res) => {
            console.log("Prediction result:", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="search" className="w-full flex flex-col items-center mt-20 gap-10">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-96 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        onClick={getResult}
        className="bg-gradient-to-br from-orange-400 to-orange-500 px-16 py-2 rounded-md text-white"
      >
        Search
      </button>
      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {correctReviews.map((review, index) => (
          <div
            key={index}
            className="max-w-xs bg-white rounded-xl overflow-hidden shadow-md"
          >
            <img className="w-full" src={review.product_image} alt="Product" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {review.product_title}
              </div>
              {review.products_review.map((rev, i) => (
                <p key={i} className="text-gray-700 text-base">
                  {rev.content}
                </p>
              ))}
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Rating: {review.product_rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
