import {Router,Route, Routes} from 'react-router-dom';
//  import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './component/card';
import Homee from './component/home';
import Spa from './component/mp';
import './index.css';
import Salf from './component/psell';
import ShoppingCart from './component/cart';
import Sigg from './component/Sigin';
import Logg from './component/login';
import Ps from './component/psales';
import Bi from './component/bid'
import Ord from './component/order';
import Footer from './component/footer';
import ContactForm from './component/contact';
const Approuter=()=>{
  return (
    <Routes>
      <Route exact path="/" element={<Homee></Homee>}/>
      <Route path="/login" element={<Spa/>}/>
      <Route path="/bid" element={<Bi/>}/>
      <Route path="/l" element={<ProductCard/>}/>
      <Route path="/o" element={<ShoppingCart/>}/>
      <Route path="/oo" element={<Salf/>}/>
      <Route path='/sig' element={<Sigg></Sigg>}/>
      <Route path='/log' element={<Logg></Logg>}/>
      <Route path='/ps' element={<Ps></Ps>}/>
      <Route path='/order' element={<Ord></Ord>}/>
      <Route path='/con' element={<ContactForm></ContactForm>}/>
      <Route path='/fot' element={<Footer></Footer>}/>
   </Routes>
  );
};

export default Approuter