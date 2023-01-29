import { useEffect, useState } from 'react';

function Table() {
  const [apiInfos, setApiInfos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      // json.map((item) => delete item.residents);
      setApiInfos(json.results);
    };
    fetchApi();
  }, []);

  const planets = apiInfos.filter((item) => delete item.residents);
  const filtered = planets.filter((planet) => planet.name
    .toLowerCase().includes(input.toLowerCase()));

  return (
    <>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Buscar por planetas"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
        />
      </div>
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
        {filtered.map((planet) => (
          <tbody key={ planet.name }>
            <tr>
              <td>{planet.name}</td>
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
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Table;
