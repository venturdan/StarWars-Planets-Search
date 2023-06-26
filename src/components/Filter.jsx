import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { state, setState } = useContext(PlanetsContext);
  const { filterName } = state;
  const {
    population,
    orbital_period: orbitalPeriod,
    diameter,
    rotation_period: rotationPeriod,
    surface_water: surfaceWater,
  } = filterName;

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);
  const [sort, setSort] = useState({ column: 'population', sort: 'ASC' });

  const handleFilterClick = () => {
    setState({
      ...state,
      filterName: {
        ...filterName,
        [selectedColumn]: {
          value: selectedValue,
          comparison: selectedComparison,
        },
      },
    });
    setSelectedColumn('');
    setSelectedComparison('maior que');
    setSelectedValue(0);
  };

  const removeFilter = (filter) => {
    setState({
      ...state,
      filterName: {
        ...filterName,
        [filter]: { value: 0, comparison: '' },
      },
    });
  };

  const handleNameChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        name="planetName"
        onChange={ handleNameChange }
        placeholder="Pesquisar"
      />

      <select
        name="column-filter"
        data-testid="column-filter"
        onClick={ ({ target: { value } }) => setSelectedColumn(value) }
      >
        {population.comparison.length === 0
        && <option value="population">population</option>}
        {orbitalPeriod.comparison.length === 0
        && <option value="orbital_period">orbital_period</option>}
        {rotationPeriod.comparison.length === 0
        && <option value="rotation_period">rotation_period</option>}
        {diameter.comparison.length === 0
        && <option value="diameter">diameter</option>}
        {surfaceWater.comparison.length === 0
        && <option value="surface_water">surface_water</option>}
      </select>

      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setSelectedComparison(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => setSelectedValue(value) }
        name="value-filter"
        value={ selectedValue }
        type="number"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterClick }
        disabled={ selectedColumn === '' }
      >
        Filtrar
      </button>

      <select
        data-testid="column-sort"
        value={ sort.column }
        onChange={ ({ target: { value } }) => { setSort({ ...sort, column: value }); } }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <label htmlFor="ASC">ASC</label>
      <input
        value="ASC"
        type="radio"
        name="sort"
        id="ASC"
        checked={ sort.sort === 'ASC' }
        onChange={ () => setSort({ ...sort, sort: 'ASC' }) }
        data-testid="column-sort-input-asc"
      />

      <label htmlFor="DESC">DESC</label>
      <input
        value="DESC"
        checked={ sort.sort === 'DESC' }
        onChange={ () => setSort({ ...sort, sort: 'DESC' }) }
        type="radio"
        name="sort"
        id="DESC"
        data-testid="column-sort-input-desc"
      />

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => { setState({ ...state, sort, sorted: true }); } }
      >
        Ordenar
      </button>
      {Object.keys(filterName)
        .filter((filter) => filter !== 'planetName'
        && filterName[filter].comparison !== '')
        .map((filter) => (
          <div data-testid="filter" key={ filter }>
            {`${filter}: ${filterName[filter].value} ${filterName[filter].comparison}`}
            <button type="button" onClick={ () => { removeFilter(filter); } }>
              Remover Filtro
            </button>
          </div>
        ))}

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setState({
            ...state,
            filterName: {
              population: { value: 0, comparison: '' },
              orbital_period: { value: 0, comparison: '' },
              diameter: { value: 0, comparison: '' },
              rotation_period: { value: 0, comparison: '' },
              surface_water: surfaceWater,
              planetName: '',
            },
          });
        } }
      >
        Remover todas as filtragens
      </button>
    </form>
  );
}

export default Filter;
