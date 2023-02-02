import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CreateContext from './CreateContext';

function PlanetProvider({ children }) {
  const [planetAPI, setplanetAPI] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setplanetAPI(data.results.filter((planet) => delete planet.residents));
    };
    fetchAPI();
  }, []);

  return (
    <CreateContext.Provider value={ { planetAPI } }>
      {children}
    </CreateContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
