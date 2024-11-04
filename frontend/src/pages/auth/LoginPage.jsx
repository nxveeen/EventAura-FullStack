import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser, getUserLoading } from "../../store/AuthStore";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "../../components/FormInput";

const LoginPage = () => {
  const initialInputState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const initialErrorState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  // const [passwordError, setPasswordError] = useState(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [input, setInput] = useState(initialInputState);
  const [error, setError] = useState(initialErrorState);

  // router hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // redux hooks
  const dispatch = useDispatch();
  const isLogin = searchParams.get("mode") === "login";

  //user state
  const userIsLoading = useSelector(getUserLoading);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);

    setInput((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { id, value } = e.target;
    // console.log(error);

    setError((prev) => {
      const stateObj = { ...prev, [id]: "" };

      switch (id) {
        case "email":
          if (!value) {
            stateObj[id] = "Please enter Email.";
            stateObj.all = false;
          }
          break;

        case "username":
          if (!value) {
            stateObj[id] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[id] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[id] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[id] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For signup, validate passwords match before submission
    if (!isLogin && error.all === false) {
      return;
    }

    const credentials = {
      email: input.email,
      password: input.password,
    };
    if (isLogin) {
      dispatch(loginUser(credentials));
    } else {
      // console.log({ ...credentials, username: input.username });

      dispatch(registerUser({ ...credentials, username: input.username }));
      navigate("/");
    }
  };

  useEffect(() => {
    // console.log("called", userIsLoading);

    if (userIsLoading === false) navigate("/");
  }, [navigate, userIsLoading]);

  return (
    <div className="flex justify-center items-center pt-6">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
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
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {error.email && <span className="text-red-500">{error.email}</span>}
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
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {error.password && (
              <span className="text-red-500">{error.password}</span>
            )}
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
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              {error.confirmPassword && (
                <span className="text-red-500">{error.confirmPassword}</span>
              )}
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
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {error.username && (
                <span className="text-red-500">{error.username}</span>
              )}
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
              disabled={
                !isLogin &&
                !(
                  error.username === "" &&
                  error.email === "" &&
                  error.password === "" &&
                  error.confirmPassword === ""
                )
              }
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
              onClick={() => {
                setInput(initialInputState);
                setError(initialErrorState);
              }}
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
