import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {

  const verifyPremiumUser = async ()=>{
    const res = await axios.get(BASE_URL + "/premium/verify",
      {withCredentials : true }
    )
  }
const handleBuyClick = async (type) => {
    try {
      const orderResponse = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = orderResponse.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Dev Partner',
        description: 'Connect to Other Developers..',
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: { color: '#F37254' },
        handler: async (response) => {
          // This runs after successful payment
          await verifyPremiumUser();
          alert("Payment Successful! You are now a Premium member.");
          window.location.href = "/"; // Redirect to home
        }
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };



  return (
 <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">

    {/* Silver Plan */}
    <div className="card bg-white shadow-xl rounded-2xl p-8 flex-1 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Silver Membership
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Perfect for getting started
      </p>

      <ul className="space-y-3 text-gray-700 mb-6">
        <li>✅ Chat with other users</li>
        <li>✅ 100 connection requests / day</li>
        <li>✅ Verified blue tick</li>
        <li>✅ Duration: 3 months</li>
      </ul>

      <div className="text-center mb-6">
        <span className="text-3xl font-extrabold text-indigo-600">₹499</span>
        <span className="text-gray-500 text-sm"> / 3 months</span>
      </div>

      <button className="btn btn-primary w-full rounded-xl text-lg" onClick={() => handleBuyClick("silver")}>
        Buy Silver
      </button>
    </div>

    {/* Gold Plan */}
    <div className="card bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl rounded-2xl p-8 flex-1 text-white relative">

      <span className="absolute top-4 right-4 badge badge-warning text-black">
        Popular
      </span>

      <h1 className="text-2xl font-bold text-center mb-4">
        Gold Membership
      </h1>

      <p className="text-center text-indigo-100 mb-6">
        Best value for power users
      </p>

      <ul className="space-y-3 mb-6">
        <li>✅ Unlimited chat</li>
        <li>✅ Infinite connection requests</li>
        <li>✅ Verified blue tick</li>
        <li>✅ Duration: 6 months</li>
      </ul>

      <div className="text-center mb-6">
        <span className="text-3xl font-extrabold">₹899</span>
        <span className="text-indigo-100 text-sm"> / 6 months</span>
      </div>

      <button className="btn btn-warning w-full rounded-xl text-lg text-black" onClick={() => handleBuyClick("gold")}>
        Buy Gold
      </button>
    </div>

  </div>
</div>
  )
}

export default Premium