import React from 'react';
import {MapPinIcon, PhoneIcon, EnvelopeIcon} from '@heroicons/react/24/outline';
const CompanyCard = ({name, email, phone, country, city}) => {
    return (
        <div className="w-full bg-white shadow-md rounded-lg p-6 flex justify-center items-center gap-4 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-300 ease-in-out max-w-sm">
            <div className="flex flex-col items-center gap-2 w-full min-w-0">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    {name}
                </h2>

                {/* EMAIL */}
                <div className="flex items-start w-full gap-2 min-w-0">
                    <EnvelopeIcon className="h-5 w-5 text-gray-600 shrink-0 mt-1" />
                    <p className="text-gray-600 italic break-words flex-1 min-w-0">
                        {email}
                    </p>
                </div>

                {/* PHONE */}
                <div className="flex items-start w-full gap-2 min-w-0">
                    <PhoneIcon className="h-5 w-5 text-gray-600 shrink-0 mt-1" />
                    <p className="text-gray-600 break-words flex-1 min-w-0">
                        {phone}
                    </p>
                </div>

                {/* LOCATION */}
                <div className="flex items-start w-full gap-2 min-w-0">
                    <MapPinIcon className="h-5 w-5 text-gray-600 shrink-0 mt-1" />
                    <p className="text-gray-600 break-words flex-1 min-w-0">
                        {city}, {country}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default CompanyCard;