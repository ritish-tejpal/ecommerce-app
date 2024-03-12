import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const AddressForm = () => {

    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    useEffect(() => {
    const getUserData = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/accounts/profile/', {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        setUser(response.data.user);
        setProfile(response.data.user_profile);
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    };
    getUserData();
    }, []);

    return (
    <Formik
        initialValues={{
        full_name: user.full_name || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.pincode || '',
        country: user.country || ''
        }}
        validationSchema={Yup.object().shape({
        full_name: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        postalCode: Yup.string().required('Postal Code is required'),
        country: Yup.string().required('Country is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch('http://127.0.0.1:8000/accounts/profile/', values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setSubmitting(false);
        }}
    >
        {({ isSubmitting }) => (
        <Form>
            <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600">Full Name</label>
            <Field type="text" id="fullName" name="full_name" className="form-input mt-1 block w-full" placeholder="Enter Full name" value={(profile.full_name) ? profile.full_name : 'Enter Full name'} />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email Address</label>
            <Field type="email" id="email" name="email" className="form-input mt-1 block w-full" disabled 
            value={user.email} />
            </div>
            <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-600">Address</label>
            <Field type="text" id="address" name="address" className="form-input mt-1 block w-full" 
            value={profile.address ? profile.address : "123 Main St"} />
            </div>
            <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-semibold text-gray-600">City</label>
            <Field type="text" id="city" name="city" className="form-input mt-1 block w-full" 
            value={profile.city ? profile.city : "New York"} />
            </div>
            <div className="mb-4">
            <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-600">Postal Code</label>
            <Field type="text" id="postalCode" name="postalCode" className="form-input mt-1 block w-full" 
            value={profile.pincode ? profile.pincode : "10001"} />
            </div>
            <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-600">Country</label>
            <Field type="text" id="country" name="country" className="form-input mt-1 block w-full" 
            value={ (profile.country) ? profile.country : "United States"} />
            </div>
            <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600" disabled={isSubmitting}>
            Submit
            </button>
        </Form>
        )}
    </Formik>
    );
    }


const Checkout = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState({});
    const [user, setUser] = useState({});
    const [userProfile, setUserProfile] = useState({});

    const getShippingAddress = () => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/accounts/profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setUser(response.data.user);
            setUserProfile(response.data.user_profile);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const setUserCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        setCart(cart);
    }

    useEffect(() => {
        setUserCart();
        getShippingAddress();
    }, [])

    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                    <AddressForm />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    {Object.entries(cart).map(([key, item]) => (

                        <div key={key} className="flex justify-between items-center border-b border-gray-300 py-2">
                        <div>
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                        </div>
                        <span>${item.subtotal}</span>
                        </div>
                        
                    ))}
                    <div className="flex justify-between items-center py-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${
                            Object.entries(cart).reduce((acc, [key, item]) => {
                                return acc + item.subtotal;
                            }, 0)
                        }</span>
                    </div>
                    <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    onClick={() => navigate('/user/payment')}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
