import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser, getUserLoading } from "../../store/AuthStore";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [showPasswords, setShowPasswords] = useState(false);

  // router hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // redux hooks
  const dispatch = useDispatch();
  const isLogin = searchParams.get("mode") === "login";

  //user state
  const userIsLoading = useSelector(getUserLoading);

  // Validate passwords match
  const validatePasswords = () => {
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    console.log("checking");

    if (!isLogin && trimmedPassword !== trimmedConfirmPassword) {
      setPasswordError(true);
      return false;
    }
    setPasswordError(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For signup, validate passwords match before submission
    if (!isLogin && validatePasswords()) {
      return;
    }

    const credentials = {
      email: email,
      password: password,
    };
    if (isLogin) {
      dispatch(loginUser(credentials));
    } else {
      console.log({ ...credentials, username: username });

      dispatch(registerUser({ ...credentials, username: username }));
    }
  };

  useEffect(() => {
    // console.log("called", userIsLoading);

    if (userIsLoading === false) navigate("/");
  }, [navigate, userIsLoading]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!isLogin) {
      validatePasswords();
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (!isLogin) {
      validatePasswords();
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
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
              type={showPasswords ? "text" : "password"}
              id="password"
              value={password}
              required
              onChange={(e) => {
                handlePasswordChange(e);
              }}
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
                type={showPasswords ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                required
                onChange={(e) => {
                  handleConfirmPasswordChange(e);
                }}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <p className="text-red-500 text-sm mt-1">
                {passwordError && "password do not match"}
              </p>
            </div>
          )}
          {!isLogin && (
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              type="button"
              onClick={() => setShowPasswords((prev) => !prev)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords ? (
                <>
                  <EyeOff size={16} />
                  Hide passwords
                </>
              ) : (
                <>
                  <Eye size={16} />
                  Show passwords
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg bg-blue-500 text-white"
              disabled={!isLogin && passwordError}
            >
              {isLogin
                ? userIsLoading
                  ? "Logging in..."
                  : "Log In"
                : "Sign Up"}
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
