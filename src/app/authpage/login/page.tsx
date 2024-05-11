import { getSession } from "@/actions"
import OtherPlatformAuth from "@/components/OtherPlatformAuth"
import LoginForm from "@/components/loginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const session = await getSession()

  if (session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="login border p-14 bg-white rounded-lg p-b-4">
      <h1 className="text-xl">Login Page</h1>
      <LoginForm />
      <OtherPlatformAuth />
    </div>
  );
}

export default LoginPage