import React, {useRef, useState} from "react";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Slika from "./assets/zdravostopalo.png";
import dayjs from "dayjs";
import 'dayjs/locale/sr'
import NoviTermin from "./components/NoviTermin";
import Modal from "./components/Modal";
import { getMilliseconds, formatTime, extractDigits } from "./assets/utils.jsx";
import Ispis from "./components/Ispis.jsx";
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
  const daniMin=["M","T","W","T","F","S","S"];
  const meseci = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];

  //Za unos podataka
  const satSelect = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  const minutSelect = ["00", "15", "30", "45"]
  const trajanjeSelect = ["0h:15min","0h:30min","0h:45min","1h:00min","1h:15min","1h:30min","1h:45min","2h:00min","2h:15min","2h:30min","2h:45min","3h:00min","3h:15min","3h:30min","3h:45min","4h:00min","4h:15min","4h:30min","4h:45min","5h:00min","5h:15min","5h:30min","5h:45min","6h:00min","6h:15min","6h:30min","6h:45min","7h:00min","7h:15min","7h:30min","8h:00min","8h:15min", "8h:30min","8h:45min","9h:00min","9h:15min","9h:35min", "9h:45min","10h:00min"]
function App() {
  //Stvari za kalendar, header i datum
  const currentDate = dayjs();
  const day=dayjs().date();
  const [today, setToday]=useState(currentDate);
  const [selectDate, setSelectDate]=useState(currentDate);
  const results = generateDate(today.month(), today.year());
  const selectDString = selectDate.toDate().toDateString();
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
  //Informacije idr.
  const [info, setInfo] = useState({
    ime: "",
    broj: "",
    sati: "1",
    minuta: "00",
    trajanje: "0h:15min",
    updatedDate: new Date("January 1, 2024"),
    objID: selectDString,
  })
  // const [events, setEvents] = useState({
  //   title: `${info.ime}-${info.broj}`,
  //   start: new Date(`${selectDate}${formatTime(info.sati, info.minuta)}`),
  //   end: new Date(`${selectDate} ${formatTime(info.updatedDate.getHours(), info.updatedDate.getMinutes())}`),
  // })


  const [events, setEvents] = useState([]);


  const placeholderDate = new Date(`January 1, 2024 ${info.sati}:${info.minuta}`);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { hourLen, minuteLen } = extractDigits(info.trajanje);
    info.updatedDate.setTime(placeholderDate.getTime() + getMilliseconds(hourLen, minuteLen));
    setUsers([...users, events]);
    setInfo({
      divID: info.divID+1,
      ime: "",
      broj: "",
      sati: "1",
      minuta: "00",
      trajanje: "0h:15min",
      updatedDate: new Date("January 1, 2024"),
      objID: selectDString,
    });
    setEvents({
      title: `${info.ime} br. ${info.broj}`,
      start: dayjs(`${selectDString} ${formatTime(info.sati, info.minuta)}`).toDate(),
      end: dayjs(`${selectDString} ${formatTime(info.updatedDate.getHours(), info.updatedDate.getMinutes())}`).toDate(),
    });
    console.log(events);
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
      <div className="absolute top-1/4 left-1/3 w-full z-10">
        {modalOpen && (<Modal
          modalProps={{
            selectDate: selectDate,
            closeModal: closeModal,
            handleChange: handleChange,
            handleSubmit: handleSubmit,
          }}
          infoProps = {{
            users: users,
            setUsers: setUsers,
            info: info,
            setInfo: setInfo,
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
          navbarProps={{
            selectDate: selectDate,
            danManje: danManje,
            danVise: danVise,
          }}
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
            NTProps ={{
              openModal: openModal,
            }}
          />
        </div>
        {/* <div>
        {users.map((user, index) => {
          const { sati, minuta, updatedDate } = user; // destructure
          return (
            <div
              key={index}
              style={{
                border: "2px solid purple",
                backgroundColor: "grey",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <p>
                FROM:
                {formatTime(sati, minuta)}
              </p>

              <p>
                TO:
                {formatTime(updatedDate.getHours(), updatedDate.getMinutes())}
              </p>
            </div>
          );
        })}
        </div> */}
        <Ispis 
          infoProps = {{
            users: users,
            setUsers: setUsers,
            info: info,
            setInfo: setInfo,
          }}
        />
      </div>
      <script src="path/to/dayjs/dayjs.min.js"></script>
      <script>dayjs().format()</script>
    </>
  );
}

export default App