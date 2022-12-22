import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'src/config/firebase';
import { Post } from './post';
import { auth } from 'src/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { CreateForm } from 'src/pages/create-post/create-form';
import { Profile } from './profile';
import { Sidebar } from './sidebar';
import { Login } from 'src/pages/login';

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
      <main>
         {!user ? (
            <Login />
         ) : (
            <div className="container">
               {/* LEFT */}
               <div className="left">
                  <Profile />

                  {/* SIDEBAR */}
                  <Sidebar />
               </div>

               {/* MIDDLE */}
               <div className="middle">
                  {/* CREATE POST */}
                  <CreateForm />

                  {/* FEED */}
                  {postsList?.map((post) => (
                     <Post post={post} />
                  ))}
               </div>
            </div>
         )}
      </main>
   );
};
