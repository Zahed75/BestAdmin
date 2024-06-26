"use client";
import InventoryTable from "@/components/dashboard/outletspage/dynamic/InventoryTable";
import OutletsDynamicHead from "@/components/dashboard/outletspage/dynamic/OutletsDynamicHead";
import Image from "next/image";
import dum from "@/public/image/dum.png";
import { useEffect, useState } from "react";
import useImgBBUpload from "@/utils/useImgBBUpload";
import Loading from "../../loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/slice/usersSlice";
import { fetchApi } from "@/utils/FetchApi";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

export default function SingleOutlet({ outlet }) {
  const [isLoading, setIsLoading] = useState(false);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);

  const { error, handleUpload, imageUrl, uploading } = useImgBBUpload();
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.users?.users);

  const router = useRouter();

  useEffect(() => {
    setManagerEmail(outlet?.outletManager?.email);
    setManagerPhone(outlet?.outletManager?.phoneNumber);
    setSelectedManager(outlet?.outletManager?._id);
  }, [outlet]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const OutletManager = users?.filter((user) => user?.role === "BA");

  const handleUserImgFileChange = async (event) => {
    const file = event.target.files[0];
    setIsLoading(true);

    try {
      const uploadedImageUrl = await handleUpload(file);

      setIsLoading(false);
      console.log(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };
  const handleManagerChange = (event) => {
    const managerId = event.target.value;
    const manager = users?.find((user) => user?._id === managerId);
    if (manager) {
      setManagerEmail(manager.email);
      setManagerPhone(manager.phoneNumber);
      setSelectedManager(manager);
    } else {
      setManagerEmail("");
      setManagerPhone("");
      setSelectedManager(null);
    }
  };

  const handleUpdateOutlet = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = {
      outletName: formData.get("outletName"),
      outletLocation: formData.get("outletLocation"),
      outletManager: selectedManager?._id,
      outletManagerEmail: managerEmail,
      outletManagerPhone: managerPhone,
      outletImage: outlet?.outletImage || imageUrl,
      cityName: formData.get("cityName"),
    };

    try {
      const response = fetchApi(
        `/outlet/updateOutlet/${outlet?._id}`,
        "PUT",
        data
      );

      if (response) {
        setIsLoading(false);
        router.push("/dashboard/outlets");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  //   /outlet/updateOutlet/
  return (
    <main className="">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <form onSubmit={handleUpdateOutlet} action="" className="w-full">
            <section className="mt-10 flex justify-between items-center">
              <OutletsDynamicHead outlet={outlet} />
              <button
                type="submit"
                className="text-sm text-white bg-black rounded-md px-3 py-2 text-nowrap"
              >
                Save Changes
              </button>
            </section>

            <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
              <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
                <div className="p-5 border bg-white rounded-md shadow-md w-full">
                  <h5 className="text-md font-bold mb-3">Outlet info</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-5">
                    {outlet?.outletImage ? (
                      <Image
                        src={outlet?.outletImage}
                        alt="user"
                        width={145}
                        height={145}
                        className="w-[145px] h-[145px] object-cover rounded-md"
                      />
                    ) : (
                      <div>
                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                          onChange={handleUserImgFileChange}
                          className="hidden "
                        />
                        <label
                          for="file-upload"
                          className="z-20 flex flex-col-reverse items-center justify-center w-[145px] h-[145px] cursor-pointer border py-2 bg-gray-200 rounded-md"
                        >
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0925 2.4917C6.35684 2.4917 4.48901 2.4917 3.32849 3.65177C2.16797 4.81185 2.16797 6.67896 2.16797 10.4132C2.16797 14.1473 2.16797 16.0145 3.32849 17.1746C4.48901 18.3347 6.35684 18.3347 10.0925 18.3347C13.8281 18.3347 15.6959 18.3347 16.8565 17.1746C18.017 16.0145 18.017 14.1473 18.017 10.4132V9.99626"
                              stroke="black"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                              stroke="black"
                              strokeWidth="1.25"
                            />
                            <path
                              d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                              stroke="black"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>
                      </div>
                    )}

                    <div className="col-span-2 grid grid-cols-2 justify-between items-center gap-5">
                      <div className="flex flex-col space-y-1 w-full">
                        <label
                          htmlFor="outletName"
                          className="text-sm font-semibold text-gray-600"
                        >
                          Outlet Name
                        </label>
                        <input
                          type="text"
                          id="outletName"
                          name="outletName"
                          defaultValue={outlet?.outletName}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none "
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-full">
                        <label
                          htmlFor="outletLocation"
                          className="text-sm font-semibold text-gray-600"
                        >
                          Outlet Location
                        </label>
                        <input
                          type="text"
                          id="outletLocation"
                          name="outletLocation"
                          defaultValue={outlet?.outletLocation}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none "
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-full">
                        <label
                          htmlFor="cityName"
                          className="text-sm font-semibold text-gray-600"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="cityName"
                          name="cityName"
                          defaultValue={outlet?.cityName}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none "
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-full col-span-2">
                        <label
                          htmlFor="outletManager"
                          className="text-sm font-semibold text-gray-600"
                        >
                          Outlet Manager
                        </label>
                        <div className="flex justify-start items-center border border-gray-300 rounded-md p-2 gap-3">
                          <Image
                            width={32}
                            height={32}
                            className="w-8 h-8"
                            src={outlet?.outletImage || dum}
                            alt="img"
                          />
                          <div className=" w-full">
                            <div className="relative flex px-2 rounded-md bg-white">
                              <select
                                id="outletName"
                                name="outletName"
                                onChange={handleManagerChange}
                                required
                                className="text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                              >
                                <option value={outlet?.outletManager?._id}>
                                  {outlet?.outletManager?.firstName +
                                    " " +
                                    outlet?.outletManager?.lastName}
                                </option>
                                {OutletManager?.map((user, i) => (
                                  <option key={i} value={user?._id}>
                                    {user?.firstName + " " + user?.lastName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 w-full">
                        <label
                          htmlFor="outletName"
                          className="text-sm font-semibold text-gray-600"
                        >
                          Manager Phone Number
                        </label>
                        <input
                          type="text"
                          id="managerPhoneNumber"
                          name="managerPhoneNumber"
                          defaultValue={managerPhone}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none "
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-full">
                        <label
                          htmlFor="managerEmail"
                          className="text-sm font-semibold text-gray-600"
                        >
                          Manager Email Address
                        </label>
                        <input
                          type="text"
                          id="managerEmail"
                          name="managerEmail"
                          defaultValue={managerEmail}
                          className="border border-gray-300 rounded-md p-2 focus:outline-none "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
          <div className="pt-10 shadow-md rounded-md p-5 bg-white my-5 border">
            <InventoryTable />
          </div>
        </div>
      )}
    </main>
  );
}
