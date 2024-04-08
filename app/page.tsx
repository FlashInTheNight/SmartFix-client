import { redirect } from "next/navigation";

export default function Page() {
  redirect("/dashboard");
  return <h1>Hello, Next.js!</h1>;
}
