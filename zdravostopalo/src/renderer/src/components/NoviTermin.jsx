import React, {useState} from "react";
export default function NoviTermin({modalProps}) {
    return(
        <>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded" onClick={modalProps.openModal}>
                <h1>Novi Termin</h1>
            </button>
        </>
    );
}