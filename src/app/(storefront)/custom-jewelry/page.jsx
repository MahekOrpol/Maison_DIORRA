import React from "react";
import { BiSolidHomeCircle } from "react-icons/bi";
import { FaEnvelopeOpenText, FaGift, FaPeopleRoof } from "react-icons/fa6";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div>
        <img src="/img/customjewel.png" />
      </div>
      <div className="wrapper pt-10 pb-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Custom Jewelry</h1>
          <p className="text-sm text-gray-600 mt-2">
            Jewelry as Unique as Your Story
          </p>
          < img src="/img/customline.png" className="w-2/3 xl:w-[20%] pb-10" />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            {
              img: <FaEnvelopeOpenText size={27} />,
              title: "Uniqueness and Exclusivity",
              desc: "Custom jewelry ensures no one else will have the exact same piece, making it truly yours.",
            },
            {
              img: <FaPeopleRoof size={27} />,
              title: "Personalization",
              desc: "Tailor every detail to your style, from the choice of gem to the design elements.",
            },
            {
              img: <FaGift size={27} />,
              title: "Celebrate Special Moments",
              desc: "Create a lasting memory for engagements, milestone, birthdays, or any anniversary.",
            },
            {
              img: <BiSolidHomeCircle size={27} />,
              title: "Quality and Craftsmanship",
              desc: "Every custom piece is handcrafted by skilled artisans using the finest materials.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg shadow hover:shadow-md transition flex flex-col items-center p-4"
            >
              <span className="p-3 rounded-3xl bg-gray-300">{feature.img}</span>
              <h3 className="text-lg md:text-xl pt-3 font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center pt-14 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Designed by You, Crafted by Us</h2>
          <p className="text-sm text-gray-600 pt-1">
            Create a unique piece of jewelry that reflects your personal style and story
          </p>
          < img src="/img/customline.png" className="w-2/3 xl:w-[20%] pb-10" />
        </div>

        <form className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3">
          <input
            type="text"
            placeholder="Name*"
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number*"
            className="border p-3 rounded w-full"
            required
          />
          </div>
          <input
            type="email"
            placeholder="Email Address*"
            className="border p-3 rounded w-full md:col-span-2 mb-3"
            required
          />
          <select className="border p-3 rounded w-full mb-3">
            <option>Choose Type</option>
            <option>Ring</option>
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Earrings</option>
          </select>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3">
          <input
            type="text"
            placeholder="Total Budget"
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Metal Type"
            className="border p-3 rounded w-full"
          />
          </div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            className="w-full p-3 border rounded md:col-span-2 mb-1"
          />
          <p className="text-xs text-gray-500 md:col-span-2 mb-3">
            Choose your file here to be upload. Allowed types: pdf, jpg, png, jpeg, doc, docx
          </p>
          <textarea
            placeholder="Please describe your idea for this Custom Project..."
            className="border p-2 rounded w-full md:col-span-2 mb-3"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 text-base rounded w-full md:col-span-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
