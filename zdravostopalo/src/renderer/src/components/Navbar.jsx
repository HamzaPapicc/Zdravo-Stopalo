import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Navbar({navbarProps}){
    return (
        <>
            <div className="flex  flex-row items-center">
            <button className=" flex justify-center items-center w-24 h-12 bg-blue-600 border-blue-600 rounded hover:bg-blue-900 text-white" onClick={navbarProps.danManje}>
                <SlArrowLeft className="w-5 h-5 cursor-pointer"/>
            </button>
            <h1 className="text-3xl">{navbarProps.selectDate.format("dddd, D. MMMM YYYY.")}</h1>
            <button className=" flex justify-center items-center w-24 h-12 bg-blue-600 border-blue-600 rounded hover:bg-blue-900 text-white" onClick={navbarProps.danVise}>
                <SlArrowRight className="w-5 h-5 cursor-pointer"/>
            </button>
            </div>
        </>
    );
}