import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.some((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = filterBy === "All" 
    ? sortedStocks 
    : sortedStocks.filter(stock => stock.type === filterBy);

  return (
    <div>
      <Header />
      <MainContainer
        stocks={filteredStocks}
        portfolio={portfolio}
        buyStock={buyStock}
        sellStock={sellStock}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
      />
    </div>
  );
}

export default App;