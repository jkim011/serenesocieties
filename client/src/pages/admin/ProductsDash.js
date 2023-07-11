import React, { useState } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { QUERY_PRODUCTS } from '../../utils/queries';
import ProductList from '../../components/ProductList';

function ProductsDash() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

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
console.log(products)

  if(loading) {
    return (
      <div>Loading</div>
    )
  }
  return (
    <div className='admin-container'>
      <AdminNav />
      
      <div>
        <h3>My Products</h3>
        <Button onClick={handleShowModal}>Add New Product</Button>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleCreateProduct} >
              <textarea 
                name='name' value={name} placeholder='Product name'
                onChange={handleChange} rows={1} className=''
              />


            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="success">Create</Button>
          </Modal.Footer>
        </Modal>

        <div className='admin-products'>
          {products.map(product => (
            <div key={product._id} className="m-2 productCard">
            <div id="productHead">
              <Link to={`/admin-dashboard/manage/products/edit/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img
                  className="productImg productImg2"
                  src={product.image2}
                  alt=""
                />
              </Link>
            </div>
    
            <div className="container ">
              <div id="productDetails" className="column">
                <h5 className="col text-center productText">
                  {product.name}
                </h5>
                <h5 className="col text-center productText">
                  ${product.price}
                </h5>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProductsDash;