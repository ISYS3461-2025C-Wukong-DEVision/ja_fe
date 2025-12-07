import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex flex-col bg-gray-100 justify-center items-center min-h-screen w-screen">
            <main className="w-full bg-white rounded shadow">
                <Outlet />
            </main>
        </div>
    );
}
export default AuthLayout;