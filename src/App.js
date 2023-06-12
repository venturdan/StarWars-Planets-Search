import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Filter from './components/Filter';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
