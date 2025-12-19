import PremiumBadge from "./premiumBadge";

const ProfileBigCard = ({url, name, email, address, phone, percent, size, objective, isPremium}) => {
    return (
        <div className="flex max-md:flex-col max-md:items-center items-start justify-start md:p-4 py-4 pl-4 w-full space-x-4">
            <img src={url} alt={name} style={{height: size, width: size}} className='rounded-full border-4 border-primary-light/50 shadow-lg'/>
            <div className="flex-col space-y-1">
                <div className="flex space-x-4 items-center md:justify-start justify-center">
                    <span className="text-primary-dark font-bold text-4xl">{name}</span>
                    <span className={`${percent < 80 ? "text-red-500 bg-red-500/10": "text-green-500 bg-green-500/10"} font-semibold text-md px-2 rounded-full hidden md:block`}>{percent}%</span>
                </div>
                <div className="flex md:justify-start justify-center items-center xl:hidden">
                    <PremiumBadge/>
                </div>
                <span>Address: {address}</span>
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-600">
                    <span>Email: {email}</span>
                    <span className="hidden sm:block">✻</span>
                    <span>Phone: {phone}</span>
                </div>
                <span className="text-gray-700 italic line-clamp-3">Target: {objective}</span>
            </div>   
        </div>
    );
}
export default ProfileBigCard