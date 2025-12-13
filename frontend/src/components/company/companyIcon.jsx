const CompanyIcon = ({ name, src, alt, size = 50 }) => {
    return (

            <div className="flex flex-col p-1" style={{width: size + 8}}>
                <img
                src={src}
                alt={alt}
                style={{ width: size, height: size }}
                className="object-cover rounded-sm shadow-sm border border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium text-center">{name}</span>
            </div>

    );
}

export default CompanyIcon;