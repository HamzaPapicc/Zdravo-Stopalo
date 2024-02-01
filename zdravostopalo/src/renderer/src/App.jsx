import React, {useRef, useState} from "react";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Slika from "./assets/zdravostopalo.png";
import dayjs from "dayjs";
import 'dayjs/locale/sr'
import NoviTermin from "./components/NoviTermin";
import Modal from "./components/Modal";
import { getMilliseconds, formatTime, extractDigits } from "./assets/utils.jsx";
dayjs.locale('sr');

const generateDate = (month=dayjs().month(), year=dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  const arrayOfDate = [];
  
  //Dani pre trenutnog meseca
  for(let i=1;i<firstDateOfMonth.day();i++){
      arrayOfDate.push({
          date: firstDateOfMonth.day(i),
          currentMonth: false,
      });
  }

  //Dani u mesecu
  for(let i=firstDateOfMonth.date(); i<=lastDateOfMonth.date(); i++){
      arrayOfDate.push({
          date: firstDateOfMonth.date(i),
          currentMonth: true,
          today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
      });
  }
  
  //Dani posle meseca
  const rest = 42 - arrayOfDate.length;
  
  for(let i=lastDateOfMonth.day()+1; i<lastDateOfMonth.day()+1 + rest; i++){
      arrayOfDate.push({
          date: lastDateOfMonth.day(i),
          currentMonth: false,
        });
      }
      
      return arrayOfDate;
}
  //Za kalendar
  const daniFull = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
  const daniMin=["M","T","W","T","F","S","S"];
  const meseci = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];

  //Za unos podataka
  const satSelect = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  const minutSelect = ["00", "15", "30", "45"]
  const trajanjeSelect = ["0h:15min","0h:30min","0h:45min","1h:00min","1h:15min","1h:30min","1h:45min","2h:00min","2h:15min","2h:30min","2h:45min","3h:00min","3h:15min","3h:30min","3h:45min","4h:00min","4h:15min","4h:30min","4h:45min","5h:00min","5h:15min","5h:30min","5h:45min","6h:00min","6h:15min","6h:30min","6h:45min","7h:00min","7h:15min","7h:30min","8h:00min","8h:15min", "8h:30min","8h:45min","9h:00min","9h:15min","9h:35min", "9h:45min","10h:00min"]
  let provera = "";

  //Kod ispisivanja termina
  const satiUDanu = ["1h","2h","3h","4h","5h","6h","7h","8h","9h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h","24h"];

function App() {
  //Stvari za kalendar, header i datum
  const currentDate = dayjs();
  const day=dayjs().date();
  const [today, setToday]=useState(currentDate);
  const [selectDate, setSelectDate]=useState(currentDate);
  const results = generateDate(today.month(), today.year());
  const selectDString = selectDate.toDate().toDateString();
  const daniFullPut = daniFull[today.day()];
  //Za unosenje podataka
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      const parsedData = JSON.parse(saved);
      const userData = parsedData.map((user) => ({
        ...user,
        updatedDate: new Date(user.updatedDate),
      }));
      return userData;
    } else return [];
  });
  const [info, setInfo] = useState({
    divID: 1,
    ime: "",
    broj: "",
    sati: "1",
    minuta: "00",
    trajanje: "0h:15min",
    updatedDate: new Date("January 1, 2024"),
    objID: selectDString,
  })
  const placeholderDate = new Date(`January 1, 2024 ${info.sati}:${info.minuta}`);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { hourLen, minuteLen } = extractDigits(info.trajanje);
    info.updatedDate.setTime(placeholderDate.getTime() + getMilliseconds(hourLen, minuteLen));
    setUsers([...users, info]);
    setInfo({
      divID: info.divID+1,
      ime: "",
      broj: "",
      sati: "1",
      minuta: "00",
      trajanje: "0h:15min",
      updatedDate: new Date("January 1, 2024"),
      objID: selectDString,
    })
    console.log(hourLen);
    e.target.reset();
    localStorage.setItem("users", JSON.stringify([...users, info]));
    setModalOpen(false);
  };

  //Otvaranje i zatvaranje modala
  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  
  //Za menjanje datuma
  function danManje() { 
    setSelectDate(selectDate.day(selectDate.day()-1));
    setToday(today.day(today.day()-1))
  }
  function danVise() {
    setSelectDate(selectDate.day(selectDate.day()+1));
    setToday(today.day(today.day()+1))
  }
  function mesecManje() {
    setToday(today.month(today.month()-1));
  }
  function mesecVise() {
    setToday(today.month(today.month()+1));
  }

  //Za brisanje i izmenu termina
  const obrisiTermin = (index) => {
    setUsers(users.filter((_, i) => i !== index));
    localStorage.removeItem("users");
  }
  return (
    <>
    <div className="App">
      <div className="absolute top-1/4 left-1/3 w-full z-10">
        {modalOpen && (<Modal
          selectDate={selectDate}
          closeModal={closeModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setModalOpen={setModalOpen}
          infoProps = {{
            users: users,
            setUsers: setUsers,
            info: info,
            setInfo: setInfo,
            provera: provera,
          }}
          timeProps = {{
            satSelected: satSelect,
            minutSelected: minutSelect,
            trajanjeSelected: trajanjeSelect,
          }}
        />)}
      </div>
      <div className="w-full flex flex-row justify-center">
        <Navbar 
        daniFullPut = {daniFullPut}
        meseci={meseci}
        today={today}
        selectDate={selectDate}
        danManje={danManje}
        danVise={danVise}
        />
      </div>
      <br />
      <div className="relative flex justify-center gap-7">
        <div className="relative flex flex-col justify-center items-center h-1/3">
          <img src={Slika} alt="Slika nije ucitana." className="w-72 h-58" />
          <Calendar 
          results={results}
          meseci={meseci}
          daniMin={daniMin}
          today={today}
          setToday={setToday}
          mesecManje={mesecManje}
          mesecVise={mesecVise}
          dateProps={{
            currentDate,
            selectedDate: selectDate,
            selectedDString: selectDString,
            setSelectedDate: setSelectDate,
          }}
          />
          <br />
          <NoviTermin 
            modalProps ={{
              modalOpen: modalOpen,
              setModalOpen: setModalOpen,
              openModal: openModal,
            }}
          />
        </div>
        <div className="relative flex flex-col">
          <ul className=" flex flex-col gap-4">
            {satiUDanu.map(satiDani => (
              <li className="flex justify-end align-text-top" key={satiDani}>{satiDani}-</li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col">
          {users.map((user, index) => {
            const { sati, minuta, updatedDate } = user;
            /*switch(updatedDate.getHours()) {
              case 0: 
                termin.classList.add("flex flex-row justify-between w-full border border-blue-700 bg-blue-700 rounded text-white gap-10 h-12");
                break;
              case 1:
                termin.classList.add("flex flex-row justify-between w-full border border-blue-700 bg-blue-700 rounded text-white gap-10 h-14");
                break;
              case 2:
                termin.classList.add("flex flex-row justify-between w-full border border-blue-700 bg-blue-700 rounded text-white gap-10 h-16");
                break;
            }*/
            if(user.objID == selectDString) {
            return (
              <div className="flex flex-row justify-between w-full border border-blue-700 bg-blue-700 rounded text-white gap-10 h-12"
                key={index} id={index}
              >
                <div className="relative flex flex-row justify-evenly items-center gap-10 p-3">
                  <p> {user.ime}</p>
                  <p>{formatTime(sati, minuta)} - {formatTime(updatedDate.getHours(), updatedDate.getMinutes())}</p>
                  <p> br. {user.broj}</p>
                </div>
                <div className=" flex justify-end">
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-28">{user.trajanje}</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" key={user.divID} onClick={() => obrisiTermin(index)}>Obriši</button>
                </div>
              </div>
            );
            }
          })}
        </div>
      </div>
    </div>
      <script src="path/to/dayjs/dayjs.min.js"></script>
      <script>dayjs().format()</script>
    </>
  );
}

export default App