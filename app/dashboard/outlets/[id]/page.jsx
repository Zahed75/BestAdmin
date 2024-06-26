"use client";

import { useState } from "react";
import Loading from "../../loading";
import SingleOutlet from "./SingleOutlet";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  return <main className="">{isLoading ? <Loading /> : <SingleOutlet />}</main>;
}
