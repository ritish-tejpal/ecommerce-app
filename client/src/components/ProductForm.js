import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@mui/material';
import axios from 'axios';



const ProductForm = () => {
    const handleSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/products/", {
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            category: values.category
        }).then((response) => {
            if(response.status === 200){
                return alert("Product added successfully");
            }
            else if(response.status === 400){
                return alert("Product not added. Try again.");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
    <div>
        <h1>Upload your products</h1>
        <Formik
            initialValues={
                {
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    category: "",
                }
            }
            onSubmit={handleSubmit}
        >
            <Form>
                <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    type="text"
                    variant="outlined"
                    fullWidth
                />
                <ErrorMessage name="name" component="div" />
                <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    type="text"
                    variant="outlined"
                    fullWidth
                />
                <ErrorMessage name="description" component="div" />
                <Field
                    as={TextField}
                    label="Price"
                    name="price"
                    type="text"
                    variant="outlined"
                    fullWidth
                />
                <ErrorMessage name="price" component="div" />
                <Field
                    as={TextField}
                    label="Quantity"
                    name="quantity"
                    type="text"
                    variant="outlined"
                    fullWidth
                />
                <ErrorMessage name="quantity" component="div" />
                <Field
                    as={TextField}
                    label="Category"
                    name="category"
                    type="text"
                    variant="outlined"
                    fullWidth
                />
                <ErrorMessage name="category" component="div" />
                <Button type="submit">Submit</Button>
            </Form>
        </Formik>
    </div>
  )
}

export default ProductForm
