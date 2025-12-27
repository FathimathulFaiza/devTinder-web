const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-10">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Contact Us
        </h1>

        <p className="text-gray-600 text-center mb-8">
          If you have any questions, feedback, or support requests, feel free to reach out to us.
        </p>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong>📧 Email:</strong>{" "}
            <span className="text-indigo-600">support@devpartner.work</span>
          </p>

          <p>
            <strong>📞 Phone:</strong>{" "}
            <span className="text-indigo-600">+91 9XXXXXXXXX</span>
          </p>

          <p>
            <strong>🏢 Address:</strong><br />
            DevPartner Technologies<br />
            Kannur, Kerala, India
          </p>

          <p>
            <strong>⏰ Support Hours:</strong><br />
            Monday – Friday (10:00 AM – 6:00 PM IST)
          </p>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          We usually respond within 24 hours.
        </div>
      </div>
    </div>
  );
};

export default Contact;