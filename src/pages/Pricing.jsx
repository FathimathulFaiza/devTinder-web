const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="max-w-2xl bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          Pricing
        </h1>

        <p className="text-gray-700 text-center mb-8">
          DevPartner is an educational platform. Payments are collected only for
          learning subscriptions and future premium features.
        </p>

        <div className="border rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Learning Subscription</h2>
          <p className="text-3xl font-bold text-green-600 mb-2">₹499 / month</p>
          <p className="text-gray-600">
            Access to learning features, practice tools, and mentorship support.
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          All prices are in INR (Indian Rupees).
        </p>
      </div>
    </div>
  );
};

export default Pricing;