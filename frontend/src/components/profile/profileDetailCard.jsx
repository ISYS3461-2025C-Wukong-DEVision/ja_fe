import { PencilIcon } from "@heroicons/react/24/outline";
const ProfileBigCard = ({url, name, email, address, phone, percent, size, objective}) => {
    return (
        <div className="flex items-start justify-start p-4 w-full space-x-4">
            <img src={url} alt={name} style={{height: size, width: size}} className='rounded-full border-4 border-primary-light/50 shadow-lg'/>
            <div className="flex flex-col justify-between" style={{height: size - 20}}>
                <div className="flex space-x-4 items-center justify-start">
                    <span className="text-primary-dark font-bold text-4xl">{name}</span>
                    <span className={`${percent < 80 ? "text-red-500 bg-red-500/10": "text-green-500 bg-green-500/10"} font-semibold text-md px-2 rounded-full`}>{percent}%</span>
                </div>
                <span>Address: {address}</span>
                <div className="flex space-x-4 text-gray-600">
                    <span>Email: {email}</span>
                    <span>✻</span>
                    <span>Phone: {phone}</span>
                </div>
                <span>Target: {objective}</span>
            </div>   
        </div>
    );
}
export default ProfileBigCard