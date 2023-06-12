import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const URL = 'https://swapi.dev/api/planets/';

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      const result = data.results.filter((planet) => delete planet.residents);
      setPlanets(result);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filterPlanets = () => {
      setFilteredPlanets(planets.filter(({ name }) => (
        name.toLowerCase().includes(filterName.toLowerCase())
      )));
    };
    filterPlanets();
  }, [filterName, planets]);

  const contextValue = {
    planets,
    filterName,
    setFilterName,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
