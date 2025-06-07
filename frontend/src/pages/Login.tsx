import React, { useState } from "react";
import { Card, CardContent } from "../../src/components/ui/card";

import Logo from "../../asset/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    alert(`Logging in with Email: ${email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          <div className="flex items-center justify-center">
            <img src={Logo} className="w-[150px] mb-5" alt="glozel logo" />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
