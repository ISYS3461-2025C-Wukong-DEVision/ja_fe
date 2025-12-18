import { PencilIcon } from "@heroicons/react/24/outline";
const ProfileBigCard = ({url, name, email, address, phone, percent, size, objective}) => {
    return (
        <div className="flex items-start justify-between p-4 w-full">
            <div className="flex space-x-4">
                <img src={url} alt={name} style={{height: size, width: size}} className='rounded-full border-4 border-primary-light/50 shadow-lg'/>
                <div className="flex flex-col justify-between" style={{height: size - 20}}>
                    <div className="flex space-x-4 items-center justify-start">
                        <span className="text-primary-dark font-bold text-4xl">{name}</span>
                        <span className={`${percent < 80 ? "text-red-500 bg-red-500/10": "text-green-500 bg-green-500/10"} font-semibold text-md px-2 rounded-full`}>{percent}%</span>
                    </div>
                    <span>{objective}</span>
                    <span>{address}</span>
                    <div className="flex space-x-4 text-gray-600">
                        <span>{email}</span>
                        <span>✻</span>
                        <span>{phone}</span>
                    </div>
                </div>
            </div>
            <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                <PencilIcon className='h-7 w-7'/>
                <span className='italic font-bold text-xl'>
                    Edit Info
                </span>
            </button>
        </div>
    );
}
export default ProfileBigCard