import React from "react";

const CoinModal = ({ isOpen, closeModal, coinDetails }) => {
  if (!isOpen || !coinDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-8 rounded-lg z-10 max-w-2xl overflow-auto shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">
          {coinDetails.name} Details
        </h2>
        <p className="text-black">
          Market Cap Rank: {coinDetails.market_cap_rank}
        </p>
        <p className="text-black">Name: {coinDetails.name}</p>
        <p className="text-black">Symbol: {coinDetails.symbol}</p>
        <p className="text-black">Current Price: {coinDetails.current_price}</p>
        <p className="text-black">
          Price Change 24h: {coinDetails.price_change_percentage_24h.toFixed(2)}
          %
        </p>
        <p className="text-black">Market Cap: {coinDetails.market_cap}</p>
        <p className="text-black">Total Volume: {coinDetails.total_volume}</p>
        <p className="text-black">Low 24h: {coinDetails.low_24h}</p>
        <p className="text-black">High 24h: {coinDetails.high_24h}</p>
        <p className="text-black">Total Supply: {coinDetails.total_supply}</p>
        <p className="text-black">Max Supply: {coinDetails.max_supply}</p>
        <p className="text-black">
          Circulating Supply: {coinDetails.circulating_supply}
        </p>
        <p className="text-black">All Time High (ath): {coinDetails.ath}</p>
        <p className="text-black">
          Last Updated Date: {coinDetails.last_updated}
        </p>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CoinModal;
