import { changePremium, changeUsername, getSession } from "@/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/")
    }

    return (
        <div className="profile">
            <h1>Dashboard</h1>
            <p>
                Welcome, <b>{session.username}</b>
            </p>
            <span>You are <b>{session.isAdmin ? "An Admin" : "a Patient"}</b> user</span>

            <form action={changeUsername}>
                <input type="text" name="username" required placeholder={session.username} />
                <button>Update</button>
            </form>
        </div>
    );
};

export default ProfilePage;