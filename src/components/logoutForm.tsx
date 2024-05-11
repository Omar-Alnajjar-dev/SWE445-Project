import { logout } from "@/actions"

const LogoutForm = () => {
  return (
    <form action={logout}>
      <button className="bg-red-600 rounded-lg p-2 m-2">Logout</button>
    </form>
  )
}

export default LogoutForm