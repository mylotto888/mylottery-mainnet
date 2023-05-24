import Link from "next/link";

const NavBar = ({ rightButton } : any) => {

    return (
        <div className="navbar text-gray-700 bg-white bg-opacity-60 lg:px-8 lg:pt-4">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 hidden">
                    <li><a href="#">2D</a></li>
                    <li><a href="#">3D</a></li>
                    <li><a href="#">QuickCash</a></li>
                    <li><a href="#">Roadmap</a></li>
                    <li><a href="#">Calendar</a></li>
                </ul>
                </div>
                <Link href={"/"} className="normal-case text-xl">
                    <img src="/images/logo192.png" className="w-32" />
                </Link>
            </div>
            <div className="navbar-center px-5 hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="btn-disabled bg-transparent"><a href="#" className="hover:bg-transparent hover:text-red-600">2D</a></li>
                    <li className="btn-disabled bg-transparent"><a href="#" className="hover:bg-transparent hover:text-red-600">3D</a></li>
                    <li className="btn-disabled bg-transparent"><a href="#" className="hover:bg-transparent hover:text-red-600">QuickCash</a></li>
                    <li className="btn-disabled bg-transparent"><a href="#" className="hover:bg-transparent hover:text-red-600">Roadmap</a></li>
                    <li className="btn-disabled bg-transparent"><a href="#" className="hover:bg-transparent hover:text-red-600">Calendar</a></li>
                </ul>
            </div>
            <div className="navbar-end" >
                {
                    rightButton
                }
            </div>
        </div>
    )
}

export default NavBar;