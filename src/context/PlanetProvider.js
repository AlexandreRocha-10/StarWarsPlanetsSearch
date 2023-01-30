import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateContext from './CreateContext';

const columnOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function PlanetProvider({ children }) {
  const [apiInfos, setApiInfos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedOptions, setselectedOptions] = useState([]);
  const [deletedOption, setdeletedOption] = useState([...columnOptions]);
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
    let planetsFiltered = filteredNumber.numberFilter.length
      ? [...filteredNumber.numberFilter]
      : [...filtered];
    if (filteredNumber.comparison === 'maior que') {
      planetsFiltered = planetsFiltered.filter((planet) => (
        +planet[filteredNumber.column] > +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: planetsFiltered,
      });
    } else if (filteredNumber.comparison === 'menor que') {
      planetsFiltered = planetsFiltered.filter((planet) => (
        +planet[filteredNumber.column] < +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: planetsFiltered,
      });
    } else {
      planetsFiltered = planetsFiltered.filter((planet) => (
        +planet[filteredNumber.column] === +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        buttonClick: true,
        numberFilter: planetsFiltered,
      });
    }

    setselectedOptions([
      { column: filteredNumber.column,
        comparison: filteredNumber.comparison,
        numberInput: filteredNumber.numberInput }, ...selectedOptions,
    ]);

    const updateFilteredPlanets = deletedOption
      .filter((options) => options !== filteredNumber.column);
    setdeletedOption(updateFilteredPlanets);
    setFilteredNumber({
      ...filteredNumber,
      column: updateFilteredPlanets[0],
      buttonClick: true,
      numberFilter: planetsFiltered,
    });
  };

  const values = {
    filtered,
    handleChange,
    input,
    filteredNumber,
    handleClick,
    selectedOptions,
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
