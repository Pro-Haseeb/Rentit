import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import ProtectedRoute from './page/privateRoute';
import AddProduct from './page/AddProduct';
import Home from './page/Home';
import Aboutus from './page/AboutUs';
import Explore from './page/Explore';
import Navbar from './components/Navbar';
import AdminLogin from './page/AdminLogin';


import OwnerDashboard from './page/OwnerDashboard';
import Dashboard from './page/Dashboard';
import MyRentals from './page/MyRentals';
// import RentalHistory from './page/RentalHistory';
import OwnerProducts from './page/MyProduct';
import Footer from './components/Footer';
import AdminDashboard from './page/adminDashboard/AdminDashboard';
import Users from './page/adminDashboard/UserPanel';
import BlockedProducts from './page/adminDashboard/BlockedProducts';
import AllProducts from './page/adminDashboard/AllProducts';
import AllRentalsPanel from "./page/adminDashboard/AllRentalsPanel";
import TermsAndConditions from "./page/TermAndPolicies";
import FloatingIcon from './page/FloatingIcon';
import ContactUsPage from './page/Contactus';
import AdminContactMessaage from './page/adminDashboard/AdminContactus';
import Privacy from "./page/PrivacyPolicy";
// import Terms from "./page/TermAndPolicies";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
         <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add-product" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* OLD ROUTE (CAN REMOVE LATER) */}
        {/* <Route path="/ownedashboard" element={<OwnerDashboard />} /> */}


        {/* User Dashboard Routes*/}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="rental-requests" element={<OwnerDashboard />} />
          <Route path="my-rentals" element={<MyRentals />} />
          {/* <Route path="rental-history" element={<RentalHistory />} /> */}
          <Route path="owner-products" element={<OwnerProducts />} />
        </Route>

        {/* Admin Dashbaord Routes*/}
        <Route path="/admin/dashboard" element={<AdminDashboard />} >
          <Route path="users" element={<Users />} />
          <Route path="blocked-products" element={<BlockedProducts />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="all-rentals" element={<AllRentalsPanel />} />
          <Route path="admin-contact" element={<AdminContactMessaage />} />
        </Route>

 
        <Route path="/terms" element={<TermsAndConditions />}/>
         <Route path="/privacy" element={<Privacy />}/>
         
      </Routes>
      <FloatingIcon />
      <Footer />
    </>
  );
};

export default App;
