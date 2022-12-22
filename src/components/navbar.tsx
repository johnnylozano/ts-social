import { Link } from 'react-router-dom';
import { auth } from 'src/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineSearch } from 'react-icons/ai';

export const Navbar = () => {
   const [user] = useAuthState(auth);

   return (
      <nav className="navbar">
         <div className="container">
            <a href="/">
               <h2 className="logo">Konnect</h2>
            </a>
            {user && (
               <div className="search-bar">
                  <span className="search-icon">
                     <AiOutlineSearch fill="#000" />
                     <input type="search" placeholder="Search" />
                  </span>
               </div>
            )}
            {!user && (
               <Link to="/login" className="btn btn-primary">
                  Login
               </Link>
            )}
            {user && (
               <div className="create">
                  <Link className="btn btn-primary" to="/createpost">
                     Create
                  </Link>
                  <div className="profile-picture">
                     <img
                        className="profile-photo"
                        src={user?.photoURL || ''}
                        alt=""
                        referrerPolicy="no-referrer"
                     />
                  </div>
               </div>
            )}
         </div>
      </nav>
   );
};
