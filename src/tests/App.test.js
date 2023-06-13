import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Filter from '../components/Filter';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, App!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Filter component', () => {
    render(
      <PlanetsContext.Provider value={{}}>
        <App />
      </PlanetsContext.Provider>
    );

  });

  test('renders Table component', () => {
    const planetsMock = [
      { name: 'Planet 1', rotation_period: '24', orbital_period: '365' },
      { name: 'Planet 2', rotation_period: '30', orbital_period: '400' },
    ];

    render(
      <PlanetsContext.Provider value={{ planets: planetsMock, filteredPlanets: planetsMock }}>
        <App />
      </PlanetsContext.Provider>
    );

    const planet1NameElement = screen.getByText('Planet 1');
    const planet2NameElement = screen.getByText('Planet 2');
    expect(planet1NameElement).toBeInTheDocument();
    expect(planet2NameElement).toBeInTheDocument();
  });


});

describe('Filter', () => {

});

describe('Table', () => {

});
