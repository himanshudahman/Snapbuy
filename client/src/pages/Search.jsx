import React from "react";
import Layout from "./../component/layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `${values?.results.length} Products Found`}
          </h6>

          {/* Render Products */}
          <div className="row">
            {values?.results.map((product) => (
              <div key={product._id} className="col-md-4 mb-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">₹ {product.price}</p>
                    <p className="card-text">
                      {product.description.substring(0, 30)}...
                    </p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
