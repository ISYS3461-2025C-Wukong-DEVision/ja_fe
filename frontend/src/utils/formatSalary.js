import { useTranslation } from "react-i18next";

export const useSalaryFormatter = () => {
  const { t } = useTranslation();

  return (type, min, max) => {
    switch (type) {
      case "NEGOTIABLE":
        return t("negotiable");
      case "FROM":
        return `${t("from")} $${min}`;
      case "UP TO":
        return `${t("up_to")} $${max}`;
      case "ABOUT":
        return `${t("about")} $${min} - $${max}`;
      case "RANGE":
        return `${t("range")} $${min} - $${max}`;
      default:
        return min && max ? `$${min} - $${max}` : "-";
    }
  };
};
