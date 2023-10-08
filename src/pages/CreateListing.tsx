import "./listing.css";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdOutlineTitle } from "react-icons/md";
import { BiSolidCategoryAlt, BiSolidBath } from "react-icons/bi";
import { useState } from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 z-0">
        Create <span className="underline decoration-slate-400"> Listing</span>
      </h1>
      <form className="listing-form flex flex-col  mx-auto justify-center gap-3">
        <label htmlFor="title" className="flex items-center gap-3 ">
          <MdOutlineTitle />
          Title
        </label>
        <input
          className="px-3 py-1 focus:outline-none border rounded"
          type="text"
          name="title"
          id="title"
          maxLength={62}
          minLength={10}
          required
        />
        <label htmlFor="description" className="flex gap-3 items-center ">
          <TfiLayoutListThumbAlt />
          Property details
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          style={{
            resize: "none",
          }}
          className="focus:outline-none border rounded-lg p-3"
        ></textarea>
        <label htmlFor="Address" className="flex items-center gap-3">
          Address
        </label>
        <input
          className="px-3 py-1 focus:outline-none border rounded"
          type="text"
          name="address"
          id="address"
        />

        {/* Checkboxes */}

        <div>
          <div className="flex gap-2">
            <input type="checkbox" id="rent" className="w-5" />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="parking" className="w-5" />
            <span>Parking spot</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" className="w-5" />
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="Offer" className="w-5" />
            <span>Offer</span>
          </div>
        </div>

        {/* Bedrooms and bathrooms */}

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-5 ">
            <div className="flex gap-3 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="border rounded-lg px-3 py-1"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                id="Baths"
                min={1}
                max={10}
                required
                className="border rounded-lg px-3 py-1"
              />
              <span>Baths</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              id="regularPrice"
              min={1}
              max={10}
              required
              className="border rounded-lg px-3 py-3"
            />
            <div className="flex flex-col items-center">
              <span>Regular price</span>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              id="discountedPrice"
              min={1}
              max={10}
              required
              className="border rounded-lg px-3 py-3"
            />
            <div className="flex flex-col items-center">
              <span>Discounted price</span>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
        </div>

        {/* Image uploading */}

        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <p
          className="text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX: 6 IMAGES). <br /> The first image will be
          the cover.
        </p>
        <div className="flex gap-5">
          <input
            className="mx-auto p-3 border rounded-lg w-full"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            multiple
          />
          <button className="border border-green-700 rounded-lg text-green-600 p-3 hover:shadow-lg  transition-shadow disabled:opacity-80">
            Upload image
          </button>
        </div>
        <button className="uppercase bg-slate-700 border p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">
          Create listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
