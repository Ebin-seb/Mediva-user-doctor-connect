import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
// import Productsedit from './Productsedit'


function Product() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showprod = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/shop/showprod/${id}`);
      // Ensure products is always an array
      setProducts(response.data.prod);
      console.log(response.data.prod)
    } catch (e) {
      console.log(e);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showprod();
  }, [id]);

  // Dummy button handlers
  const handleEdit = (productId) => {
    console.log('Edit product:', productId);
    navigate(`editproducts/${productId}`);
  };

  const handleDelete = async(productId) => {
    console.log('Delete product:', productId);
    try{
        const response = await axios.delete(`http://localhost:8000/api/shop/deleteproduct/${productId}`)
        console.log(response.data);
        alert(response.data.message);
        showprod()
    }
    catch(e){
      console.log(e)
    }
  };

 

  if (loading) return <div className="container-fluid">Loading...</div>;
  if (error) return <div className="container-fluid">Error: {error}</div>;

  return (
    <div className="container-fluid">
      <Outlet />
      
      {!window.location.pathname.includes('addproducts') && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Products</h1>
            <Link 
              to={`addproducts`} 
              className="btn btn-primary"
            >
              <i className="fas fa-plus me-2"></i>
              Add Product
            </Link>
          </div>

          <div className="row">
{products.map((a,i)=>(
              <div  className="col-xl-4 col-md-6 mb-4">
                <div key={i} className="card h-100 shadow-sm">
                  <img 
                    src={`http://localhost:8000/${a.image}`}
                    className="card-img-top" 
                    alt={a.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{a.name}</h5>
                    <p className="card-text flex-grow-1">
                      {a.description || 'No description available'}
                    </p>
                    <p className="card-text">
                      <strong>Price: ${a.price || 'N/A'}</strong>
                    </p>
                    <p className="card-text">
                      <strong>stock: {a.stock || 'out of stock'}</strong>
                    </p>
                    
                    
                    <div className="mt-auto d-flex gap-2">
                      <button 
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(a._id)}
                      >
                        <i className="fas fa-edit me-1"></i>
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(a._id)}
                      >
                        <i className="fas fa-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p>Click "Add Product" to create your first product.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Product;