import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { setFilterName, filteredPlanets,
    setFilteredPlanets } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortOrder, setsortOrder] = useState('ASC');

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

  const updateSortKey = ({ target }) => {
    setSortColumn(target.value);
  };

  const updateSortOrder = ({ target }) => {
    setsortOrder(target.value);
  };

  const handleSort = () => {
    const DESCENDING_VALUE = -1;

    const sortedPlanets = [...filteredPlanets].sort((a, b) => {
      const numA = a[sortColumn];
      const numB = b[sortColumn];

      if (numA === 'unknown' && numB === 'unknown') {
        return 0;
      }

      if (numA === 'unknown') {
        return 1;
      }

      if (numB === 'unknown') {
        return DESCENDING_VALUE;
      }

      const valA = parseInt(numA, 10);
      const valB = parseInt(numB, 10);

      return sortOrder === 'ASC' ? valA
       - valB : valB - valA;
    });

    setFilteredPlanets(sortedPlanets);
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

      <select
        name="sort-column"
        data-testid="column-sort"
        value={ sortColumn }
        onChange={ updateSortKey }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <div>
        <input
          type="radio"
          name="sort-direction"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sortOrder === 'ASC' }
          onChange={ updateSortOrder }
        />
        <label htmlFor="column-sort-input-asc">Ascendente</label>
      </div>

      <div>
        <input
          type="radio"
          name="sort-direction"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sortOrder === 'DESC' }
          onChange={ updateSortOrder }
        />
        <label htmlFor="column-sort-input-desc">Descendente</label>
      </div>

      <button data-testid="column-sort-button" onClick={ handleSort }>
        ORDENAR
      </button>
      {/* Botão de exclusão de filtro */}
      <div data-testid="filter">
        <button>Remover Filtro</button>
      </div>

      {/* Botão de remover todas as filtragens */}
      <button data-testid="button-remove-filters">
        Remover todas as filtragens
      </button>
    </div>
  );
}

export default Filter;
