import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'src/pages/main/main';
import { Login } from 'src/pages/login';
import { Navbar } from 'src/components/navbar';
import { CreatePost } from 'src/pages/create-post/create-post';

function App() {
   return (
      <div className="App">
         <Router>
            <Navbar />
            <Routes>
               <Route path="/" element={<Main />} />
               <Route path="/login" element={<Login />} />
               <Route path="/createpost" element={<CreatePost />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
