import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { Post } from './post';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell } from 'react-icons/ai';

export interface IPost {
   id: string;
   userId: string;
   title: string;
   username: string;
   description: string;
}

export const Main = () => {
   const [user] = useAuthState(auth);

   const [postsList, setPostsList] = useState<IPost[] | null>(null);
   const postsRef = collection(db, 'posts');

   const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPostsList(
         data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
      );
   };

   useEffect(() => {
      getPosts();
   }, []);
   return (
      // <div>
      //    {postsList?.map((post) => (
      //       <Post post={post} />
      //    ))}
      // </div>
      <main>
         <div className="container">
            {/* LEFT */}
            <div className="left">
               <a href="#" className="profile">
                  <img
                     className="profile-photo"
                     src={user?.photoURL || ''}
                     alt=""
                  />
                  <div className="handle">
                     <h4>{user?.displayName}</h4>
                     <p className="text-muted">@{user?.displayName}</p>
                  </div>
               </a>

               {/* SIDEBAR */}

               <div className="sidebar">
                  <a href="#" className="menu-item">
                     <span className="centered-icon">
                        <AiOutlineHome />
                     </span>
                     <h3>Home</h3>
                  </a>
                  <a href="#" className="menu-item">
                     <span className="centered-icon">
                        <AiOutlineCompass />
                     </span>
                     <h3>Explore</h3>
                  </a>
                  <a href="#" className="menu-item">
                     <span className="centered-icon">
                        <AiOutlineBell />
                     </span>
                     <h3>Notifications</h3>
                  </a>
               </div>
            </div>
            {/* MIDDLE */}
            <div className="middle"></div>
            {/* RIGHT */}
            <div className="right"></div>
         </div>
      </main>
   );
};
