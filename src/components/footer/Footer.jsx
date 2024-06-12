import React from "react";
import { Youtube, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <div className='text-center bg-[#04152D] px-[15vw] py-2 w-full'>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque magni
        veniam, vitae nihil, aliquid illum a maxime quae maiores sunt eveniet in
        blanditiis, quidem tempora illo saepe! Vel, doloribus tempora.
      </p>
      <div className='flex items-center gap-6 w-full hover:opacity75 text-center justify-center p-3'>
        <Twitter color='#1C9BF0' />
        <Youtube color='#FF0000' size={30} />
        <Instagram color='#C73378' />
      </div>
      <p className='text-center'>Term Condition are apply @2024</p>
    </div>
  );
};
