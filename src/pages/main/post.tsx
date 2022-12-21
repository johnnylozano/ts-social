import {
   addDoc,
   getDocs,
   collection,
   query,
   where,
   deleteDoc,
   doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { IPost } from './main';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import profile10 from '../../assets/img/profile-10.jpg';
import profile4 from '../../assets/img/profile-4.jpg';
import profile15 from '../../assets/img/profile-15.jpg';

interface Props {
   post: IPost;
}

interface ILike {
   likeId: string;
   userId: string;
}

export const Post = (props: Props) => {
   const { post } = props;
   const [user] = useAuthState(auth);

   const [likes, setLikes] = useState<ILike[] | null>(null);

   const likesRef = collection(db, 'likes');

   const likesDoc = query(likesRef, where('postId', '==', post.id));

   const getLikes = async () => {
      const data = await getDocs(likesDoc);
      setLikes(
         data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
      );
   };

   const addLike = async () => {
      try {
         const newDoc = await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id,
         });
         if (user) {
            setLikes((prev) =>
               prev
                  ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                  : [{ userId: user?.uid, likeId: newDoc.id }]
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   const removeLike = async () => {
      try {
         const likeToDeleteQuery = query(
            likesRef,
            where('postId', '==', post.id),
            where('userId', '==', user?.uid)
         );

         const likeToDeleteData = await getDocs(likeToDeleteQuery);
         const likeId = likeToDeleteData.docs[0].id;

         const likeToDelete = doc(db, 'likes', likeId);
         await deleteDoc(likeToDelete);
         if (user) {
            setLikes(
               (prev) => prev && prev.filter((like) => like.likeId !== likeId)
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

   useEffect(() => {
      getLikes();
   }, []);
   return (
      // <div>
      //    <div className="title">
      //       <h1>{post.title}</h1>
      //    </div>
      //    <div className="body">
      //       <p>{post.description}</p>
      //    </div>
      //    <div className="footer">
      //       <p>@{post.username}</p>
      //       <button onClick={hasUserLiked ? removeLike : addLike}>
      //          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
      //       </button>
      //       {likes && <p>Likes: {likes?.length}</p>}
      //    </div>
      // </div>
      <div className="feeds">
         <div className="feed">
            <div className="head">
               <div className="user">
                  <h3>@{post.username}</h3>
               </div>
            </div>

            <div className="caption">
               <h1>{post.title}</h1>
               <p>{post.description}</p>
            </div>

            <div className="action-buttons">
               <div className="interaction-buttons">
                  <button
                     className="like-btn"
                     onClick={hasUserLiked ? removeLike : addLike}
                  >
                     {hasUserLiked ? (
                        <AiFillHeart fill="red" />
                     ) : (
                        <AiOutlineHeart />
                     )}
                  </button>
               </div>
            </div>

            <div className="liked-by">
               <span>
                  <img src={profile10} alt="" />
               </span>
               <span>
                  <img src={profile4} alt="" />
               </span>
               <span>
                  <img src={profile15} alt="" />
               </span>
               {likes && <p>Liked by {likes?.length} others</p>}
            </div>
         </div>
      </div>
   );
};
