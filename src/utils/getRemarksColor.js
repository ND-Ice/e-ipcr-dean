const getRemarksColor = (rate) => {
  const rating = parseInt(rate);
  if (!rating) return;
  if (rating === 5) return "#6dc73f";
  if (rating >= 4) return "#a0d44d";
  if (rating >= 3) return "#f3c20a";
  if (rating >= 2) return "#feb328";
  if (rating >= 1) return "#f73632";
};

export default getRemarksColor;
