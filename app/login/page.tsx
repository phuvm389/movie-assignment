import type { Metadata } from "next";
import Login from "@/components/Login/Login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Movie Friends",
};

export default function Page() {
  return <Login />;
}
