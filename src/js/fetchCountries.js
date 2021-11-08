function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export { fetchCountries };
