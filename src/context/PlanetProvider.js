import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateContext from './CreateContext';

function PlanetProvider({ children }) {
  const [apiInfos, setApiInfos] = useState([]);
  const [input, setInput] = useState('');
  const [filteredNumber, setFilteredNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    numberInput: 0,
    buttonClick: false,
    numberFilter: [],
  });

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      setApiInfos(json.results);
    };
    fetchApi();
  }, []);

  const planets = apiInfos.filter((item) => delete item.residents);
  const filtered = planets.filter((planet) => planet.name
    .toLowerCase().includes(input.toLowerCase()));

  const handleChange = ({ target }) => {
    setFilteredNumber({
      ...filteredNumber,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    if (filteredNumber.comparison === 'maior que') {
      const fil = filtered.filter((planet) => (
        +planet[filteredNumber.column] > +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: fil,
      });
    } else if (filteredNumber.comparison === 'menor que') {
      const fil = filtered.filter((planet) => (
        +planet[filteredNumber.column] < +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: fil,
      });
    } else {
      const fil = filtered.filter((planet) => (
        +planet[filteredNumber.column] === +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: fil,
      });
    }
  };

  const values = {
    filtered,
    handleChange,
    input,
    filteredNumber,
    handleClick,
    setInput: ({ target }) => setInput(target.value),
  };

  return (
    <CreateContext.Provider value={ values }>
      {children}
    </CreateContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
