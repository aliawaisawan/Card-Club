import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import Error from './pages/Error'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Otp from './pages/Otp';
import Verify from './pages/Verify';
import Forget from './pages/Forget';
import ChangePassword from './pages/ChangePassword';
import CreateReminder from './pages/CreateReminder';
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import Reminder from './pages/Reminder';
import ShippingAddress from './pages/ShippingAddress';
import ContactUs from './pages/ContactUs';
import Cards from './pages/Cards';
import Gifts from './pages/Gifts';
import CustomizeCard from './pages/CustomizeCard';
import ViewCard from './pages/ViewCard';
import ViewGift from './pages/ViewGift';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import CheckoutCard from './pages/CheckoutCard';
import CheckoutGift from './pages/CheckoutGift';
import Addresses from './pages/Addresses';
import FacebookPrivacyPolicy from './pages/FacebookPrivacyPolicy';
import GetPdf from './components/CustomizeCard/GetPdf';

function App() {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create-reminder" element={<CreateReminder />} />
        <Route exact path="/reminder" element={<Reminder />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/card/:id" element={<ViewCard />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gift/:id" element={<ViewGift />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Addresses />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/shipping-address" element={<ShippingAddress />} />
        <Route exact path="/otp" element={<Otp />} />
        <Route exact path="/verify" element={<Verify />} />
        <Route exact path="/wishlist" element={<WishList />} />
        <Route exact path="/custom/:id" element={<CustomizeCard/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/recipients" element={<Contacts/>} />
        <Route exact path="/checkout/card/:id" element={<CheckoutCard/>} />
        <Route exact path="/checkout/gift" element={<CheckoutGift/>} />
        <Route exact path="/pdf/:id" element={<GetPdf/>} />
        <Route exact path="/facebook-privacy-policy" element={<FacebookPrivacyPolicy/>} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
