import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from 'src/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
   title: string;
   description: string;
}

export const CreateForm = () => {
   const [user] = useAuthState(auth);
   const navigate = useNavigate();

   const schema = yup.object().shape({
      title: yup.string().required('You must add a title.'),
      description: yup.string().required('You must add a description.'),
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CreateFormData>({
      resolver: yupResolver(schema),
   });

   const postsRef = collection(db, 'posts');

   const onCreatePost = async (data: CreateFormData) => {
      await addDoc(postsRef, {
         ...data,
         username: user?.displayName,
         userId: user?.uid,
      });

      navigate('/');
      window.location.reload();
   };

   return (
      <form onSubmit={handleSubmit(onCreatePost)} className="create-post">
         <div className="profile-photo">
            <img src={user?.photoURL || ''} alt="" />
         </div>
         <div className="create-post__text">
            <div className="create-post__title">
               <input
                  type="text"
                  placeholder="Title..."
                  {...register('title')}
               />
               <p style={{ color: 'red' }}>{errors.title?.message}</p>
            </div>
            <div className="create-post__body">
               <textarea
                  placeholder={`What's on your mind, ${user?.displayName}?`}
                  {...register('description')}
               />
               <p style={{ color: 'red' }}>{errors.description?.message}</p>
            </div>
         </div>
         <input type="submit" className="btn btn-primary" />
      </form>
   );
};
