const getSentiment = (rate) => {
  const rating = parseInt(rate);
  if (!rating) return;
  if (rating > 3) return "Positive";
  if (rating < 3) return "Negative";
  return "Neutral";
};

export default getSentiment;
