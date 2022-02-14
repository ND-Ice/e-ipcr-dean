export default function useSummary(responses) {
  const CAFA = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CAFA"
  );
  const CAS = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CAS"
  );
  const CED = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CED"
  );
  const CEN = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CEN"
  );
  const CHM = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CHM"
  );
  const CIT = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CIT"
  );

  const CPAC = responses?.filter(
    (response) => response?.status?.faculty?.user?.college === "CPAC"
  );

  return { CAFA, CAS, CED, CEN, CHM, CIT, CPAC };
}
