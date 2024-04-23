import axios from "axios";
import React, { useState } from "react";

const Analysis = ({ jsondata }) => {
  const [analyzedProduct, setAnalyzedProduct] = useState(null);

  let data = JSON.stringify(jsondata);
  const genrateanswer = async () => {
    console.log("...loading");
    console.log(data);
    let prompt = `
        Given the following JSON data containing a list of products with their titles, prices, ratings, and reviews:
      
        ${data}
      
        Please analyze the data and provide only the JSON data in string format for the product, the data should include product_title,product_price,product_image,product_link,product_rating and index_number (the index_number should be the index of the particular best product that has been provided to you ) with the best rating and the least price
          `;

    console.log(prompt);
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA8O5wZJJt4SOQzsAA_ln9jgZ_VyijLmbA",
      method: "post",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });

    console.log(res.data.candidates[0].content.parts[0].text.replaceAll("```","").replace("json","").replace("JSON",""));
    setAnalyzedProduct(
      JSON.parse(res.data.candidates[0].content.parts[0].text.replaceAll("```","").replace("json","").replace("JSON",""))
    );
  };
  return (
    <>
      <button className=" text-white font-bold px-44 py-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" onClick={genrateanswer}>
        Analyze
      </button>

      {analyzedProduct ? (
        <>
          <h2>the below product is the best on the basis of lowest price, good ratings and genuein reviews</h2>
          <div
            className="max-w-xs bg-white rounded-xl overflow-hidden shadow-md flex flex-col "
          >
            <a
              className="flex flex-col items-center"
              href={jsondata[analyzedProduct.index_number].product_link}
              target="_blank"
            >
              <img
                className="w-full"
                src={analyzedProduct.product_image}
                alt="Product"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {analyzedProduct.product_title}
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
                  Price: {analyzedProduct.product_price}
                </span>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Rating: {analyzedProduct.product_rating}
                </span>
              </div>
            </a>
          </div>
        </>
      ) : (
        <h2>Loading analysis...</h2>
      )}
    </>
  );
};

export default Analysis;
