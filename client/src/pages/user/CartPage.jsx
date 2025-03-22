import React from "react";
import Layout from "../../component/layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
  const [auth] = useAuth(); // No need to setAuth
  console.log("Auth State:", auth);

  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Total price function
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price || 0;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle checkout using Razorpay
  const handleCheckout = async () => {
    if (!auth?.token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/product/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ total: totalPrice() }),
        }
      );

      const data = await response.json();

      if (!data.success) return toast.error(data.message);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        handler: () => {
          toast.success("Payment Successful");
          navigate("/success");
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
          contact: "9991423362",
        },
        theme: { color: "#3399cc" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {auth?.token ? `Hello ${auth.user.name}` : "Welcome to SnapBuy"}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? auth?.token
                  ? `You have ${cart.length} items in your cart`
                  : "Please login to check out"
                : "Your cart is empty"}
            </h4>
          </div>
        </div>

        {/* Main Row */}
        <div className="d-flex align-items-start mt-4">
          {/* Product List */}
          <div className="col-md-9">
            {cart?.map((p, index) => (
              <div className="row m-3 p-3 card flex-row" key={index}>
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    width="100px"
                    height="100px"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h6>{p.name}</h6>
                  <p>
                    {p.description.length > 50
                      ? `${p.description.substring(0, 50)}...`
                      : p.description}
                  </p>
                  <p>
                    <b>Price:</b> ₹{p.price}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="col-md-3 text-center">
            <div className="card p-3">
              <h4>Checkout</h4>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ₹{totalPrice()}</p>
              <button
                className="btn btn-primary w-100"
                onClick={handleCheckout}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
