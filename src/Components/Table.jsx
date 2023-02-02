import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateContext from '../context/CreateContext';

function Table() {
  const { planetAPI } = useContext(CreateContext);

  const [planetName, setplanetName] = useState('');
  const [filteredPlanets, setfilteredPlanets] = useState([]);

  const [columnFilter, setcolumnFilter] = useState('population');
  const [operatorFilter, setoperatorFilter] = useState('maior que');
  const [NumberFilter, setNumberFilter] = useState(0);

  useEffect(() => {
    const filterPlanetsByName = planetAPI.filter((planet) => planet.name
      .toLowerCase().includes(planetName));
    setfilteredPlanets(filterPlanetsByName);
  }, [planetName, planetAPI]);

  const handleButtonFilter = () => {
    let multipleFilters = [];
    if (operatorFilter === 'maior que') {
      planetAPI
        .filter((planet) => +(planet[columnFilter])
        > +(NumberFilter) && multipleFilters.push(planet));
    } else if (operatorFilter === 'menor que') {
      planetAPI
        .filter((planet) => +(planet[columnFilter])
        < +(NumberFilter) && multipleFilters.push(planet));
    } else {
      multipleFilters = filteredPlanets
        .filter((planet) => +(planet[columnFilter])
        === +(NumberFilter) && multipleFilters.push(planet));
    }
    setfilteredPlanets(multipleFilters);

    // Removendo elemento da coluna de pesquisa:
    document.getElementById(columnFilter).remove();
    setcolumnFilter(document.getElementById('column-filter').firstChild.value);
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setplanetName(value);
  };

  const handleColumnChanges = ({ target }) => {
    const { value } = target;
    setcolumnFilter(value);
  };
  const handleOperatorChanges = ({ target }) => {
    const { value } = target;
    setoperatorFilter(value);
  };
  const handleNumberChanges = ({ target }) => {
    const { value } = target;
    setNumberFilter(value);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleInputChange }
      />

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column-filter"
          onChange={ handleColumnChanges }
          id="column-filter"
        >
          <option value="population" id="population">population</option>
          <option value="orbital_period" id="orbital_period">orbital_period</option>
          <option value="diameter" id="diameter">diameter</option>
          <option value="rotation_period" id="rotation_period">rotation_period</option>
          <option value="surface_water" id="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          onChange={ handleOperatorChanges }
        >
          <option id="maior que" value="maior que">maior que</option>
          <option id="menor que" value="menor que">menor que</option>
          <option id="igual a" value="igual a">igual a</option>
        </select>
      </label>

      <input
        data-testid="value-filter"
        type="number"
        onChange={ handleNumberChanges }
        value={ NumberFilter }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleButtonFilter }
      >
        Filtrar
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planets-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  planetAPI: PropTypes.arrayOf(PropTypes.objectOf),
}.isRequired;

export default Table;
