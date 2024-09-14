import React, { useEffect, useState } from "react";
import data from "../API/db.json";
import { GoSearch } from "react-icons/go";

function CountryData() {
  const [countryData, setCountryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setCountryData(data);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countryData.filter(
        (item) =>
          item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.capital.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, countryData]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="relative w-full max-w-lg mx-auto mb-8 flex justify-center">
          <div className="relative flex items-center ">
            <GoSearch className="absolute left-3 text-gray-500 text-xl" />
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 lg:w-96 p-3 pl-10 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300 text-black"
              placeholder="Search country or capital..."
            />
          </div>

          {/* Suggestion dropdown */}
          {filteredData.length > 0 && (
            <ul className="absolute z-10 w-full bg-[#F6EACB] border rounded-lg shadow-lg max-h-60 overflow-y-auto mt-16 ">
              {filteredData.map((item, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 transition     border-1 border-b border-gray-300"
                  onClick={() => setSearchTerm(item.country)}
                >
                  <span className="font-semibold text-black">
                    {item.country}
                  </span>{" "}
                  - <span className="text-gray-700">{item.capital}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-black">Country Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-lg shadow-lg rounded-lg p-6 bg-[#F6EACB]"
                >
                  <h5 className="text-lg font-bold mb-2">{item.country}</h5>
                  <p>Capital: {item.capital}</p>
                  <p>Population: {item.population}</p>
                  <p>Currency: {item.currency}</p>
                </div>
              ))
            : countryData.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-lg shadow-lg rounded-lg p-6 bg-[#F6EACB]"
                >
                  <h5 className="text-lg font-bold mb-2">{item.country}</h5>
                  <p>Capital: {item.capital}</p>
                  <p>Population: {item.population}</p>
                  <p>Currency: {item.currency}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default CountryData;
