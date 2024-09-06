import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import CommodityFilter from '../components/Grafik/CommodityTable';
import MarketFilter from '../components/Grafik/MarketFilter';
import DateFilter from '../components/Grafik/DateFilter';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Chart = () => {
  const [data, setData] = useState([]);
  const [commodity, setCommodity] = useState('');
  const [market, setMarket] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const result = await http.get(`localhost:5000/komoditi/komoditi-statistik?id=54`);
        setData(result.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCommodityChange = (selectedCommodity) => {
    setCommodity(selectedCommodity);
  };

  const handleMarketChange = (selectedMarket) => {
    setMarket(selectedMarket);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const filterData = () => {
    // Filter logic based on commodity, market, and date
    let filteredData = data;

    if (commodity) {
      filteredData = filteredData.filter(item => item.komoditi_name === commodity);
    }
    if (market) {
      // Apply market filter if applicable
    }
    if (date) {
      // Apply date filter if applicable
    }

    return {
      labels: filteredData.tanggalArray,
      datasets: [
        {
          label: 'Price',
          data: filteredData.hargaMataUang.map(price => parseFloat(price.replace('.', '').replace(',', '.'))),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  return (
    <div>
      <CommodityFilter
        commodities={['Tepung Terigu Cap Segitiga Biru', 'Other Commodity']}
        onSelectCommodity={handleCommodityChange}
      />
      <MarketFilter
        markets={['Market 1', 'Market 2']}
        onSelectMarket={handleMarketChange}
      />
      <DateFilter onSelectDate={handleDateChange} />

      <Line data={filterData()} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (tooltipItem) => `Rp ${tooltipItem.raw.toFixed(2)}k` } } } }} />
    </div>
  );
};

export default Chart;
