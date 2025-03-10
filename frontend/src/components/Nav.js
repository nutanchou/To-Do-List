// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logoIcon from './logo.png'; // Import the image file

// const Nav = ({ updateCartCount, cartCount }) => {
//     const auth = localStorage.getItem('user');
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.clear();
//         navigate('/signup');
//     };

//     return (
//         <div>
//             <img
//                 alt='logo'
//                 className='logo'
//                 src={logoIcon} />
//             {
//                 auth ?
//                     <ul className="nav-ul">
//                         <li><Link to="/">Products</Link></li>
//                         <li><Link to="/add-product">Add Products</Link></li>
//                         <li><Link to="/profile">Profile</Link></li>
//                         <li><Link to="/cart">Go to Cart ({cartCount})</Link></li>
//                         <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
//                     </ul>
//                     :
//                     <ul className="nav-ul nav-right">
//                         <li> <Link to="/signup">Sign Up</Link></li>
//                         <li><Link to="/login">Login</Link></li>
//                     </ul>
//             }
//         </div>
//     );
// };

// export default Nav;
