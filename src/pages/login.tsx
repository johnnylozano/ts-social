import { auth, provider } from 'src/config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle } from 'react-icons/ai';

export const Login = () => {
   const navigate = useNavigate();

   const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      navigate('/');
   };
   return (
      <div className="login">
         <p className="login__prompt">Sign In With Google to Continue</p>
         <button className="login-btn" onClick={signInWithGoogle}>
            <AiFillGoogleCircle size={64} />
         </button>
      </div>
   );
};
