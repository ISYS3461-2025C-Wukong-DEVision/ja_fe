import React, { useState, useEffect } from 'react';

const companyData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000',
    name: 'Công ty A',
    slogan: 'Slogan tuyệt vời của A',
  },
  {
    id: 2,
    image: 'https://savvycom.vn/wp-content/uploads/2023/01/Gia-Cong-Phan-Mem-2.png',
    name: 'Công ty B',
    slogan: null,
    service: 'Dịch vụ Chính Của B',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000',
    name: 'Công ty C',
    slogan: 'Slogan khác của C',
  },
  {
    id: 4,
    image: 'https://savvycom.vn/wp-content/uploads/2023/01/Gia-Cong-Phan-Mem-2.png',
    name: 'Công ty D',
    slogan: 'Một lần nữa Slogan của D',
  },
];

const CarouselCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(false);

  const nextCard = () => {
    setPreviousIndex(activeIndex);
    setSlideIn(true);

    setActiveIndex((prev) => (prev + 1) % companyData.length);

    setTimeout(() => setSlideIn(false), 600);
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const current = companyData[activeIndex];
  const previous = companyData[previousIndex];

  return (
    <div className="flex flex-col items-center px-6 pt-6">
      <div className="relative w-full max-w-xl h-96 overflow-hidden">

        {/* CARD DƯỚI (Card nền – hiển thị dữ liệu HÀNH ĐỘNG/HIỆN TẠI khi không trượt) */}
        <div className="absolute inset-0 border border-gray-300 rounded-xl bg-white">
          <img
            // Khi đang trượt, hiển thị dữ liệu CŨ. Khi không trượt, hiển thị dữ liệu HIỆN TẠI.
            src={slideIn ? previous.image : current.image} 
            className="w-full h-3/4 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">
              {slideIn ? previous.name : current.name}
            </h3>
            <p className="text-sm text-gray-600 italic">
              {slideIn ? (previous.slogan || previous.service) : (current.slogan || current.service)}
            </p>
          </div>
        </div>

        {/* CARD TRÊN (Card mới – chỉ xuất hiện và trượt từ phải sang trái) */}
        {slideIn && (
          <div className="absolute inset-0 border border-gray-300 rounded-xl bg-white animate-slideIn">
            <img
              src={current.image}
              className="w-full h-3/4 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{current.name}</h3>
              <p className="text-sm text-gray-600 italic">
                {current.slogan || current.service}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="flex mt-8 space-x-3">
        {companyData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-400'
            }`}
            onClick={() => {
              setPreviousIndex(activeIndex);
              setActiveIndex(index);
              setSlideIn(true);
              setTimeout(() => setSlideIn(false), 600);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselCard;
