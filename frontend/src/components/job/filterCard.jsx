import { 
    ChevronDownIcon, 
    Bars3Icon, 
    MapPinIcon, 
    BriefcaseIcon, 
    BanknotesIcon 
} from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';
import { COUNTRIES } from "../../utils/constants";

const FilterCard = ({ filters, setFilters, t = (k) => k }) => {

    const TYPE_MAPPING = {
        'Full-time': 'FULL_TIME',
        'Part-time': 'PART_TIME',
        'Internship': 'INTERNSHIP',
        'Contract': 'CONTRACT' 
    };
    
    const displayTypes = Object.keys(TYPE_MAPPING);
    const countries = COUNTRIES;
    const salaryOptions = [
        { label: '0 - 5000', min: 0, max: 5000 },
        { label: '5000 - 10000', min: 5000, max: 10000 },
        { label: '10000 - 20000', min: 10000, max: 20000 },
        { label: '20000 - 40000', min: 20000, max: 40000 },
        { label: '>40000', min: 40000, max: 999999 },
    ];

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [localKeyword, setLocalKeyword] = useState(filters.keyword || "");
    
    // State tạm cho Modal Category
    const [tempTypes, setTempTypes] = useState([]);

    // Đồng bộ localKeyword khi filters.keyword từ cha thay đổi
    useEffect(() => {
        setLocalKeyword(filters.keyword || "");
    }, [filters.keyword]);

    // Helper: Map từ API Value sang Label hiển thị
    const getLabelFromValue = (val) => {
        return Object.keys(TYPE_MAPPING).find(key => TYPE_MAPPING[key] === val) || val;
    };

    // --- CÁC HÀM XỬ LÝ CHỈ CẬP NHẬT STATE ---

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setFilters(prev => ({ 
            ...prev, 
            keyword: localKeyword, 
            pageNumber: 1 
        }));
    };

    const handleQuickUpdate = (updates) => {
        setFilters(prev => ({ 
            ...prev, 
            ...updates, 
            pageNumber: 1 
        }));
        setActiveDropdown(null);
    };

    const handleOpenCategory = () => {
        const current = filters.employmentTypes ? filters.employmentTypes.split(',').filter(x => x) : [];
        setTempTypes(current);
        setShowCategoryModal(true);
    };

    const handleApplyCategory = () => {
        const newValue = tempTypes.join(',');
        handleQuickUpdate({ employmentTypes: newValue });
        setShowCategoryModal(false);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex-col relative">
            {/* ROW 1: SEARCH & CATEGORY */}
            <div className="flex flex-row justify-center items-center w-full gap-2">
                <button 
                    type="button"
                    onClick={handleOpenCategory}
                    className="flex items-center justify-center py-5 px-4 bg-primary rounded-md hover:bg-primary-dark min-w-[120px] h-[72px] text-white transition-colors"
                >
                    <Bars3Icon className="w-6 h-6 mr-1 shrink-0"/>
                    <span className="whitespace-nowrap font-medium">{t('category')}</span>
                </button>

                <div className="relative w-full flex items-center h-[72px]">
                    <input
                        type="text"
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        placeholder={t('searching')}
                        className="border border-primary rounded-md px-4 h-full w-full focus:outline-none focus:ring-1 focus:ring-primary-dark italic"
                    />
                    <button type="submit" className="absolute right-2 text-white bg-primary hover:bg-primary-dark rounded-md py-4 px-6 font-medium">
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
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1 max-h-60 overflow-y-auto">
                            <div onClick={() => handleQuickUpdate({ location: '' })} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500 border-b italic">{t('all_locations')}</div>
                            {countries.map(c => (
                                <div key={c.code} onClick={() => handleQuickUpdate({ location: c.name })} className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm ${filters.location === c.name ? 'bg-primary/10 text-primary' : ''}`}>{c.name}</div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Employment Type Filter */}
                <div className="relative">
                    <button 
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                        className={`flex items-center bg-white rounded-full px-4 py-1.5 border transition-all ${filters.employmentTypes ? 'border-primary text-primary' : 'border-gray-200 text-gray-700'}`}
                    >
                        <BriefcaseIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium truncate max-w-[120px]">
                            {filters.employmentTypes 
                                ? getLabelFromValue(filters.employmentTypes.split(',')[0]) + (filters.employmentTypes.includes(',') ? '...' : '')
                                : t('type')}
                        </span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === 'type' && (
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1">
                            <div onClick={() => handleQuickUpdate({ employmentTypes: '' })} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500 border-b italic">{t('all_types')}</div>
                            {displayTypes.map(label => (
                                <div 
                                    key={label} 
                                    onClick={() => handleQuickUpdate({ employmentTypes: TYPE_MAPPING[label] })} 
                                    className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm"
                                >
                                    {label}
                                </div>
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
                            {filters.salaryMax > 0 ? (filters.salaryMin >= 40000 ? "> 40000" : `${filters.salaryMin} - ${filters.salaryMax}`) : t('salary')}
                        </span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === 'salary' && (
                        <div className="absolute z-30 mt-2 w-48 bg-white border rounded shadow-xl py-1">
                             <div onClick={() => handleQuickUpdate({ salaryMin: 0, salaryMax: 0 })} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500 border-b italic">{t('any_salary')}</div>
                            {salaryOptions.map(opt => (
                                <div key={opt.label} onClick={() => handleQuickUpdate({ salaryMin: opt.min, salaryMax: opt.max })} className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm">{opt.label}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* FULL CATEGORY MODAL */}
            {showCategoryModal && (
                <div className="absolute top-[85px] left-0 w-full bg-white border-2 border-primary rounded-lg p-6 z-40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-lg">{t('select_multiple_types')}</h4>
                        <button type="button" onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-black p-1">✕</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {displayTypes.map(label => {
                            const apiValue = TYPE_MAPPING[label];
                            const isChecked = tempTypes.includes(apiValue);
                            return (
                                <label key={label} className={`flex items-center space-x-3 p-3 border rounded cursor-pointer select-none transition-colors ${isChecked ? 'bg-primary/5 border-primary' : 'hover:bg-gray-50'}`}>
                                    <input 
                                        type="checkbox" 
                                        className="w-5 h-5 accent-primary"
                                        checked={isChecked}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setTempTypes([...tempTypes, apiValue]);
                                            } else {
                                                setTempTypes(tempTypes.filter(t => t !== apiValue));
                                            }
                                        }}
                                    />
                                    <span className={`text-sm ${isChecked ? 'text-primary font-medium' : 'text-gray-700'}`}>{label}</span>
                                </label>
                            )
                        })}
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={() => setShowCategoryModal(false)}
                            className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                        >
                            {t('cancel')}
                        </button>
                        <button 
                            type="button" 
                            onClick={handleApplyCategory}
                            className="bg-primary text-white px-8 py-2 rounded-md font-bold hover:bg-primary-dark transition-colors shadow-md"
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