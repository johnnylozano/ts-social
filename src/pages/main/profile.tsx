import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from 'src/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export const Profile = () => {
   const [user] = useAuthState(auth);

   const signUserOut = async () => {
      await signOut(auth);
   };

   return (
      <>
         <Link to="/" className="profile">
            <img className="profile-photo" src={user?.photoURL || ''} alt="" />
            <div className="handle">
               <h4>{user?.displayName}</h4>
               <p className="text-muted">@{user?.displayName}</p>
            </div>
         </Link>
         <button className="btn btn-logout" onClick={signUserOut}>
            Log Out
         </button>
      </>
   );
};
