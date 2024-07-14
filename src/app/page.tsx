"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrayerItem from '../components/PrayerItem';

interface Prayer {
  _id: string;
  name: string;
  qazaCount: number;
  lastUpdated: string;
}

const HomePage: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [sumOfQazaNamaz, setSumOfQazaNamaz] = useState<number>(0);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        let response = await axios.get('/api/prayers');
        let prayersData = response.data;

        if (!prayersData.length) {
          response = await axios.post('/api/prayers/initialize');
          prayersData = response.data;
        }

        setPrayers(prayersData);
        const totalQazaCount = prayersData.reduce((sum: number, prayer: Prayer) => sum + prayer.qazaCount, 0);
        setSumOfQazaNamaz(totalQazaCount);
      } catch (error) {
        console.error('Error fetching prayers:', error);
      }
    };

    fetchPrayers();
  }, []);

  return (
    <div className="p-6">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-6">Qaza Tracker</h1>
        <h1 className="text-2xl font-bold mb-6">Total {sumOfQazaNamaz}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {prayers.map((prayer) => (
          <PrayerItem key={prayer._id} prayer={prayer} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
