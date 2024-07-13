"use client";
import AddEventDynamicHead from "@/components/dashboard/settings/dynamic/AddEventDynamicHead";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchApi } from "@/utils/FetchApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddEvent() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const router = useRouter();

  const AllCategories = categories?.categories?.categories;

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("eventName"),
      description: formData.get("eventDescription"),
      url: formData.get("eventUrl"),
      categoriesId: formData.get("eventCategory"),
    };

    const { title, description, url, categoriesId } = data;

    if (!title || !description || !url || !categoriesId) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchApi("/event/create-event", "POST", data);
      setMessage("Event added successfully");
      setIsLoading(false);
      localStorage.removeItem("itemsOrder");
      router.push("/dashboard/settings/events");
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };
  return (
    <section>
      <AddEventDynamicHead title="Add New Event" />

      <form
        onSubmit={handleAddEvent}
        className="w-full mt-10 shadow-md rounded-md p-5"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col space-y-1 w-full">
            <label
              htmlFor="eventName"
              className="text-sm font-semibold text-gray-600"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-noneF"
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label
              htmlFor="eventUrl"
              className="text-sm font-semibold text-gray-600"
            >
              Url
            </label>
            <input
              type="text"
              id="eventUrl"
              name="eventUrl"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none "
            />
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="eventCategory"
            className="text-sm font-semibold text-gray-600"
          >
            Event Categories
          </label>
          <br />
          <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
            <select
              id="eventCategory"
              name="eventCategory"
              required
              className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
            >
              <option value="">Select Event Category</option>
              {AllCategories?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col space-y-1 w-full mt-5">
          <label
            htmlFor="eventDescription"
            className="text-sm font-semibold text-gray-600"
          >
            Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            cols={30}
            rows={3}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {message && (
          <div className="text-green-500 text-sm mt-2">{message}</div>
        )}

        <button
          type="submit"
          className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
        >
          {isLoading ? "Loading..." : "Add Category"}
        </button>
      </form>
    </section>
  );
}
