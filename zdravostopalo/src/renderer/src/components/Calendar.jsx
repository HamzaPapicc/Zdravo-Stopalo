import React from "react";
import dayjs from "dayjs";
import cn from "../assets/cn";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Calendar({today, setToday, meseci, results, daniMin, mesecManje, mesecVise, dateProps}) {
    return(
        <>
            <div className="w-72 h-72 border-2 border-indigo-600">
                <div className="w-full h-8 flex justify-around items-center">
                    <h1 className="flex justify-center items-center">{meseci[today.month()]} {today.year()}</h1>
                    <div className="flex justify-between items-end space-x-10">
                        <SlArrowLeft className="w-5 h-5 cursor-pointer" onClick={mesecManje} />
                        <SlArrowRight className="w-5 h-5 cursor-pointer" onClick={mesecVise} />
                    </div>
                </div>
                <div className="w-full grid grid-cols-7">
                    {daniMin.map((dan, index) => {
                        return <h1 key={index} className="h-9 grid place-content-center text-sm">{dan}</h1>
                    })}
                </div>
                <div className="w-full grid grid-cols-7">
                    {results.map(({ date, currentMonth, today}, index) =>{
                        const selectDateAndToday = () => {
                            dateProps.setSelectedDate(date);
                            setToday(date);
                        }
                        return(
                            <div key={index} className="h-9 grid place-content-center text-sm">
                                <h1 className={cn(
                                    "h-7 w-7 grid place-content-center rounded-full hover:bg-gray-400 hover:text-white transition-all cursor-pointer",
                                    currentMonth ? "" : "text-gray-400",
                                    today ? "bg-blue-600 text-white hover:bg-blue-800" : "",
                                    dateProps.selectedDString === date.toDate().toDateString() ? "bg-blue-300 text-white" : "",
                                )}
                                onClick={selectDateAndToday}>{date.date()}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </>
    );
}

