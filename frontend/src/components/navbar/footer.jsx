import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            {/* Phần nội dung chính */}
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Cột 1: Thông tin thương hiệu */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            {/* Logo giả lập */}
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                                D
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                DEVision<span className="text-primary">JA</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Nền tảng kết nối nhân tài hàng đầu. Chúng tôi giúp các lập trình viên tìm kiếm cơ hội tốt nhất và doanh nghiệp tìm được ứng viên hoàn hảo.
                        </p>
                        <div className="pt-4 flex space-x-4">
                            {/* Social Icons (SVG trực tiếp để không cần cài thêm thư viện) */}
                            <SocialLink href="#" path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            <SocialLink href="#" path="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            <SocialLink href="#" path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" circle="M4 4a2 2 0 11-2 2 2 2 0 012-2z" />
                        </div>
                    </div>

                    {/* Cột 2: Dành cho ứng viên */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">For Candidates</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/jobs">Browse Jobs</FooterLink>
                            <FooterLink to="/profile">Manage Profile</FooterLink>
                            <FooterLink to="/profile">Applied Jobs</FooterLink>
                            <FooterLink to="/profile">CV Builder</FooterLink>
                            <FooterLink to="/">Career Advice</FooterLink>
                        </ul>
                    </div>

                    {/* Cột 3: Dành cho nhà tuyển dụng */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">For Employers</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/">Post a Job</FooterLink>
                            <FooterLink to="/">Pricing Plans</FooterLink>
                            <FooterLink to="/">Search Candidates</FooterLink>
                            <FooterLink to="/">Employer Dashboard</FooterLink>
                        </ul>
                    </div>

                    {/* Cột 4: Liên hệ & Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact & Support</h3>
                        <ul className="space-y-4 mb-6">
                            <li className="flex items-start space-x-3 text-slate-400 text-sm">
                                <MapPinIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span>Tầng 12, Tòa nhà Innovation,<br />Quận 1, TP.HCM</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400 text-sm">
                                <PhoneIcon className="w-5 h-5 text-primary shrink-0" />
                                <span>(+84) 90 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400 text-sm">
                                <EnvelopeIcon className="w-5 h-5 text-primary shrink-0" />
                                <span>support@devisionja.com</span>
                            </li>
                        </ul>
                        
                        {/* Newsletter Input */}
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email for job alerts..." 
                                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-slate-500"
                            />
                            <button className="absolute right-1.5 top-1.5 p-1.5 bg-primary rounded-md text-white hover:bg-primary-dark transition-colors">
                                <EnvelopeIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần Copyright dưới cùng */}
            <div className="border-t border-slate-800 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {currentYear} DEVisionJA Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Component phụ: Link trong Footer
const FooterLink = ({ to, children }) => (
    <li>
        <Link 
            to={to} 
            className="text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block text-sm"
        >
            {children}
        </Link>
    </li>
);

// Component phụ: Icon Social Media
const SocialLink = ({ href, path, circle }) => (
    <a 
        href={href} 
        className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 border border-slate-700 hover:border-primary"
    >
        <svg fill="currentColor" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
            {circle && <path d={circle} />}
            <path d={path} />
        </svg>
    </a>
);

export default Footer;