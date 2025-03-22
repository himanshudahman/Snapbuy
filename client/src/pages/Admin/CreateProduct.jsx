import React, { useState, useEffect, useRef } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState("");

  // Ref for file input
  const fileInputRef = useRef(null);

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
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle product submission
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

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/create-product`,
        formData
      );
      if (data.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid mp-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Create Products</h1>
            <form onSubmit={handleSubmit}>
              <div className="m-1 w-75">
                <Select
                  variant="borderless"
                  placeholder="Select the Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
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
                  {photo && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview"
                        height="100px"
                        className="rounded"
                      />
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                  />
                </div>

                {/* Shipping */}
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                  >
                    <option value="">Select Shipping</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
