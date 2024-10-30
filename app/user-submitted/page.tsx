import type { Metadata } from "next";
import { userSubmittedApi } from "@/api/userSubmittedApi";
import { UserSubmittedList2 } from "@/components/UserSubmittedList/UserSubmittedList2";

export const metadata: Metadata = {
  title: "User submitted",
  description: "This is User submitted",
};

export default async function Page() {
  const list = await userSubmittedApi.getListUserSubmittedTag();
  // console.log("list", list);
  return <UserSubmittedList2 list={list} />;
}
