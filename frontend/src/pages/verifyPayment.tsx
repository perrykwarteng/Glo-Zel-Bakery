import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const VerifyPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "loading" | "success" | "failed" | "error"
  >("loading");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    if (reference) {
      verifyPayment(reference);
    } else {
      setStatus("error");
    }
  }, [location.search]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/payments/verify/${reference}`
      );
      const result = await response.json();

      if (result.status === "success") {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setStatus("error");
    }
  };

  const goHome = () => {
    navigate("/order");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        {status === "loading" && (
          <p className="text-gray-600 mb-6">Verifying payment status...</p>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful 🎉</h1>
            <p className="text-gray-600 mb-6">
              Thank you! Your payment was completed successfully.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Failed ❌</h1>
            <p className="text-gray-600 mb-6">
              Sorry, your payment could not be verified.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p className="text-gray-600 mb-6">
              Something went wrong. We couldn't verify your payment.
            </p>
          </>
        )}

        <button onClick={goHome} className="btn-primary">
          Go to Order
        </button>
      </div>
    </div>
  );
};

export default VerifyPayment;
