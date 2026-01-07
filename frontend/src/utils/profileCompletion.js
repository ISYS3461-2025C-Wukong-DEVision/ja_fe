export const calculateProfileCompletion = (data) => {
  if (!data) return 0;

  let totalPercent = 2; // Bắt đầu với 2% mặc định

  // 1. Kiểm tra các field cơ bản (6% mỗi field, tổng 48%)
  const basicFields = [
    "email", "firstName", "lastName", "objective", 
    "phone", "country", "city", "address"
  ];
  
  basicFields.forEach(field => {
    if (data[field] && data[field].toString().trim() !== "" && data[field] !== "string") {
      totalPercent += 6;
    }
  });

  // 2. Kiểm tra Education (Có ít nhất 1 phần tử -> 20%)
  if (data.educations && data.educations.length > 0) {
    totalPercent += 20;
  }

  // 3. Kiểm tra Work Experiences (Tối đa 30%)
  if (data.workExperiences && data.workExperiences.length > 0) {
    // Chỉ lấy tối đa 3 phần tử theo quy tắc của cậu
    const experiencesToCalc = data.workExperiences.slice(0, 3);
    
    experiencesToCalc.forEach((work) => {
      let itemWeight = 10; // Mặc định mỗi phần tử là 10%
      
      // Kiểm tra xem có field nào bị null/trống không
      // Các field: title, description, startedAt, endedAt
      const isFull = work.title && work.description && work.startedAt;
      
      if (!isFull) {
        totalPercent += (itemWeight / 2); // Nếu có field null -> 5%
      } else {
        totalPercent += itemWeight; // Nếu full -> 10%
      }
    });
  }

  // Đảm bảo không vượt quá 100% (phòng trường hợp data đầu vào lạ)
  return Math.min(totalPercent, 100);
};