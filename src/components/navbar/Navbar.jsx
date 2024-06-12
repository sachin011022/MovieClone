import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [searchInput, setsearchInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    setsearchInput(e.target.value);
    if (e.key == "Enter" && searchInput.length > 0)
      navigate(`/search/${searchInput}`);
  };
  return (
    <div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex space-x-3'>
          <img src={logo} alt='' />
          <h3 className='text-4xl font-sans uppercase tracking-wide'>hi!</h3>
        </div>

        <input
          type='text'
          className=' bg-gray-500 py-1 pl-4 rounded-full focus:outline-none active:outline-none placeholder:searching... text-white'
          onChange={handleInput}
          onKeyUp={handleInput}
        />
      </div>
    </div>
  );
}

export default Navbar;
