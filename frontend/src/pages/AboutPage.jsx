import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 bg-gray-50">
      <h1 className="text-6xl font-extrabold text-blue-500">About Us</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
        Welcome to <span className="font-bold text-blue-500">EventAura</span>!
        We are dedicated to bringing you the best experiences for shows, movies,
        and concerts. Our mission is to help you easily discover and book your
        favorite events, making entertainment accessible and enjoyable for
        everyone.
      </p>

      <h2 className="mt-10 text-4xl font-bold text-gray-800">Our Story</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
        Founded in [Year] by a group of passionate event enthusiasts, we started
        as a small platform aimed at connecting people with amazing experiences.
        Over the years, we’ve grown into a comprehensive platform that caters to
        all your entertainment needs, from ticket booking to personalized
        recommendations.
      </p>

      <h2 className="mt-10 text-4xl font-bold text-gray-800">Our Team</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
        Our diverse team is made up of industry experts, tech innovators, and
        creative minds who share a common goal: to enhance your event-going
        experience. We believe in the power of entertainment to bring people
        together and create lasting memories.
      </p>

      <h2 className="mt-10 text-4xl font-bold text-gray-800">Join Us</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
        We invite you to explore our platform, discover exciting events, and
        join our community. Follow us on social media to stay updated on the
        latest happenings and special offers!
      </p>

      <div className="mt-10">
        <a
          href="/contact"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default AboutPage;
