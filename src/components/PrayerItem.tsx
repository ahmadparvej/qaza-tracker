"use client"
import React, { useState } from "react";
import axios from "axios";
import { MdAddCircleOutline, MdOutlineRemoveCircleOutline, MdDeleteOutline } from "react-icons/md";

interface PrayerProps {
  prayer: {
    _id: string;
    name: string;
    qazaCount: number;
    lastUpdated: string;
  };
}

const PrayerItem: React.FC<PrayerProps> = ({ prayer }) => {
  const [qazaCount, setQazaCount] = useState<number>(prayer.qazaCount);

  const incrementQaza = async () => {
    const updatedPrayer = { qazaCount: qazaCount + 1 };
    await axios.put(`/api/prayers/${prayer._id}`, updatedPrayer);
    setQazaCount(qazaCount + 1);
  };

  const decrementQaza = async () => {
    if (qazaCount > 0) {
      const updatedPrayer = { qazaCount: qazaCount - 1 };
      await axios.put(`/api/prayers/${prayer._id}`, updatedPrayer);
      setQazaCount(qazaCount - 1);
    }
  };

  const updateQazaCount = async (count: number) => {
    const updatedPrayer = { qazaCount: count };
    await axios.put(`/api/prayers/${prayer._id}`, updatedPrayer);
    setQazaCount(count);
  };

  const deleteCard = async () => {
    await axios.delete(`/api/prayers/${prayer._id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (!isNaN(newCount)) {
      setQazaCount(newCount);
      updateQazaCount(newCount);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{prayer.name}</h3>
        {/* <MdDeleteOutline className="w-6 h-6 cursor-pointer" onClick={deleteCard} /> */}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <label htmlFor="qazaCount" className="mr-3">Qaza Count:</label>
        <input
          id="qazaCount"
          type="number"
          value={qazaCount}
          onChange={handleInputChange}
          className="w-16 text-center border rounded-md p-1"
        />
        <div className="flex">
          <div className="cursor-pointer" onClick={decrementQaza}>
            <MdOutlineRemoveCircleOutline className="w-8 h-8" />
          </div>
          <div className="cursor-pointer" onClick={incrementQaza}>
            <MdAddCircleOutline className="w-8 h-8" />
          </div>
        </div>
      </div>
      <p>Last Updated: {new Date(prayer.lastUpdated).toLocaleString()}</p>
    </div>
  );
};

export default PrayerItem;
