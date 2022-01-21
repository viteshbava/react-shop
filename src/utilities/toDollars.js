const toDollars = (value) => {
  const valueTwoDp = Math.round(value * 100) / 100;
  return valueTwoDp < 0
    ? `-$${(valueTwoDp * -1).toFixed(2)}`
    : `$${valueTwoDp.toFixed(2)}`;
};

export default toDollars;
