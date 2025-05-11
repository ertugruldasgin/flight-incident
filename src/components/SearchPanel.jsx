import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchCrashes } from "../services/searchService";

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const [aircraftType, setAircraftType] = useState([]);
  const [dateFilterDays, setDateFilterDays] = useState(null);
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [results, setResults] = useState([]);

  const toggleAircraftType = (type) => {
    if (aircraftType.includes(type)) {
      setAircraftType(aircraftType.filter((t) => t !== type));
    } else {
      setAircraftType([...aircraftType, type]);
    }
  };

  const handleDateInputChange = (rawValue, setter) => {
    const numbersOnly = rawValue.replace(/\D/g, "").slice(0, 8);

    let maskedValue = "";
    if (numbersOnly.length > 0) maskedValue += numbersOnly.substring(0, 2);
    if (numbersOnly.length > 2)
      maskedValue += "/" + numbersOnly.substring(2, 4);
    if (numbersOnly.length > 4)
      maskedValue += "/" + numbersOnly.substring(4, 8);

    setter(maskedValue);
  };

  const getRawDateValue = (maskedValue) => {
    return maskedValue.replace(/\D/g, "");
  };

  function formatDateForSearch(rawInput) {
    if (rawInput.length !== 8) return null;

    const day = rawInput.slice(0, 2);
    const month = rawInput.slice(2, 4);
    const year = rawInput.slice(4, 8);

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchResults = async () => {
      const formattedStartDate = formatDateForSearch(
        getRawDateValue(startDateInput)
      );
      const formattedEndDate = formatDateForSearch(
        getRawDateValue(endDateInput)
      );

      const crashes = await searchCrashes({
        query,
        aircraftType,
        dateFilterDays,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setResults(crashes);
    };

    fetchResults();
  }, [query, aircraftType, dateFilterDays, startDateInput, endDateInput]);

  return (
    <div className="z-20 flex flex-col gap-4 items-center px-4 text-neutral-900 dark:text-white xl:max-w-[70%] mx-auto transition-colors duration-300">
      <div className="bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg opacity-70 w-full transition-colors duration-300">
        <div className="grid grid-cols-2 grid-rows-5 lg:grid-cols-4 lg:grid-rows-5 gap-4 p-4 h-full w-full">
          <div className="col-span-4 lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="dark:placeholder:bg-neutral-200 bg-neutral-300/50 dark:bg-neutral-600/50 border-0 rounded-lg shadow-md flex justify-center items-center transition-colors duration-300">
              <input
                type="text"
                value={startDateInput}
                onChange={(e) =>
                  handleDateInputChange(e.target.value, setStartDateInput)
                }
                placeholder="DD/MM/YYYY"
                maxLength={10}
                className="placeholder-neutral-400 placeholder:text-base text-base sm:placeholder:text-lg sm:text-lg md:placeholder:text-xl md:text-xl p-2 rounded-lg tracking-wider text-center focus:outline-none"
              />
            </div>
            <div className="bg-neutral-300/50 dark:bg-neutral-600/50 border-0 rounded-lg shadow-md flex justify-center items-center transition-colors duration-300">
              <input
                type="text"
                value={endDateInput}
                onChange={(e) =>
                  handleDateInputChange(e.target.value, setEndDateInput)
                }
                placeholder="DD/MM/YYYY"
                maxLength={10}
                className="placeholder-neutral-400 placeholder:text-base text-base sm:placeholder:text-lg sm:text-lg md:placeholder:text-xl md:text-xl p-2 rounded-lg tracking-wider text-center focus:outline-none"
              />
            </div>
          </div>
          <div className="col-span-4 lg:col-span-2 col-start-1 row-start-2 grid grid-cols-4 grid-rows-1 gap-4 text-[0.5rem] sm:text-xs md:text-sm font-semibold bg-transparent">
            <button
              onClick={() => {
                setDateFilterDays(null);
              }}
              className={`border-0 p-2 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                dateFilterDays === null
                  ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                  : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
              }`}
            >
              Any Time
            </button>

            <button
              onClick={() => {
                setDateFilterDays(7);
              }}
              className={`border-0 p-1 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                dateFilterDays === 7
                  ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                  : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
              }`}
            >
              Last Week
            </button>

            <button
              onClick={() => {
                setDateFilterDays(31);
              }}
              className={`border-0 p-1 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                dateFilterDays === 31
                  ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                  : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
              }`}
            >
              Last Month
            </button>

            <button
              onClick={() => {
                setDateFilterDays(365);
              }}
              className={`border-0 p-1 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                dateFilterDays === 365
                  ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                  : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
              }`}
            >
              Last Year
            </button>
          </div>
          <div className="col-span-4 lg:col-span-2 row-span-2 col-start-1 row-start-3 gap-4 bg-transparent">
            <div className="grid grid-cols-4 grid-rows-2 gap-4 text-[0.5rem] sm:text-xs md:text-sm font-semibold h-full">
              <button
                onClick={() => setAircraftType([])}
                className={`border-0 p-1 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                  aircraftType.length === 0
                    ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                    : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
                }`}
              >
                All Aircrafts
              </button>
              {[
                "Boeing",
                "Airbus",
                "Douglas",
                "Bombardier",
                "Embraer",
                "Antonov",
                "Lockheed",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleAircraftType(type)}
                  className={`border-0 uppercase rounded-lg shadow-md flex justify-center items-center transition-colors duration-300 cursor-pointer ${
                    aircraftType.includes(type)
                      ? "bg-sky-500/70 dark:bg-neutral-900/70 hover:bg-sky-400/70 dark:hover:bg-neutral-700/70 text-white shadow-md dark:border-6 rounded-lg dark:border-neutral-600/50 transition-colors duration-300"
                      : "bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-4 col-start-1 row-start-5 bg-neutral-300/50 dark:bg-neutral-600/50 border-0 rounded-lg shadow-md flex justify-center items-center px-2 transition-colors duration-300">
            <input
              type="text"
              placeholder="SEARCH INCIDENTS"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="placeholder:text-base text-base sm:placeholder:text-lg sm:text-lg md:placeholder:text-xl md:text-xl placeholder-neutral-400 outline-none w-full h-full p-4 rounded-lg flex text-left"
            />
          </div>
          <div className="hidden lg:col-span-2 lg:row-span-4 lg:col-start-3 gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:row-start-1 bg-transparent transition-colors duration-300">
            <Link
              to="/incident/September%2011%20Attacks"
              className="w-full h-full bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300"
            >
              <h2 className="text-lg lg:text-xl capitalize font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                September 11 Attacks
              </h2>
              <p className="text-neutral-500 text-xs xl:text-sm">
                September 11, 2001
              </p>
              <p className="mt-2 text-sm lg:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300">
                The largest criminal investigation in U.S. history.
              </p>
            </Link>
            <Link
              to="/incident/Tenerife%20airport%20disaster"
              className="w-full h-full bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300"
            >
              <h2 className="text-lg lg:text-xl capitalize font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                Tenerife Airport Disaster
              </h2>
              <p className="text-neutral-500 text-xs xl:text-sm">
                March 27, 1977
              </p>
              <p className="mt-2 text-sm lg:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300">
                The deadliest accident in aviation history, involving two Boeing
                747s.
              </p>
            </Link>
            <Link
              to="/incident/Japan%20Air%20Lines%20Flight%20123"
              className="w-full h-full bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300"
            >
              <h2 className="text-lg lg:text-xl capitalize font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                Japan Air Lines Flight 123
              </h2>
              <p className="text-neutral-500 text-xs xl:text-sm">
                August 12, 1985
              </p>
              <p className="mt-2 text-sm lg:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300">
                The deadliest single-aircraft accident in aviation history.
              </p>
            </Link>
            <Link
              to="/incident/Turkish%20Airlines%20Flight%20981"
              className="w-full h-full bg-neutral-300/50 dark:bg-neutral-600/50 hover:bg-neutral-400/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300"
            >
              <h2 className="text-lg lg:text-xl capitalize font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                Turkish Airlines Flight 981
              </h2>
              <p className="text-neutral-500 text-xs xl:text-sm">
                March 3, 1974
              </p>
              <p className="mt-2 text-sm lg:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300">
                A fatal crash caused by cargo door failure, killing all on
                board.
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-transparent w-full pb-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.length === 0 ? (
            <p className="text-base mx-auto md:mx-4 text-neutral-500">
              No results found.
            </p>
          ) : (
            results
              .slice()
              .reverse()
              .slice(0, 40)
              .map((crash) => (
                <Link
                  key={crash.title}
                  to={`/incident/${encodeURIComponent(crash.title)}`}
                  className="bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-400/10 dark:hover:bg-neutral-500/25 rounded-2xl p-4 shadow-lg opacity-70 w-full transition-colors duration-300"
                >
                  <div className="capitalize w-full h-full bg-neutral-300/30 dark:bg-neutral-600/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300">
                    <h2 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                      {crash.title}
                    </h2>
                    <p className="text-neutral-500 text-xs sm:text-sm">
                      <strong>Date: </strong>
                      {formatDateDisplay(crash.date)}
                      <br />
                      <strong>Site: </strong>
                      {formatLocationDisplay(crash.site)}
                      <br />
                      <strong>Operator: </strong>
                      {crash.operator}
                      <br />
                      <strong>Aircraft: </strong>
                      {crash.aircraftType}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300">
                      {crash.summary?.slice(0, 150)}...
                    </p>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

function formatLocationDisplay(locationStr) {
  if (!locationStr || locationStr === "Unknown") return "Unknown";
  return locationStr;
}

function formatDateDisplay(dateStr) {
  if (!dateStr || dateStr === "Unknown") return "Unknown";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
}

export default SearchPanel;
