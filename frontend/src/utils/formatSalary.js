import { useTranslation } from "react-i18next";

export const formatSalary = (type, min, max) => {
    const { t } = useTranslation();
    switch (type) {
        case "NEGOTIABLE":
            return `${t('negotiable')}`;

        case "FROM":
            return `${t('from')} $${min}`;

        case "UP TO":
            return `${t('up_to')} $${max}`;

        case "ABOUT":
            return `${t('about')} $${min} - $${max}`;

        case "RANGE":
            return `${t('range')} $${min} - $${max}`;

        default:
            return `$${min} - $${max}`;
    }
};
