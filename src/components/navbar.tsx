import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { AiOutlineSearch } from 'react-icons/ai';

export const Navbar = () => {
   const [user] = useAuthState(auth);

   const signUserOut = async () => {
      await signOut(auth);
   };

   return (
      // <div className="navbar">
      //    <div className="links">
      //       <Link to="/">Home</Link>
      //       {!user ? (
      //          <Link to="/login">Login</Link>
      //       ) : (
      //          <Link to="/createpost">Create Post</Link>
      //       )}
      //    </div>

      //    <div className="user">
      //       {user && (
      //          <>
      //             <p> {user?.displayName} </p>
      //             <img
      //                src={user?.photoURL || ''}
      //                width="20"
      //                height="20"
      //                alt="Current User"
      //             />
      //             <button onClick={signUserOut}>Log Out</button>
      //          </>
      //       )}
      //    </div>
      // </div>
      <nav className="navbar">
         <div className="container">
            <h2 className="logo">Konnect</h2>
            <div className="search-bar">
               <AiOutlineSearch color="#000" />
               <input type="search" placeholder="Search" />
            </div>
            <div className="create">
               <label className="btn btn-primary" htmlFor="create-post">
                  Create
               </label>
               <div className="profile-picture">
                  <img
                     className="profile-photo"
                     src={user?.photoURL || ''}
                     alt=""
                  />
               </div>
            </div>
         </div>
      </nav>
   );
};
