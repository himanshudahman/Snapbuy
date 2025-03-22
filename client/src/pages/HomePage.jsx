import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Badge } from "antd";

export default function HomePage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Price options
  const priceOptions = [
    { _id: 1, name: "Under ₹500", array: [0, 500] },
    { _id: 2, name: "₹500 - ₹1000", array: [500, 1000] },
    { _id: 3, name: "₹1000 - ₹2000", array: [1000, 2000] },
    { _id: 4, name: "Above ₹2000", array: [2000, 10000] },
  ];

  // Get all categories
  const getAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      setCategories(data.category);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-count`
      );
      if (data?.success) {
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter products based on category and price
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Handle category filter change
  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
      );
      setProducts((prev) => [...prev, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Initial data load
  useEffect(() => {
    getAllCategories();
    getTotal();
    filterProduct();
  }, []);

  // Load more products on page change
  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  // Trigger filter when category/price changes
  useEffect(() => {
    filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="homepage">
        <div className="row">
          {/* ======= Filter Section ======= */}
          <div className="col-md-3 filter-section">
            {/* Filter by Category */}
            <h4 className="filter-title">Filter by Category</h4>
            {categories?.map((c) => (
              <div key={c._id} className="filter-item">
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}

            {/* Filter by Price */}
            <h4 className="filter-title mt-4">Filter by Price</h4>
            <Radio.Group
              value={JSON.stringify(radio)}
              onChange={(e) => setRadio(JSON.parse(e.target.value))}
              className="filter-item"
            >
              {priceOptions.map((p) => (
                <Radio key={p._id} value={JSON.stringify(p.array)}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>

            {/* Reset Filters */}
            <div className="mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* ======= Product Section ======= */}
          <div className="col-md-9 product-section">
            <h2 className="section-title">All Products</h2>
            <div className="row">
              {products.length > 0 ? (
                products.map((p) => (
                  <div key={p._id} className="col-md-4 mb-4">
                    <div className="card product-card">
                      <img
                        className="card-img-top"
                        src={`${
                          import.meta.env.VITE_API_URL
                        }/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-price">₹{p.price}</p>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item added to cart");
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>May Take some time to load...</p>
              )}
            </div>

            {/* Load More Button */}
            {products.length < total && (
              <div className="text-center mt-4">
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">
                    <br />
                    Loading...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
