import React, { useEffect, useState } from "react";
import AdminMenu from "../../component/layout/AdminMenu";
import Layout from "./../../component/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 text-center">
          <h1>All Products List</h1>
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mb-3 d-flex">
                <Link
                  className="product-link w-100"
                  to={`/dashboard/admin/product/${p.slug}`}
                >
                  <div className="card h-100" style={{ width: "100%" }}>
                    <img
                      className="card-img-top"
                      src={`${
                        import.meta.env.VITE_API_URL
                      }/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text flex-grow-1">{p.description}</p>
                      <p className="card-text">₹{p.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
