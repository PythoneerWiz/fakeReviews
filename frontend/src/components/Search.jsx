import React, { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import Analysis from "./Analysis";

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
        console.log(JSON.stringify(reviews));
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
            className="max-w-xs bg-white rounded-xl overflow-hidden shadow-md flex flex-col "
          >
            <a
              className="flex flex-col items-center"
              href={review.product_link}
              target="_blank"
            >
              <img
                className="w-full"
                src={review.product_image}
                alt="Product"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {review.product_title}
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
                  Price: {review.product_price}
                </span>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Rating: {review.product_rating}
                </span>
              </div>
            </a>
            <Dialog.Root>
              <Dialog.Trigger>
                <button className="w-48 bg-orange-500 text-white self-center my-4 rounded-sm py-2">
                  Reviews
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md bg-white p-8 shadow-md -translate-x-1/2 -translate-y-1/2 h-1/2 overflow-auto">
                  <h2>Reviews - {review.products_review.length}</h2>
                  {review.products_review.map((rev, i) => (
                    <p
                      key={i}
                      className="text-white text-base bg-orange-500 mt-2 p-5 rounded-sm "
                    >
                      <b>By- {rev.name}</b>
                      <br />
                      <b>Stars- {rev.stars}</b>
                      <br />
                      {rev.content}
                      <br />
                      <b>{rev.date}</b>
                      <br />
                    </p>
                  ))}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        ))}
      </div>
      <Analysis jsondata={correctReviews}/>
    </div>
  );
};

export default Search;
