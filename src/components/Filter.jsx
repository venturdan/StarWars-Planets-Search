import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { setFilterName, filteredPlanets,
    setFilteredPlanets } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnSelect = ({ target }) => {
    const { value } = target;
    setColumn(value);
  };

  const onComparisonSelect = ({ target }) => {
    const { value } = target;
    setComparison(value);
  };

  const onFilterValueChange = ({ target }) => {
    const { value } = target;
    setFilterValue(value);
  };

  const filterSelectHandler = () => {
    if (selectedColumns.includes(column)) {
      return;
    }

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

    setSelectedColumns([...selectedColumns, column]);
    setColumn('population');
  };

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((columns) => !selectedColumns.includes(columns));

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
          value={ column }
        >
          {columnOptions.map((columns) => (
            <option key={ columns } value={ columns }>
              {columns}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          onChange={ onComparisonSelect }
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
          onChange={ onFilterValueChange }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterSelectHandler }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filter;
