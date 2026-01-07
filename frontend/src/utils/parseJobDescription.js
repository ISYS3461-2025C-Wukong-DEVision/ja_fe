// src/utils/parseJobDescription.js

const SECTION_PREFIX_REGEX = /^(?:\d+\.|\d+\)|[IVXLCDM]+\.|[a-z]\.|[A-Z]\.)\s*/;

export const parseJobDescription = (text = "") => {
  if (!text || typeof text !== "string") return [];

  // Chuẩn hóa xuống dòng
  let cleanedText = text.replace(/\n{3,}/g, "\n\n").trim();

  // Tách các phần dựa trên số thứ tự đầu dòng
  const rawSections = cleanedText
    .split(/\s*(?=^(?:\d+\.|\d+\)|[IVXLCDM]+\.|[a-z]\.|[A-Z]\.)\s*)/gm)
    .filter(Boolean);

  return rawSections.map(section => {
    const lines = section.split("\n").filter(l => l.trim());
    const firstLineHasPrefix = SECTION_PREFIX_REGEX.test(lines[0]);

    if (!firstLineHasPrefix) {
      // Nếu không có prefix (như 1., 2.), coi cả cụm này là nội dung
      return {
        title: null, // Không có tiêu đề riêng
        items: lines, // Coi mỗi dòng là một item để dễ map
        isSingleParagraph: true,
      };
    }

    const title = lines[0].replace(SECTION_PREFIX_REGEX, "");
    const items = lines.slice(1).map(line => line.replace(SECTION_PREFIX_REGEX, ""));

    return {
      title,
      items,
      isSingleParagraph: false,
    };
  });
};