import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/all-toppers");
  return <>About Strategy Ias</>;
}
