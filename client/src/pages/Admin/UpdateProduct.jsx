import React, { useState, useEffect, useRef } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // Should be ID, not object
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  // Ref for file input
  const fileInputRef = useRef(null);

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${
          params.slug
        }`
      );
      if (data.success) {
        const product = data.product;
        setName(product.name);
        setId(product._id);
        setCategory(product.category._id);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setShipping(product.shipping);
        setExistingPhoto(
          `${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${
            product._id
          }`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (photo) {
        formData.append("photo", photo);
      }
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/product/update-product/${id}`,
        formData
      );

      if (data.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete product
  const handleDelete = async () => {
    let answer = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!answer) return; // ✅ Fixed: Use confirm for Yes/No action
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid mp-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
              <div className="m-1 w-75">
                <Select
                  placeholder="Select the Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  value={category}
                  onChange={(value) => setCategory(value)}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                {/* File Upload */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {photo ? photo.name : "Upload Photo"}
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo ? (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview"
                        height="100px"
                        className="rounded"
                      />
                    </div>
                  ) : existingPhoto ? (
                    <div className="mt-2">
                      <img
                        src={existingPhoto}
                        alt="Existing"
                        height="100px"
                        className="rounded"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Quantity */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>

                {/* Shipping */}
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    required
                  >
                    <option value="">Select Shipping</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>

                <button className="btn btn-danger mx-2" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
