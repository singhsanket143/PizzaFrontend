import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import Pizzalogo from '../assets/Images/pizza1.png';
import CartIcon from '../assets/Images/cart.svg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';
import { useEffect } from 'react';
import { getCartDetails } from '../Redux/Slices/CartSlice';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { cartsData } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
        
    }

    async function fetchCartDetails() {
        const res = await dispatch(getCartDetails());
        console.log("cart details", res)
        if(res?.payload?.isUnauthorized) {
            console.log("unauthorized");
            dispatch(logout());
        }
    }

    useEffect(() => {
        console.log(typeof(isLoggedIn))
        if(isLoggedIn) {
            fetchCartDetails();
        }
    }, []);

    return (
        <div>

            <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md">

                <div className="flex items-center justify-center"
                    onClick={() => navigate('/')}
                >
                    <p>Pizza App</p>
                    <img src={Pizzalogo} alt="Pizza logo" />
                </div>

                <div className='hidden md:block'>
                    <ul className='flex gap-4'>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>Menu {' '}</p>
                        </li>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>Services {' '}</p>
                        </li>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>About {' '}</p>
                        </li>

                    </ul>
                </div>

                <div>
                    <ul className='flex gap-4'>
                        <li className='hover:text-[#FF9110]'>
                            {isLoggedIn ? (
                                <Link onClick={handleLogout}>Logout</Link>
                            ) : (
                                <Link to={'/auth/login'}>Login</Link>
                            )}
                        </li>

                        {isLoggedIn && (
                            <Link to={'/cart'}>
                                <li>
                                    <img src={CartIcon} className='w-8 h-8 inline' />
                                    {' '}
                                    <p className='text-black inline'>{cartsData?.items?.length}</p>
                                </li>
                            </Link>
                            
                        )}
                    </ul>
                </div>



            </nav>

                {children}

            <Footer />
        </div>  
    )
}

export default Layout;