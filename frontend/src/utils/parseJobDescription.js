// src/utils/parseJobDescription.js

const SECTION_PREFIX_REGEX =
  /^(?:\d+\.|\d+\)|[IVXLCDM]+\.|[a-z]\.|[A-Z]\.)\s*/;

export const parseJobDescription = (text = "") => {
  if (!text || typeof text !== "string") return [];

  // --- BƯỚC PRE-PROCESSING MỚI ---
  let cleanedText = text;

  // 1. Loại bỏ tất cả khoảng trắng (spaces/tabs) đứng trước hoặc sau ký tự xuống dòng (\n)
  // Biểu thức: /\s*\n\s*/g (Tìm 0 hoặc nhiều khoảng trắng, sau đó là \n, sau đó là 0 hoặc nhiều khoảng trắng)
  // và thay thế bằng MỘT ký tự xuống dòng đơn giản (\n).
  cleanedText = cleanedText.replace(/\s*\n\s*/g, "\n");
  
  // 2. Xử lý các dòng trống thừa (ví dụ: \n\n\n thành \n\n)
  cleanedText = cleanedText.replace(/\n{2,}/g, "\n\n");
  
  // 3. Xử lý khoảng trắng thừa ở đầu/cuối toàn bộ chuỗi
  cleanedText = cleanedText.trim();
  // --- KẾT THÚC PRE-PROCESSING ---

  // Sau khi làm sạch, sử dụng lại RegEx split ban đầu (đã được sửa)
  // Tuy nhiên, vì đã làm sạch khoảng trắng nên chỉ cần RegEx đơn giản hơn.
  // Nhưng để đảm bảo, ta vẫn dùng RegEx đã sửa và loại bỏ .trim() trong bước lines.
  
  const rawSections = cleanedText
    .split(
      /\s*(?=^(?:\d+\.|\d+\)|[IVXLCDM]+\.|[a-z]\.|[A-Z]\.)\s*)/gm
    )
    .filter(Boolean);

  return rawSections.map(section => {
    // Vì đã làm sạch ở bước 1, các dòng này không còn khoảng trắng thừa nữa
    // và ta không cần .trim() trong bước này nữa.
    const lines = section
      .split("\n")
      .filter(Boolean);

    const title = lines[0]?.replace(SECTION_PREFIX_REGEX, "") || "";

    // Items sau khi đã làm sạch và không còn thụt lề nên không cần replace phức tạp
    const items = lines
      .slice(1)
      .map(line => line.replace(SECTION_PREFIX_REGEX, ""));

    return { title, items };
  });
};