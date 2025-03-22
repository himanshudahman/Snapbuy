import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Initial product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to Cart Function
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <div className="product-details container">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6">
            <img
              className="product-image"
              src={`${
                import.meta.env.VITE_API_URL
              }/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <h4 className="product-price">₹{product.price}</h4>
              <p className="product-category">
                Category: <span>{product.category?.name}</span>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="row">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <div key={p._id} className="col-md-4">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`${
                        import.meta.env.VITE_API_URL
                      }/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">₹{p.price}</p>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="btn btn-primary m-3"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No similar products found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
