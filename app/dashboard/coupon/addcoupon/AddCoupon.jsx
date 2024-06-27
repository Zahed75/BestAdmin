"use client";
import AddCouponDynamicHead from "@/components/dashboard/coupon/dynamic/AddCouponDynamicHead";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("usage");
  const [productInputValue, setProductInputValue] = useState("");
  const [productValueArray, setProductValueArray] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [excludeProductInputValue, setExcludeProductInputValue] = useState("");
  const [excludeProductValueArray, setExcludeProductValueArray] = useState([]);
  const [excludeSearchResults, setExcludeSearchResults] = useState([]);
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categoryValueArray, setCategoryValueArray] = useState([]);
  const [categorySearchResults, setCategorySearchResults] = useState([]);
  const [excludeCategoryInputValue, setExcludeCategoryInputValue] =
    useState("");
  const [excludeCategoryValueArray, setExcludeCategoryValueArray] = useState(
    []
  );
  const [excludeCategorySearchResults, setExcludeCategorySearchResults] =
    useState([]);

  const dispatch = useDispatch();
  const product = useSelector((state) => state?.products);
  const categories = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const AllProducts = product?.products?.products;
  const data = AllProducts || [];
  const AllCategories = categories?.categories?.categories;
  const categoryData = AllCategories || [];

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

  const handleSearchProduct = (e) => {
    const searchText = e.target.value.toLowerCase();
    setProductInputValue(e.target.value);
    const filteredProducts = data?.filter((product) =>
      product?.productName?.toLowerCase().includes(searchText)
    );
    setSearchResults(filteredProducts);
  };

  const handleProductClick = (productId) => {
    const product = data?.find((p) => p._id === productId);
    if (product) {
      const newProductValueArray = [...productValueArray, product.productName];
      setProductValueArray(newProductValueArray);
      setSearchResults([]); // Clear search results after selection
      setProductInputValue(""); // Clear input field after selection
    }
  };

  const handleExcludeTagValue = (e) => {
    e.preventDefault();
    const newProductValueArray = [
      ...excludeProductValueArray,
      excludeProductInputValue,
    ];
    setExcludeProductValueArray(newProductValueArray);
    setExcludeProductInputValue(""); // Clear input value after adding
  };
  const handleExcludeRemoveTag = (indexToRemove) => {
    const newProductValueArray = excludeProductValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setExcludeProductValueArray(newProductValueArray);
  };

  const handleExcludeSearchProduct = (e) => {
    const searchText = e.target.value.toLowerCase();
    setExcludeProductInputValue(e.target.value);
    const filteredProducts = data?.filter((product) =>
      product?.productName?.toLowerCase().includes(searchText)
    );
    setExcludeSearchResults(filteredProducts);
  };

  const handleExcludeProductClick = (productId) => {
    const product = data?.find((p) => p._id === productId);
    if (product) {
      const newProductValueArray = [
        ...excludeProductValueArray,
        product.productName,
      ];
      setExcludeProductValueArray(newProductValueArray);
      setExcludeSearchResults([]);
      setExcludeProductInputValue("");
    }
  };

  const handleCategoryTagValue = (e) => {
    e.preventDefault();
    const newCategoryValueArray = [...categoryValueArray, categoryInputValue];
    setCategoryValueArray(newCategoryValueArray);
    setCategoryInputValue(""); // Clear input value after adding
  };

  const handleCategoryRemoveTag = (indexToRemove) => {
    const newCategoryValueArray = categoryValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setCategoryValueArray(newCategoryValueArray);
  };

  const handleSearchCategory = (e) => {
    const searchText = e.target.value.toLowerCase();
    setCategoryInputValue(e.target.value);
    const filteredCategories = categoryData?.filter((category) =>
      category?.categoryName?.toLowerCase().includes(searchText)
    );
    setCategorySearchResults(filteredCategories);
  };

  const handleCategoryClick = (categoryId) => {
    const category = categoryData?.find((c) => c._id === categoryId);
    if (category) {
      const newCategoryValueArray = [
        ...categoryValueArray,
        category.categoryName,
      ];
      setCategoryValueArray(newCategoryValueArray);
      setCategorySearchResults([]); // Clear search results after selection
      setCategoryInputValue(""); // Clear input field after selection
    }
  };

  const handleExcludeCategoryTagValue = (e) => {
    e.preventDefault();
    const newCategoryValueArray = [
      ...excludeCategoryValueArray,
      excludeCategoryInputValue,
    ];
    setExcludeCategoryValueArray(newCategoryValueArray);
    setExcludeCategoryInputValue(""); // Clear input value after adding
  };

  const handleExcludeCategoryRemoveTag = (indexToRemove) => {
    const newCategoryValueArray = excludeCategoryValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setExcludeCategoryValueArray(newCategoryValueArray);
  };

  const handleExcludeSearchCategory = (e) => {
    const searchText = e.target.value.toLowerCase();
    setExcludeCategoryInputValue(e.target.value);
    const filteredCategories = categoryData?.filter((category) =>
      category?.categoryName?.toLowerCase().includes(searchText)
    );
    setExcludeCategorySearchResults(filteredCategories);
  };

  const handleExcludeCategoryClick = (categoryId) => {
    const category = categoryData?.find((c) => c._id === categoryId);
    if (category) {
      const newCategoryValueArray = [
        ...excludeCategoryValueArray,
        category.categoryName,
      ];
      setExcludeCategoryValueArray(newCategoryValueArray);
      setExcludeCategorySearchResults([]); // Clear search results after selection
      setExcludeCategoryInputValue(""); // Clear input field after selection
    }
  };

  const freeShippingText =
    "Check this box if the coupon grants free shipping. A free shipping method must be enabled in your shipping zone and be set to require 'a valid free shipping coupon' (see the 'Free Shipping Requires' setting).";
  return (
    <main>
      <form action="" method="post" className="w-full">
        <section className="mt-10 flex justify-between items-center">
          <AddCouponDynamicHead title={"Add New Coupon"} />
          <button
            type="submit"
            className="text-sm text-white bg-black rounded-md px-3 py-2"
          >
            {isLoading ? "Adding User..." : "Add New User"}
          </button>
        </section>

        <section className=" mt-10">
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
              <h4 className="text-gray-600 text-sm ">Coupon Name</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="text"
                    id="couponName"
                    name="couponName"
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Discount Type </h4>
              <div className="">
                <div>
                  <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                    <select
                      id="discountType"
                      name="discountType"
                      required
                      className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                    >
                      <option>Fixed</option>
                      <option>Percentage</option>
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
                    id="couponAmount"
                    name="couponAmount"
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Allow Free Shipping</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    id="allowFreeShipping"
                    name="allowFreeShipping"
                    className="mt-1"
                    type="checkbox"
                  />
                  <label
                    htmlFor="allowFreeShipping"
                    className="font-semibold text-md"
                  >
                    {freeShippingText}
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-start items-center my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Expiry Date</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="date"
                    id="couponExpiry"
                    name="couponExpiry"
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
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
                    id="minimumSpend"
                    name="minimumSpend"
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
                    id="maximumSpend"
                    name="maximumSpend"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Individual Use Only</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    id="individualUseOnly"
                    name="individualUseOnly"
                    className="mt-1"
                    type="checkbox"
                  />
                  <label
                    htmlFor="individualUseOnly"
                    className="font-semibold text-md cursor-pointer"
                  >
                    Check this box if the coupon cannot be used in conjunction
                    with other coupons.
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude sale items</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    id="excludeSaleItems"
                    name="excludeSaleItems"
                    className="mt-1"
                    type="checkbox"
                  />
                  <label
                    htmlFor="excludeSaleItems"
                    className="font-semibold text-md"
                  >
                    Check this box if the coupon should not apply to items on
                    sale. Per-item coupons will only work if the item is not on
                    sale. Per-cart coupons will only work if there are items in
                    the cart that are not on sale.
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full h-[2px] bg-gray-100 my-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Products</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2 w-full">
                    <div>
                      <input
                        type="text"
                        id="product"
                        value={productInputValue}
                        onChange={handleSearchProduct}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product?._id}
                            onClick={() => handleProductClick(product._id)}
                            className="cursor-pointer hover:bg-gray-100 p-2"
                          >
                            {product?.productName}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {productValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center"
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

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude Products</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2 w-full">
                    <div>
                      <input
                        type="text"
                        id="excludeProduct"
                        value={excludeProductInputValue}
                        onChange={handleExcludeSearchProduct}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                    {excludeSearchResults.length > 0 && (
                      <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                        {excludeSearchResults.map((product) => (
                          <div
                            key={product?._id}
                            onClick={() =>
                              handleExcludeProductClick(product._id)
                            }
                            className="cursor-pointer hover:bg-gray-100 p-2"
                          >
                            {product?.productName}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {excludeProductValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center"
                        >
                          <span className="text-md text-black">{tag}</span>
                          <button
                            onClick={() => handleExcludeRemoveTag(index)}
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

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Product Categories</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2 w-full">
                    <div>
                      <input
                        type="text"
                        id="category"
                        value={categoryInputValue}
                        onChange={handleSearchCategory}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                    {categorySearchResults.length > 0 && (
                      <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                        {categorySearchResults.map((category) => (
                          <div
                            key={category?._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className="cursor-pointer hover:bg-gray-100 p-2"
                          >
                            {category?.categoryName}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {categoryValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center"
                        >
                          <span className="text-md text-black">{tag}</span>
                          <button
                            onClick={() => handleCategoryRemoveTag(index)}
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

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">
                Exclude Product Categories
              </h4>
              <div className="col-span-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="border border-gray-300 rounded-md p-2 w-full">
                    <div>
                      <input
                        type="text"
                        id="excludeCategory"
                        value={excludeCategoryInputValue}
                        onChange={handleExcludeSearchCategory}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                    {excludeCategorySearchResults.length > 0 && (
                      <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                        {excludeCategorySearchResults.map((category) => (
                          <div
                            key={category?._id}
                            onClick={() =>
                              handleExcludeCategoryClick(category._id)
                            }
                            className="cursor-pointer hover:bg-gray-100 p-2"
                          >
                            {category?.categoryName}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                      {excludeCategoryValueArray.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center"
                        >
                          <span className="text-md text-black">{tag}</span>
                          <button
                            onClick={() =>
                              handleExcludeCategoryRemoveTag(index)
                            }
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
                    id="usageLimitPerCoupon"
                    name="usageLimitPerCoupon"
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
                    id="limitUsageToXItems"
                    name="limitUsageToXItems"
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
                    id="usageLimitPerUser"
                    name="usageLimitPerUser"
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
