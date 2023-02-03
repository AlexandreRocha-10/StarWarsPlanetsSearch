import { useEffect, useContext, useState } from 'react';
import CreateContext from '../context/CreateContext';
import Table from './Table';

const resetOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function Filters() {
  const { planetAPI } = useContext(CreateContext);

  const [planetName, setplanetName] = useState('');
  const handleInputChange = ({ target }) => { setplanetName(target.value); };

  const [input, setInput] = useState({
    columFilter: 'population',
    columOperator: 'maior que',
    valueFilter: 0,
    columoptions: ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'],
    columnSort: 'population',
    sort: 'ASC',
  });
  const handleChange = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };
  const [usedFilters, setUsedFilters] = useState([]);
  const [dataPlanets, setDataPlanets] = useState(planetAPI);
  const [sorting, setSorting] = useState({});

  const handleButtonFilter = () => {
    setInput({ ...input,
      columOperator: 'maior que',
      valueFilter: 0,
      columoptions: input.columoptions
        .filter((item) => item !== input.columFilter),
      columFilter: input.columoptions[0],
    });
    setUsedFilters([...usedFilters,
      { column: input.columFilter,
        operator: input.columOperator,
        value: input.valueFilter,
      },
    ]);
  };

  const handleDeleteFiltersBtn = () => {
    setUsedFilters([]);
    setInput({ ...input, columoptions: resetOptions });
  };

  const handleDeleteEspecifyBtn = ({ target }) => {
    const { value } = target;
    if (usedFilters.length > 1) {
      const filtersArr = usedFilters
        .filter((filter) => filter.column !== value);
      const columOptionsArr = [...input.columoptions, value];
      setInput({ ...input, columoptions: columOptionsArr });
      setUsedFilters(filtersArr);
    } else { setUsedFilters([]); }
  };

  const handleSort = () => {
    const testSort = { sort: input.sort, column: input.columnSort };
    setSorting(testSort);
  };

  useEffect(() => {
    let ApiPlanetsList = planetAPI;
    const sortColumnFilter = sorting.column;
    const sortRadioOption = sorting.sort;
    ApiPlanetsList = ApiPlanetsList.sort((a, b) => {
      const reverse = -1;
      if (sortRadioOption === 'ASC') {
        const arrSort = a[sortColumnFilter] - b[sortColumnFilter];
        if (a[sortColumnFilter] === 'unknown') {
          return 1;
        } if (b[sortColumnFilter] === 'unknown') {
          return reverse;
        } return arrSort;
      }
      if (sortRadioOption === 'DESC') {
        const arrSort = b[sortColumnFilter] - a[sortColumnFilter];
        return arrSort;
      } return ApiPlanetsList;
    }); setDataPlanets(ApiPlanetsList);
  }, [sorting, planetAPI]);

  useEffect(() => {
    const filtersArray = usedFilters;
    let ApiPlanetsList = planetAPI;
    filtersArray.forEach((filter) => {
      const { column, value } = filter;
      if (filter.operator === 'maior que') {
        ApiPlanetsList = ApiPlanetsList
          .filter((planet) => +planet[column] > +value);
      }
      if (filter.operator === 'menor que') {
        ApiPlanetsList = ApiPlanetsList
          .filter((planet) => +planet[column] < +value);
      }
      if (filter.operator === 'igual a') {
        ApiPlanetsList = ApiPlanetsList
          .filter((planet) => +planet[column] === +value);
      }
    });
    setDataPlanets(ApiPlanetsList);
  }, [usedFilters, planetAPI]);

  useEffect(() => {
    const filteredPlanets = planetAPI.filter((planet) => planet.name
      .toLowerCase().includes(planetName));
    setDataPlanets(filteredPlanets);
  }, [planetName, planetAPI]);

  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ handleInputChange }
        />
        <div>
          <label htmlFor="column-filter">
            Coluna
            <select
              name="columFilter"
              id="columFilter"
              data-testid="column-filter"
              value={ input.columFilter }
              onChange={ handleChange }
            >
              { input.columoptions.map((option, index) => (
                <option key={ `${option}${index}` } value={ option }>{ option }</option>
              ))}
            </select>
          </label>
          <select
            name="columOperator"
            id="columOperator"
            data-testid="comparison-filter"
            value={ input.columOperator }
            onChange={ handleChange }
          >
            <option key="maior que" value="maior que">maior que</option>
            <option key="menor que" value="menor que">menor que</option>
            <option key="igual a" value="igual a">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            type="number"
            name="valueFilter"
            onChange={ handleChange }
            value={ input.valueFilter }
          />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ handleButtonFilter }
          >
            Filtrar
          </button>
        </div>
        <div>
          <br />
          <label htmlFor="column-sort">
            Ordem:
            <select
              data-testid="column-sort"
              name="columnSort"
              id="column-sort"
              onChange={ handleChange }
              value={ input.columnSort }
            >
              {resetOptions.map((item, index) => (
                <option key={ item + index }>
                  { item }
                </option>))}
            </select>
          </label>
          <label htmlFor="ASC">
            <input
              type="radio"
              name="sort"
              id="ASC"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ handleChange }
            />
            ASC
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              id="DESC"
              name="sort"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ handleChange }
            />
            DESC
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleSort }
          >
            Ordenar
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleDeleteFiltersBtn }
          >
            Remover Filtros
          </button>
        </div>
        <div>
          { usedFilters.map((filter, index) => (
            <div key={ `${filter.column} ${index}` }>
              <p data-testid="filter">
                { `${filter.column} ${filter.operator} ${filter.value}` }
                <button
                  type="button"
                  onClick={ handleDeleteEspecifyBtn }
                  value={ filter.column }
                >
                  🗑
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Table dataPlanets={ dataPlanets } planetName={ planetName } />
    </div>
  );
}

export default Filters;
