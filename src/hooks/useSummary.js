import { getRemarks } from "../utils";

export default function useSummary(responses) {
  const outStanding = responses?.filter(
    (response) => getRemarks(response?.ratings?.average) === "Outstanding"
  );
  const verySatisfactory = responses?.filter(
    (response) => getRemarks(response?.ratings?.average) === "Very Satisfactory"
  );
  const satisfactory = responses?.filter(
    (response) => getRemarks(response?.ratings?.average) === "Satisfactory"
  );
  const unSatisfactory = responses?.filter(
    (response) => getRemarks(response?.ratings?.average) === "Unsatisfactory"
  );
  const poor = responses?.filter(
    (response) => getRemarks(response?.ratings?.average) === "Poor"
  );

  return { outStanding, verySatisfactory, satisfactory, unSatisfactory, poor };
}
