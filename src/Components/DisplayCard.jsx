import React, { useState } from "react";
import CoinModal from "./CoinModal";

const DisplayCard = ({ coinData, currencySymbol }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr
        className="border-b border-gray-200 hover:bg-gray-100"
        onClick={openModal}
        style={{ cursor: "pointer" }}
      >
        <td className="p-2">
          <img src={coinData.image} alt={coinData.name} className="w-8 h-8" />
        </td>
        <td className="p-2">{coinData.name}</td>
        <td className="p-2">{coinData.symbol}</td>
        <td className="p-2">{`${currencySymbol} ${coinData.current_price.toFixed(
          2
        )}`}</td>
        <td
          className={`p-2 ${
            coinData.price_change_percentage_24h < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {coinData.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td className="p-2">{`${currencySymbol} ${coinData.market_cap.toFixed(
          2
        )}`}</td>
      </tr>
      <CoinModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        coinDetails={coinData}
      />
    </>
  );
};

export default DisplayCard;
