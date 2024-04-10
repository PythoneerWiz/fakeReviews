import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAssest, setImageAssest] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertstatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [loading, setIsLoading] = useState(false);

  return (
    <div className=" w-full  min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border  border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center ">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg ${
              alertstatus === "danger"
                ? "bg-red-600 text-white  font-semibold "
                : " bg-emerald-600 text-white font-semibold"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className=" w-full py-2 border-b border-gray-400 flex items-center gap-2">
        <IoFastFood  className=" text-xl text-gray-700"/>


          <input     type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give a title..." className="w-full h-full text-;g
           bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor">
          </input>
           
        </div>










      </div>
    </div>
  );
};

export default CreateContainer;
