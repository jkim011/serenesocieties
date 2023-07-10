import React, { useState } from 'react';
import AdminNav from '../../components/admin/AdminNav';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { QUERY_PRODUCTS } from '../../utils/queries';
import ProductList from '../../components/ProductList';

function ProductsDash() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  
  const [addProduct, { error }] = useMutation(ADD_PRODUCT, {
    update(cache, { data: { addProduct } }) {
      try {
        const { products } = cache.readQuery({ query: QUERY_PRODUCTS });

        cache.writeQuery({
          query: QUERY_PRODUCTS,
          data: { products: [addProduct, ...products] },
        });
      } catch (e) {
        console.error(e)
      }
    },
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addProduct({
        variables: {
          name,
          image,
          image2,
          description,
          price
        },
      });

      setName('');
      setImage('');
      setImage2('');
      setDescription('');
      setPrice('');

      window.alert("product created")
    } catch(err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'image') {
      setImage(value);
    }
    if (name === 'image2') {
      setImage2(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'price') {
      setPrice(value);
    }
  };

  return (
    <div className='admin-container'>
      <AdminNav />
      
      <div>
        <h3>My Products</h3>
        {/* query product list */}
      </div>

      {/* make a modal form */}
      {/* <div>
        <h3>Add New Product</h3>
        <form onSubmit={handleCreateProduct} >
          <textarea 
            name='name' value={name} placeholder='Product name'
            onChange={handleChange} rows={1} className=''
          />

          

        </form>
      </div> */}
    </div>
  )
}

export default ProductsDash;