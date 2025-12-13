const EMPLOYMENT_TYPES = {
  FULL_TIME: 1,      // 0001
  PART_TIME: 2,      // 0010
  INTERNSHIP: 4,     // 0100
  CONTRACT: 8,       // 1000
};

const parseEmploymentType = (mask) => {
  const types = [];

  if (mask & EMPLOYMENT_TYPES.FULL_TIME) types.push("Full-time");
  if (mask & EMPLOYMENT_TYPES.PART_TIME) types.push("Part-time");
  if (mask & EMPLOYMENT_TYPES.INTERNSHIP) types.push("Internship");
  if (mask & EMPLOYMENT_TYPES.CONTRACT) types.push("Contract");

  return types.join(", ");
};

export default parseEmploymentType;