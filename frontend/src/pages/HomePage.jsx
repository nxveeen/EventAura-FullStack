import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/EventStore";
import { getUser, getUserAuthenticated, logout } from "../store/AuthStore";
import Marquee from "../components/Marquee";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Footer from "../components/Footer";

const HomePage = () => {
  const allEvents = useSelector(getAllEvents);
  const isAuthenticated = useSelector(getUserAuthenticated);
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();

  return (
    <>
      <div className="h-screen w-full flex flex-col text-gray-800">
        <section className="flex h-[500px] py-14 px-8 sm:px-12">
          <h1 className="text-7xl font-extrabold leading-none sm:text-8xl tracking-tight">
            Event
            <span className="ml-1 relative bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text tracking-tight">
              Aura
              <span className="absolute w-full bottom-[10px] left-0 border-b-4 border-dashed border-blue-400 sm:border-b-8"></span>
            </span>
          </h1>
        </section>
        <section className="w-full h-auto overflow-clip">
          <Marquee speed={10} from={0} to={"-100%"} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
