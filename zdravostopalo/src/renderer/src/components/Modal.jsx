import React from "react";
import { GrClose } from "react-icons/gr";


export default function Modal({selectDate, handleChange, handleSubmit, closeModal, timeProps, infoProps, eventsProps}) {
    return(
        <>
        <div>
            <form className=" border border-black rounded bg-white w-1/3" onSubmit={handleSubmit}>
                <div className=" flex justify-between p-5">
                    <h1>Novi temrin za - {selectDate.format("dddd, D. MMMM YYYY.")}</h1>
                    <GrClose  onClick={closeModal} className="cursor-pointer"/>
                </div>
                <div className=" w-full flex flex-col p-5 border-t border-b border-black">
                    <label htmlFor="ime">Ime</label>
                    <input
                        className=" border border-black rounded p-1" 
                        required
                        id="ime"
                        name="ime"
                        type="text"
                        placeholder="Suljo Mehin"
                        autoComplete="off"
                        value={infoProps.info.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="broj">Broj</label>
                    <input 
                        className=" border border-black rounded p-1"
                        required
                        id="broj"
                        name="broj"
                        type="tel"
                        placeholder="06XXXXXXXX"
                        autoComplete="off"
                        value={infoProps.info.broj}
                        onChange={handleChange}
                    />
                    <div className=" p-5 flex justify-around">
                        <div>
                            <label htmlFor="sati">Sati
                                <select 
                                    className=" flex justify-center items-center border border-black rounded"
                                    required
                                    id="sati"
                                    name="sati"
                                    value={infoProps.info.sati}
                                    onChange={handleChange}
                                    >
                                    {timeProps.satSelected.map(sat => (
                                        <option key={sat}>{sat}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="minuta">Minuta
                                <select 
                                    className=" flex justify-center items-center border border-black rounded"
                                    required
                                    id="minuta"
                                    name="minuta"
                                    value={infoProps.info.minuta}
                                    onChange={handleChange}
                                    >
                                    {timeProps.minutSelected.map(minut => (
                                        <option key={minut}>{minut}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="trajanje">Trajanje
                                <select 
                                    className=" flex justify-center items-center border border-black rounded"
                                    required
                                    id="trajanje"
                                    name="trajanje"
                                    value={infoProps.info.trajanje}
                                    onChange={handleChange}
                                    >
                                    {timeProps.trajanjeSelected.map(trajanje => (
                                        <option key={trajanje}>{trajanje}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end p-5">
                    <p>{infoProps.provera}</p>
                    <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-5 rounded">
                        <h1>Dodaj</h1>
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}