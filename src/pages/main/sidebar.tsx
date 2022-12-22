import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell } from 'react-icons/ai';

export const Sidebar = () => {
   return (
      <div className="sidebar">
         <Link to="/" className="menu-item">
            <span className="centered-icon">
               <AiOutlineHome />
            </span>
            <h3>Home</h3>
         </Link>
         <Link to="/" className="menu-item">
            <span className="centered-icon">
               <AiOutlineCompass />
            </span>
            <h3>Explore</h3>
         </Link>
         <Link to="/" className="menu-item">
            <span className="centered-icon">
               <AiOutlineBell />
            </span>
            <h3>Notifications</h3>
         </Link>
      </div>
   );
};
