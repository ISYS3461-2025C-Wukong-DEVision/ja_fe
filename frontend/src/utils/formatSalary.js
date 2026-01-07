import { useTranslation } from "react-i18next";

export const useSalaryFormatter = () => {
  const { t } = useTranslation();

  // Function 1: Logic type, min và max
  const formatByType = (type, min, max) => {
    switch (type) {
      case "NEGOTIABLE":
        return t("negotiable");
      case "FROM":
        return `${t("from")} $${min}`;
      case "UP TO":
        return `${t("up_to")} $${max}`;
      case "ABOUT":
      case "RANGE":
        return `${t("range")} $${min} - $${max}`;
      default:
        return min && max ? `$${min} - $${max}` : "-";
    }
  };

  // Function 2: Logic min và max
  const formatByValue = (min, max) => {
    const hasMin = min !== null && min !== undefined;
    const hasMax = max !== null && max !== undefined;

    if (!hasMin && !hasMax) {
      return t("undetermined") || "Undetermined";
    }

    if (!hasMin) {
      // min null -> 0 - max
      return `0 - $${max}`;
    }

    if (!hasMax) {
      // max null -> from min
      return `${t("from")} $${min}`;
    }

    // Cả hai đều có giá trị
    return `$${min} - $${max}`;
  };

  return { formatByType, formatByValue };
};
