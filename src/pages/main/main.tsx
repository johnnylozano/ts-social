import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from './post';
import { Profile } from './profile';
import { Sidebar } from './sidebar';
import { db } from 'src/config/firebase';
import { auth } from 'src/config/firebase';
import { CreateForm } from 'src/pages/create-post/create-form';
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
               {/* LEFT COLUMN */}
               <div className="left">
                  <Profile />
                  <Sidebar />
               </div>

               {/* MIDDLE COLUMN */}
               <div className="middle">
                  <CreateForm />

                  {/* POST FEED */}
                  {postsList?.map((post) => (
                     <Post post={post} />
                  ))}
               </div>
            </div>
         )}
      </main>
   );
};
