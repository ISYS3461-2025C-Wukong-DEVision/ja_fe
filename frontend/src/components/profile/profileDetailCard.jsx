const ProfileBigCard = ({url, name, email, address, phone, percent, size, objective}) => {
    return (
        <div className="flex items-start justify-start p-4 space-x-4 w-full">
            <img src={url} alt={name} style={{height: size, width: size}} className='rounded-full border-4 border-primary-light/50 shadow-lg'/>
            <div className="flex flex-col">
                <span>{name}</span>
                <span>{objective}</span>
                <span>{address}</span>
                <div className="flex">
                    <span>{email}</span>
                    <span>✻</span>
                    <span>{phone}</span>
                </div>
            </div>
        </div>
    );
}
export default ProfileBigCard