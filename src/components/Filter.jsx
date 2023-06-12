import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { setFilterName, filteredPlanets,
    setFilteredPlanets } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  const handleColumnSelect = ({ target }) => {
    const { value } = target;
    setColumn(value);
  };

  const handleComparisonSelect = ({ target }) => {
    const { value } = target;
    setComparison(value);
  };

  const handleFilterValueChange = ({ target }) => {
    const { value } = target;
    setFilterValue(value);
  };

  const handleFilterButtonClick = () => {
    setFilteredPlanets(filteredPlanets.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(filterValue);
      case 'menor que':
        return Number(planet[column]) < Number(filterValue);
      case 'igual a':
        return Number(planet[column]) === Number(filterValue);
      default:
        return planet;
      }
    }));
  };

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  return (
    <div className="filter-div">
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          id="name-filter"
          type="text"
          placeholder="Pesquisar"
          onChange={ handleNameChange }
        />
      </label>

      <label htmlFor="column-filter">
        Coluna:
        <select
          data-testid="column-filter"
          id="column-filter"
          onChange={ handleColumnSelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          onChange={ handleComparisonSelect }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          id="value-filter"
          type="number"
          value={ filterValue }
          placeholder="Pesquisar"
          onChange={ handleFilterValueChange }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilterButtonClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filter;
