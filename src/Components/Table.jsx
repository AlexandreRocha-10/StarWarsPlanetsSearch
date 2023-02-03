import { useContext } from 'react';
import PropTypes from 'prop-types';
import CreateContext from '../context/CreateContext';

function Table({ dataPlanets, planetName }) {
  const { tableHead } = useContext(CreateContext);

  return (
    <table>
      <thead>
        <tr>
          {tableHead.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          dataPlanets.filter((planet) => (
            planet.name.toLowerCase()).includes(planetName.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet).map((item, index) => {
                    if (planet.name === item) {
                      return (
                        <td
                          data-testid="planet-name"
                          key={ `${item}${index}` }
                        >
                          {item}
                        </td>
                      );
                    } return (
                      <td
                        key={ `${item}${index}` }
                      >
                        {item}
                      </td>
                    );
                  })
                }
              </tr>))
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  dataPlanets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      population: PropTypes.string,
      films: PropTypes.arrayOf,
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  planetName: PropTypes.string.isRequired,
};

export default Table;
