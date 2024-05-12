import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const ManageAccessControl = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isAdmin) {
    return (
      <div className="notAdmin">
        <h1>Only Admin users can see the content!</h1>
        <Link href="/dashboard">
          Go Back to the Dashboard page
        </Link>
      </div>
    );
  }

  return (
    <div className="premium">
      <h1>Welcome to the PremiumPage</h1>
      <ul>
        <li>Apple</li>
        <li>Orange</li>
        <li>Peach</li>
      </ul>
    </div>
  );
};

export default ManageAccessControl;
