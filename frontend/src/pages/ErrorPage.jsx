import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center text-gray-500">
          <h1 className="text-9xl font-extrabold">🐣</h1>
          <p className="text-2xl font-semibold text-gray-700 mt-4">
            Uh-oh! Looks like this page took a vacation!
          </p>
          <p className="text-lg  mt-2">
            Don't worry, though! You can head back to the{" "}
            <a href="/" className="text-blue-500 underline">
              homepage
            </a>{" "}
            and try again!
          </p>
          <p className="mt-4 text-sm ">
            P.S. If you find the page, tell it to come back!
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
