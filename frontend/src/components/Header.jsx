import React, { useState } from "react";
import Logo from "../images/logo.png";
import { IoMdAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

export const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  return (
    <header className=" w-screen fixed z-50  p-3 px-4  md:p-6  md:px-16  bg-primary ">
      {/* desktop and tablet */}

      <div className=" hidden md:flex w-ful h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className=" w-8 object-cover " alt="logo"></img>
          <p className=" text-headingColor text-xl font-bold">SmartShopper</p>
        </Link>

        <div className=" flex  items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              <Link to={"#search"}> Search</Link>
            </li>
            <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
              About Us
            </li>
            <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
              Services
            </li>
          </motion.ul>

          <div className="relative  flex items-center justify-center ">
            <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer" />

            <div className=" absolute -top-2 -right-2  w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-sm text-white font-semibold ">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px h-10 min-h-[40px]  shadow-2xl rounded-full  cursor-pointer"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12"
              >
                {user && user.email === "akashgupta2000515@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-200 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <IoMdAdd />
                    </p>
                  </Link>
                )}

                <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-200 ease-in-out text-textColor text-base">
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className=" flex items-center justify-between md:hidden w-full ">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className=" w-8 object-cover " alt="logo"></img>
          <p className=" text-headingColor text-xl font-bold">SmartShopper</p>
        </Link>

        <div className="relative  flex items-center justify-center ml-32 ">
          <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer" />

          <div className=" absolute -top-2 -right-2  w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-sm text-white font-semibold ">2</p>
          </div>
        </div>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px h-10 min-h-[40px]  shadow-2xl rounded-full  cursor-pointer"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12"
            >
              {user && user.email === "akashgupta2000515@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-200 ease-in-out text-textColor text-base">
                    New Item <IoMdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex  flex-col">
                <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out  hover:bg-slate-100 px-4 py-2  ">
                  Home
                </li>
                <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2  ">
                  Menu
                </li>
                <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out  hover:bg-slate-100 px-4 py-2 ">
                  About Us
                </li>
                <li className="text-base text-textColor  cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100  px-4 py-2 ">
                  Services
                </li>
              </ul>

              <p
                className=" m-2 p-2 rounded-md shadow-md  flex items-center justify-center bg-gray-200  gap-3 cursor-pointer  hover:bg-gray-300 transition-all duration-200 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
