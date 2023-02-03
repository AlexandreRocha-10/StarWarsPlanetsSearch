import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CreateContext from './CreateContext';

function PlanetProvider({ children }) {
  const [planetAPI, setplanetAPI] = useState([]);

  let tableHead = [];

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setplanetAPI(data.results.filter((planet) => delete planet.residents));
    };
    fetchAPI();
  }, []);

  if (planetAPI.length > 0) {
    tableHead = Object.keys(planetAPI[0]);
  }

  return (
    <CreateContext.Provider value={ { planetAPI, tableHead } }>
      {children}
    </CreateContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
