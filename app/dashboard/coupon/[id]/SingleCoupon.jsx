"use client";
import CouponDynamicHead from "@/components/dashboard/coupon/dynamic/CouponDynamicHead";
import { useState } from "react";

export default function SingleCoupon() {
  const [activeTab, setActiveTab] = useState("general");
  const [productInputValue, setProductInputValue] = useState("");
  const [productValueArray, setProductValueArray] = useState([
    "Conion delta selling fan 56 inch",
    "Sony 4k 55 inch TV",
  ]);

  const handleTagValue = (e) => {
    e.preventDefault();
    const newProductValueArray = [...productValueArray, productInputValue];
    setProductValueArray(newProductValueArray);
    setProductInputValue(""); // Clear input value after adding
  };
  const handleRemoveTag = (indexToRemove) => {
    const newProductValueArray = productValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setProductValueArray(newProductValueArray);
  };

  const disabledDays = [
    {
      before: new Date(),
    },
  ];

  const handleBaseColorChange = (event) => {
    setBaseSelectedColor(event.target.value);
  };
  const handleBodyBgColorChange = (event) => {
    setBodyBgSelectedColor(event.target.value);
  };
  const handleBgColorChange = (event) => {
    setBgSelectedColor(event.target.value);
  };
  const handleBodyTextColorChange = (event) => {
    setBodyTextSelectedColor(event.target.value);
  };

  const freeShippingText =
    "Check this box if the coupon grants free shipping. A free shipping method must be enabled in your shipping zone and be set to require 'a valid free shipping coupon' (see the 'Free Shipping Requires' setting).";
  return (
    <main>
      <form action="" method="post" className="w-full">
        <section className="mt-10 flex justify-between items-center">
          <CouponDynamicHead />
          <button className="text-sm text-white bg-black rounded-md px-3 py-2">
            Save Changes
          </button>
        </section>
        <section>
          <div className="flex gap-x-2 my-5">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`${
                activeTab === "general"
                  ? "border-gray-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center py-2 px-4 border-b-2 text-center text-nowrap font-medium focus:outline-none bg-gray-100 w-full rounded-md `}
            >
              General
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("usage")}
              className={`${
                activeTab === "usage"
                  ? "border-gray-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center py-2 px-4 border-b-2 text-center text-nowrap font-medium focus:outline-none bg-gray-100 w-full rounded-md `}
            >
              Usage Restrictions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("limits")}
              className={`${
                activeTab === "limits"
                  ? "border-gray-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center py-2 px-4 border-b-2 text-center text-nowrap font-medium focus:outline-none bg-gray-100 w-full rounded-md `}
            >
              Usage Limits
            </button>
          </div>
        </section>

        <section
          className={`
        ${activeTab === "general" ? "block" : "hidden"} 
        border bg-white rounded-md shadow-md p-5 my-10
      `}
        >
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">General</h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Discount Type </h4>
              <div className="">
                <div>
                  <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                    <svg
                      className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none">
                      <option>Fixed Product Discount</option>
                      <option>Percentage Discount</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Amount</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="number"
                    id="sku"
                    defaultValue={10}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Allow Free Shipping</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input className="mt-1" type="checkbox" />
                  <span className="font-semibold text-md">
                    {freeShippingText}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-start items-start my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Expiry Date</h4>
              <div className="md:col-span-2">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-2">
                  <div className="border border-gray-300 shadow-lg rounded-md p-2">
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                      disabled={disabledDays}
                    />
                  </div>
                  <div className="border border-gray-300 shadow-lg rounded-md p-2">
                    <CustomTimePicker />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section
          className={`
        ${activeTab === "usage" ? "block" : "hidden"} 
        border bg-white rounded-md shadow-md p-5 my-10
      `}
        >
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">
              Usage Restrictions
            </h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Minimum Spend</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="text"
                    id="sku"
                    defaultValue={"No Minimum"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Maximum Spend</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="number"
                    id="sku"
                    defaultValue={10}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Individual Use Only</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input className="mt-1" type="checkbox" />
                  <span className="font-semibold text-md">
                    {
                      "Check this box if the coupon cannot be used in conjunction with other coupons."
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude sale items</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input className="mt-1" type="checkbox" />
                  <span className="font-semibold text-md">
                    {
                      "Check this box if the coupon should not apply to items on sale. Per-item coupons will only work if the item is not on sale. Per-cart coupons will only work if there are items in the cart that are not on sale."
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[2px] bg-gray-100 my-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Products</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2  w-full">
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        id="product"
                        value={productInputValue}
                        onChange={(e) => setProductInputValue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none col-span-3"
                      />
                      <button
                        onClick={handleTagValue}
                        className="border text-black font-semibold rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {productValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center "
                        >
                          <span className="text-md text-black">{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="text-gray-300 font-semibold ml-2"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude Products</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2  w-full">
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        id="product"
                        value={productInputValue}
                        onChange={(e) => setProductInputValue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none col-span-3"
                      />
                      <button
                        onClick={handleTagValue}
                        className="border text-black font-semibold rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {productValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center "
                        >
                          <span className="text-md text-black">{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="text-gray-300 font-semibold ml-2"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <section
          className={`
        ${activeTab === "limits" ? "block" : "hidden"} 
        border bg-white rounded-md shadow-md p-5 my-10
      `}
        >
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">Usage Limits</h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Usage limit per coupon</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="number"
                    id="usagelimit"
                    defaultValue={10}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Limit usage to X items</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="number"
                    id="limitusagetoxitems"
                    defaultValue={10}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Usage limit per user</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="number"
                    id="limitperuser"
                    defaultValue={10}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
