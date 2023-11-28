import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import CoinModal from "./CoinModal";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error"));
  }, [selectedCurrency, currentPage]);

  const openModal = (coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;

  const handleSort = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) =>
      sortOrder === "asc"
        ? a.market_cap - b.market_cap
        : b.market_cap - a.market_cap
    );
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCoins = data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Crypto Coins</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Change Currency:</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="border p-2"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2"
          />
        </div>
      </div>
      <table className="table-auto min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-yellow-400 text-left">
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Symbol</th>
            <th className="py-2 px-4">Current Price</th>
            <th className="py-2 px-4">Price Change 24h</th>
            <th className="py-2 px-4 cursor-pointer" onClick={handleSort}>
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCoins.map((item) => (
            <DisplayCard
              key={item.id} 
              coinData={item}
              currencySymbol={getCurrencySymbol(selectedCurrency)}
              openModal={openModal}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        coinsPerPage={coinsPerPage}
        totalCoins={filteredCoins.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
      <CoinModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        coinDetails={selectedCoin}
      />
    </div>
  );
};

const Pagination = ({ coinsPerPage, totalCoins, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`mx-1 p-2 border ${
            number === currentPage
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          } cursor-pointer`}
          onClick={() => paginate(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return currency;
  }
};

export default Homepage;
