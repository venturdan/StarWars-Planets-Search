import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockPlanets from './helpers/mockPlanets';

const planets = mockPlanets.results.map((planet) => {
  delete planet.residents;
  return planet;
});
const apiUrl = 'https://swapi.dev/api/planets';

const planetsName = planets.map(({name}) => name);
const columnsOp = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const comparasionsOp = [ 'maior que', 'menor que', 'igual a' ];

describe('Testando o Componente Filter', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPlanets),
    });
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se a aplicação faz uma requisição à API', async () => {
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });

    expect(fetch).toHaveBeenCalledWith(apiUrl);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  
  it('Verifica se o select de coluna está renderizado corretamente', async () => {
    await act(() => render(<App />));
    
    const columnFilterSelect = screen.getByTestId('column-filter');
    
    expect(columnFilterSelect).toBeInTheDocument();
    expect(columnFilterSelect.tagName).toBe('SELECT');
  });
  
  it('Verifica se o select de comparação está renderizado corretamente', async () => {
    await act(() => render(<App />));
    
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    
    expect(comparisonFilterSelect).toBeInTheDocument();
    expect(comparisonFilterSelect.tagName).toBe('SELECT');
  });
  
  it('Verifica se o input para o valor do filtro está renderizado corretamente', async () => {
    await act(() => render(<App />));
    
    const valueFilterInput = screen.getByTestId('value-filter');
    
    expect(valueFilterInput).toBeInTheDocument();
    expect(valueFilterInput).toHaveAttribute('type', 'number');
  });

  it('Verifica se a tabela tem uma linha para cada planeta', async () => {
    await act(() => render(<App />));
    const rows = screen.getAllByRole('cell').map((item) => item.textContent);
    expect(rows).toEqual(expect.arrayContaining(planetsName));
  });

  it('Renderiza o campo de texto para o filtro de nomes', async () => {
    await act(() => render(<App />));

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  });

  it('Testa se filtra os planetas que possuem a letra o no nome', async () => {
    await act(() => render(<App />));

    const names = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    expect(names).toEqual(planetsName);

    act(() => userEvent.type(screen.getByTestId('name-filter'), 'o'));
  
    const names2 = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    const namesFiltered = planetsName.filter((planet) => planet.includes('o'));

    expect(names2).toEqual(namesFiltered);
  });

  it('Testa se filtra os planetas que possuem a letra oo no nome e em sequencia testa a remoção do filtro por texto', async () => {
    await act(() => render(<App />));

    act(() => userEvent.type(screen.getByTestId('name-filter'), 'oo'));
  
    const names = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    const namesFiltered = planetsName.filter((planet) => planet.includes('oo'));

    expect(names).toEqual(namesFiltered);

    userEvent.clear(screen.getByTestId('name-filter'));
    const allNames = screen.getAllByTestId('planet-name').map((item) => item.textContent);

    expect(allNames).toEqual(planetsName);
  });

  it('Renderiza o select de comparação e suas opções', async () => {
    await act(() => render(<App />));

    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();

    const comparisonSelect = Object.values(screen.getByTestId('comparison-filter')).map((item) => item.textContent).filter((option) => option !== undefined);

    expect(comparisonSelect).toEqual(comparasionsOp);

  });

  it('Verifica o input para o valor do filtro', async () => {
    await act(() => render(<App />));
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  });

  it('Utiliza o botão de filtrar sem alterar os valores', async () => {
    await act(() => render(<App />));

    act(() => userEvent.click(screen.getByTestId('button-filter')));

    const filteredPlanets = screen.getAllByTestId('planet-name').map((item) => item.textContent);

    const expectedFilteredPlanets = planets.filter((planet) => planet.population > 0).map((planet) => planet.name);

    expect(filteredPlanets).toEqual(expectedFilteredPlanets);
  });


  it('Verifica se remove todos os filtros', async () => {
    await act(() => render(<App />));

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '400');

    act(() => userEvent.click(screen.getByTestId('button-filter')));

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'surface_water');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.type(screen.getByTestId('value-filter'), '100');

    act(() => userEvent.click(screen.getByTestId('button-filter')));

    act(() => userEvent.click(screen.getByTestId('button-remove-filters')));

  });

  it('Verifica se ordena por populacao', async () => {
    await act(() => render(<App />));

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    userEvent.click(screen.getByTestId('column-sort-input-asc'));

    act(() => userEvent.click(screen.getByTestId('column-sort-button')));

    const namesSort = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    
    const namesSortExpected = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];

    expect(namesSort).toEqual(namesSortExpected);
  });

});