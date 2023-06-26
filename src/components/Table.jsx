import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { state } = useContext(PlanetsContext);
  const { planets, planetName, filterName, sort, sorted } = state;

  const applyPlanetNameFilter = (planet) => planet.name
    .toLowerCase().includes(planetName.toLowerCase());

  const applyFilter = (planet, key) => {
    if (filterName[key].comparison === '') return true;
    const { value, comparison } = filterName[key];
    switch (comparison) {
    case 'maior que':
      return +planet[key] > +value;
    case 'menor que':
      return +planet[key] < +value;
    case 'igual a':
      return +planet[key] === +value;
    default:
      return true;
    }
  };
  const mN = -1;

  const applySort = (a, b) => {
    if (!sorted) {
      return 0;
    }
    if (a[sort.column] === 'unknown') return 1;
    if (b[sort.column] === 'unknown') return mN;
    if (sort.sort === 'ASC') {
      return +a[sort.column] - +b[sort.column];
    }
    return +b[sort.column] - +a[sort.column];
  };

  const filteredPlanets = planets
    .filter(applyPlanetNameFilter)
    .filter((planet) => Object.keys(filterName).every((key) => applyFilter(planet, key)))
    .sort(applySort);

  if (planets.length === 0) {
    return <h2>Carregando...</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(planets[0]).map((key) => (
            <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((value, i) => (
              <td data-testid={ i === 0 && 'planet-name' } key={ value }>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
