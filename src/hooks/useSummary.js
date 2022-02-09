// import { getRemarks } from "../utils";

// export default function useSummary(responses) {
//   const outStanding = responses?.filter(
//     (response) => getRemarks(response?.ratings?.average) === "Outstanding"
//   );
//   const verySatisfactory = responses?.filter(
//     (response) => getRemarks(response?.ratings?.average) === "Very Satisfactory"
//   );
//   const satisfactory = responses?.filter(
//     (response) => getRemarks(response?.ratings?.average) === "Satisfactory"
//   );
//   const unSatisfactory = responses?.filter(
//     (response) => getRemarks(response?.ratings?.average) === "Unsatisfactory"
//   );
//   const poor = responses?.filter(
//     (response) => getRemarks(response?.ratings?.average) === "Poor"
//   );

//   return { outStanding, verySatisfactory, satisfactory, unSatisfactory, poor };
// }

export default function useSummary(responses) {
  const cs = responses?.filter(
    (response) => response?.status?.faculty?.user?.dept === "Computer Science"
  );

  const ap = responses?.filter(
    (response) => response?.status?.faculty?.user?.dept === "Applied Physics"
  );
  const ip = responses?.filter(
    (response) =>
      response?.status?.faculty?.user?.dept === "Industrial Psychology"
  );
  const math = responses?.filter(
    (response) => response?.status?.faculty?.user?.dept === "Mathematics"
  );

  return { cs, ap, ip, math };
}
