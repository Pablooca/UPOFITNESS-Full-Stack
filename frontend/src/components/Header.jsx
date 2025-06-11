import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FcBusinessman } from "react-icons/fc";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Upofitness</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/aboutme'>
                                <FcBusinessman /> About Me
                            </Link>
                        </li>
                        <li>
                            <Link to='/diets'>
                                <MdEmojiFoodBeverage /> Diets
                            </Link>
                        </li>
                        <li>
                            <Link to='/appointments'>
                                <FcBusinessman /> Appointments
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
