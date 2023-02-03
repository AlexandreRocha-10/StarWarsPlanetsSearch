import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlanetProvider from '../context/PlanetProvider';

describe('Teste a página  <App.js />', () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  }) 

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('Teste se a API é chamada corretamente', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));
    
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://swapi.dev/api/planets');
    });

  it('Teste se o Título estão sendo renderizado na tela', async  () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const title = screen.getByText(/Projeto Star Wars - Trybe/i);
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página possui um input digitável', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('Testa se a página possui inputs de pesquisa e se a filtragem está funcionando corretamente', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    await act(async () => {
      userEvent.type(nameFilter, 'tatooine');
    });
  
    const planetName = screen.getByRole('cell', {  name: /tatooine/i })
    expect(planetName).toBeInTheDocument();

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
  });

  it('Teste se a página possui um botão de filtro', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('Teste se a página possui uma tabela e se os planetas são renderizados corretamente', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Tatooine');
    expect(planets[1]).toHaveTextContent('Alderaan');
    expect(planets[2]).toHaveTextContent('Yavin IV');
    expect(planets[3]).toHaveTextContent('Hoth');
    expect(planets[4]).toHaveTextContent('Dagobah');
    expect(planets[5]).toHaveTextContent('Bespin');
    expect(planets[6]).toHaveTextContent('Endor');
    expect(planets[7]).toHaveTextContent('Naboo');
    expect(planets[8]).toHaveTextContent('Coruscant');
    expect(planets[9]).toHaveTextContent('Kamino');

    const name = screen.getByRole('columnheader', { name: /name/i });
    expect(name).toBeInTheDocument();

    const rotation_period = screen.getByRole('columnheader', { name: /rotation_period/i });
    expect(rotation_period).toBeInTheDocument();

    const orbital_period = screen.getByRole('columnheader', { name: /orbital_period/i });
    expect(orbital_period).toBeInTheDocument();

    const diameter = screen.getByRole('columnheader', { name: /diameter/i });
    expect(diameter).toBeInTheDocument();

    const climate = screen.getByRole('columnheader', { name: /climate/i });
    expect(climate).toBeInTheDocument();

    const gravity = screen.getByRole('columnheader', { name: /gravity/i });
    expect(gravity).toBeInTheDocument();

    const terrain = screen.getByRole('columnheader', { name: /terrain/i });
    expect(terrain).toBeInTheDocument();

    const surface_water = screen.getByRole('columnheader', { name: /surface_water	/i });
    expect(surface_water).toBeInTheDocument();

    const population = screen.getByRole('columnheader', { name: /population	/i });
    expect(population).toBeInTheDocument();

    const films = screen.getByRole('columnheader', { name: /films/i });
    expect(films).toBeInTheDocument();

    const created = screen.getByRole('columnheader', { name: /created/i });
    expect(created).toBeInTheDocument();

    const edited = screen.getByRole('columnheader', { name: /edited/i });
    expect(edited).toBeInTheDocument();

    const url = screen.getByRole('columnheader', { name: /url/i });
    expect(url).toBeInTheDocument();
  });

  it('Teste a função de clique do botão Filter', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toHaveValue('population');

    userEvent.selectOptions(columnFilter, 'orbital_period');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toHaveValue('maior que');

    userEvent.selectOptions(comparisonFilter, 'menor que');

    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toHaveValue(0);

    userEvent.type(valueFilter, '8900');

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    const btnRemoveFilter = screen.getAllByTestId('button-remove-filter')
    expect(btnRemoveFilter).toHaveLength(1);

    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '15000')
    userEvent.click(filterButton);
    const btnRemoveFilter2 = screen.getAllByTestId('button-remove-filter')
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(7);
    expect(btnRemoveFilter2).toHaveLength(7);
  });

  it('Teste os filtros de ordenação ascendente', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));
    
    const columnSort = screen.getByTestId('column-sort')
    const sortInputAsc = screen.getByTestId('column-sort-input-asc')
    const btnSort = screen.getByTestId('column-sort-button')

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(sortInputAsc);
    expect(sortInputAsc).toBeChecked()
    userEvent.click(btnSort);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Endor');
    expect(planets[1]).toHaveTextContent('Hoth');
    expect(planets[2]).toHaveTextContent('Dagobah');
    expect(planets[3]).toHaveTextContent('Yavin IV');
    expect(planets[4]).toHaveTextContent('Tatooine');
    expect(planets[5]).toHaveTextContent('Naboo');
    expect(planets[6]).toHaveTextContent('Coruscant');
    expect(planets[7]).toHaveTextContent('Alderaan');
    expect(planets[8]).toHaveTextContent('Kamino');
    expect(planets[9]).toHaveTextContent('Bespin');
  });
  
  it('Teste os filtros de ordenação descendente', async () => {
    await act(() => render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    ));

    const columnSort = screen.getByTestId('column-sort')
    const sortInputDesc = screen.getByTestId('column-sort-input-desc')
    const btnSort = screen.getByTestId('column-sort-button')

    userEvent.click(sortInputDesc);
    expect(sortInputDesc).toBeChecked()
    userEvent.selectOptions(columnSort, 'population'); 
    userEvent.click(btnSort);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Coruscant');
    expect(planets[1]).toHaveTextContent('Naboo');
    expect(planets[2]).toHaveTextContent('Alderaan');
    expect(planets[3]).toHaveTextContent('Kamino');
    expect(planets[4]).toHaveTextContent('Endor');
    expect(planets[5]).toHaveTextContent('Bespin');
    expect(planets[6]).toHaveTextContent('Tatooine');
    expect(planets[7]).toHaveTextContent('Yavin IV');
    expect(planets[8]).toHaveTextContent('Hoth');
    expect(planets[9]).toHaveTextContent('Dagobah');
  });
});
