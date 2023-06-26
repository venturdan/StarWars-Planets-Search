import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

const PLANETS_STATE = {
  planets: [],
  planetName: '',
  filterName: {
    diameter: { value: 0, comparison: '' },
    orbital_period: { value: 0, comparison: '' },
    population: { value: 0, comparison: '' },
    rotation_period: { value: 0, comparison: '' },
    surface_water: { value: 0, comparison: '' },
  },
  sort: { column: 'population', sort: 'ASC' },
  sorted: false,
};

function PlanetsProvider({ children }) {
  const [planetsState, setPlanetsState] = useState(PLANETS_STATE);

  const fetchPlanetsAPI = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const result = data.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    return result;
  };

  const updatePlanetsState = (planets) => {
    setPlanetsState({ ...PLANETS_STATE, planets });
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetchPlanetsAPI();
      updatePlanetsState(planets);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    state: planetsState,
    setState: setPlanetsState,
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
