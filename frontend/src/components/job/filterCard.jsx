import { 
    ChevronDownIcon, 
    Bars3Icon, 
    MapPinIcon, 
    BriefcaseIcon, 
    BanknotesIcon 
} from "@heroicons/react/24/outline";
import { useState } from 'react';
import { COUNTRIES } from "../../utils/constants";

const FilterCard = ({ filters, setFilters, onSearch, t = (k) => k }) => {
    // Data mẫu cho các dropdown
    const countries = COUNTRIES;
    const types = ['Full-time', 'Part-time', 'Internship', 'Contract'];
    const salaryOptions = [
        { label: '0 - 1000', min: 0, max: 1000 },
        { label: '1000 - 2000', min: 1000, max: 2000 },
        { label: '2000 - 4000', min: 2000, max: 4000 },
        { label: '4000 - 10000', min: 4000, max: 10000 },
        { label: '>10000', min: 10000, max: 999999 },
    ];

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Hàm dọn dẹp filter trước khi gửi đi
    const handleActionSearch = (currentFilters) => {
        const cleaned = {};
        
        Object.keys(currentFilters).forEach(key => {
            const value = currentFilters[key];
            
            // Giữ lại pageNumber và pageSize
            if (key === 'pageNumber' || key === 'pageSize') {
                cleaned[key] = value;
                return;
            }

            // Loại bỏ các giá trị rỗng hoặc bằng 0 (cho salary)
            if (value !== '' && value !== 0 && value !== null) {
                cleaned[key] = value;
            }
        });

        onSearch(cleaned);
    };

    // Cập nhật từng field
    const updateField = (updates) => {
        const newFilters = { ...filters, ...updates };
        setFilters(newFilters);
        handleActionSearch(newFilters);
        setActiveDropdown(null);
    };

    return (
        <form 
            onSubmit={(e) => { e.preventDefault(); handleActionSearch(filters); }} 
            className="flex-col relative"
        >
            {/* ROW 1: SEARCH & CATEGORY BUTTON */}
            <div className="flex flex-row justify-center items-center w-full gap-2">
                <button 
                    type="button"
                    onClick={() => setShowCategoryModal(!showCategoryModal)}
                    className="flex items-center justify-center py-5 px-4 bg-primary rounded-md hover:bg-primary-dark min-w-[120px] h-[72px] text-white transition-colors"
                >
                    <Bars3Icon className="w-6 h-6 mr-1 shrink-0"/>
                    <span className="whitespace-nowrap font-medium">{t('category')}</span>
                </button>

                <div className="relative w-full flex items-center h-[72px]">
                    <input
                        type="text"
                        value={filters.keyword}
                        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                        placeholder={t('searching')}
                        className="border border-primary rounded-md px-4 h-full w-full focus:outline-none focus:ring-1 focus:ring-primary-dark italic"
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 text-white bg-primary hover:bg-primary-dark rounded-md py-2 px-6 font-medium"
                    >
                        {t('search')}
                    </button>
                </div>
            </div>

            {/* ROW 2: QUICK FILTERS */}
            <div className="flex flex-wrap justify-start items-center w-full my-3 gap-3 px-2">
                
                {/* Location Filter */}
                <div className="relative">
                    <button 
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
                        className={`flex items-center bg-white rounded-full px-4 py-1.5 border transition-all ${filters.location ? 'border-primary text-primary' : 'border-gray-200 text-gray-700'}`}
                    >
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{filters.location || t('location')}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === 'location' && (
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1 max-h-96">
                            {countries.map(c => (
                                <div key={c.code} onClick={() => updateField({ location: c.name })} className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm">{c.name}</div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Employment Type Filter (Single Select) */}
                <div className="relative">
                    <button 
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                        className={`flex items-center bg-white rounded-full px-4 py-1.5 border transition-all ${filters.employmentTypes ? 'border-primary text-primary' : 'border-gray-200 text-gray-700'}`}
                    >
                        <BriefcaseIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium truncate max-w-[100px]">{filters.employmentTypes || t('type')}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === 'type' && (
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1">
                            {types.map(type => (
                                <div key={type} onClick={() => updateField({ employmentTypes: type })} className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm">{type}</div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Salary Filter */}
                <div className="relative">
                    <button 
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === 'salary' ? null : 'salary')}
                        className={`flex items-center bg-white rounded-full px-4 py-1.5 border transition-all ${filters.salaryMax > 0 ? 'border-primary text-primary' : 'border-gray-200 text-gray-700'}`}
                    >
                        <BanknotesIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">
                            {filters.salaryMax > 0 ? `${filters.salaryMin} - ${filters.salaryMax}` : t('salary')}
                        </span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === 'salary' && (
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1">
                            {salaryOptions.map(opt => (
                                <div key={opt.label} onClick={() => updateField({ salaryMin: opt.min, salaryMax: opt.max })} className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm">{opt.label}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* FULL CATEGORY MODAL (Multi-select cho employmentTypes) */}
            {showCategoryModal && (
                <div className="absolute top-[85px] left-0 w-full bg-white border-2 border-primary rounded-lg p-6 z-40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-lg">{t('select_multiple_types')}</h4>
                        <button type="button" onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-black">✕</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {types.map(type => (
                            <label key={type} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="w-5 h-5 accent-primary"
                                    checked={filters.employmentTypes.split(',').includes(type)}
                                    onChange={(e) => {
                                        let current = filters.employmentTypes ? filters.employmentTypes.split(',').filter(x => x !== "") : [];
                                        if (e.target.checked) {
                                            current.push(type);
                                        } else {
                                            current = current.filter(t => t !== type);
                                        }
                                        updateField({ employmentTypes: current.join(',') });
                                    }}
                                />
                                <span className="text-sm">{type}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button 
                            type="button" 
                            onClick={() => setShowCategoryModal(false)}
                            className="bg-primary text-white px-8 py-2 rounded-md font-bold hover:bg-primary-dark"
                        >
                            {t('apply')}
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default FilterCard;