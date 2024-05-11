import { getSession } from "@/actions"
import OtherPlatformAuth from "@/components/OtherPlatformAuth"
import RegisterForm from "@/components/registerForm"
import { redirect } from "next/navigation"

const RegisterPage = async () => {
  const session = await getSession()

  if (session.isLoggedIn) {
    redirect("/")
  }
  return (
    <div className="login border p-14 bg-white rounded-lg p-b-4">
      <h1 className="text-xl">Register Page</h1>
      <RegisterForm />
      <OtherPlatformAuth />
    </div>
  );
}

export default RegisterPage