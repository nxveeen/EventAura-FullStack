import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { loginUser, getUserAuthenticated } from "../../store/AuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = searchParams.get("mode") === "login";
  const isAuthenticated = useSelector(getUserAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email: email, password: password };
    console.log(credentials);
    dispatch(loginUser(credentials));
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg bg-blue-500 text-white"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className="text-blue-500 underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
