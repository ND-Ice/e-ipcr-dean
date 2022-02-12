const getAcronymMeaning = (acronym) => {
  if (acronym === "CAFA") return "College of Architecture and Fine Arts";
  if (acronym === "CAS") return "College of Arts and Sciences";
  if (acronym === "CBA") return "College of Business Administration";
  if (acronym === "CED") return "College of Education";
  if (acronym === "CEN") return "College of Engineering";
  if (acronym === "CHM") return "College of Hospitality Management";
  if (acronym === "CIT") return "College of Industrial Technology";
  if (acronym === "CPAC")
    return "College of Public Administration and Criminology";
};

export default getAcronymMeaning;
