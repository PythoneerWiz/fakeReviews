import React from "react";
import Delivery from "../images/delivery.png";
import herobg from "../images/heroBg.png";
import Herodata from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      id="home"
      className=" grid grid-cols-1 md:grid-cols-2 gap-2 ml-20  w-full -mt-10"
    >
      <div className="flex-1 flex flex-col items-start md:items-center justify-center -ml-4 gap-6 lg:-mt-10  mt-6">
        <div className=" flex  items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full lg:-ml-[500px] md:-ml-[261px]">
          <p className=" text-base text-orange-500 font-semibold">
            SmartShopper
          </p>
          {/* <div className=" h-8 w-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className=" w-full h-full object-contain"
            />
          </div> */}
        </div>

        <p className="text-[2.5rem] lg:text-6xl font-bold tracking-wider text-headingColor ">
          The most effiecient way to{" "}
          <span className=" text-orange-600 text-5xl lg:text-[4.5rem]">
            {" "}
            Shop
          </span>
        </p>
        <p className=" text-base text-textColor  lg:text-left  lg:w-[100%] text-start">
          {" "}
          Indulge in the ultimate shopping experience with The Fastest shopiing analysis platform in Your City! Savor your favorite products from top online shopping apps delivered straight to your door in lightning-fast time.{" "}
        </p>

        <button
          type="button"
          className=" bg-gradient-to-br from-orange-400 to-orange-500 w-[350px] lg:w-auto  px-6 py-2 rounded-lg hover:shadow-2xl transition-all ease-in-out duration-300 lg:-ml-[495px]   md:w-auto md:-ml-[260px] "
        >
          Order Now
        </button>
      </div>

      <div className=" py-2 flex-1 relative ">
        <img
          src={herobg}
          className=" lg:ml-[220px]  -ml-[8px]  h-420   md:ml-0 w-[330px] lg:w-auto lg:h-[500px] md:h-[500px] md:mt-8"
          alt="hero"
        />
        <div className=" w-full h-full absolute top-0 left-0  lg:flex lg:flex-wrap   items-center justify-center px-24  gap-4  mt-8">
          {Herodata &&
            Herodata.map((n) => (
              <div
                key={n.id}
                className="lg:w-[170px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img src={n.imgsrc} className="w-20 h-50  lg:w-40 -mt-10 lg:-mt-20"/>

                <p className=" text-base  lg:text-xl font-semibold  text-textColor  mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className=" text-[12px] lg:text-sm  text-gray-400 font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
