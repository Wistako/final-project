function sortArrayByProperty(array, property) {
  // get unique properties
  const uniqueProperties = [...new Set(array.map(item => item[property]))];

  // for each property, find items that have it
  const sortedArray = uniqueProperties.map(uniqueProperty => {
    return array.filter(item => item[property] === uniqueProperty);
  });

  return sortedArray;
}

export default sortArrayByProperty;
