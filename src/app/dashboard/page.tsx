import { changePremium, changeUsername, getSession } from "@/actions";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/")
    }

    return (
        <div className="login border p-14 bg-white rounded-lg p-b-4">
            <h1 className="text-3xl">Dashboard</h1>
            <p>
                Welcome, <b>{session.username}</b>. <br />What would you like to do today?
            </p>
            <span>You are <b>{session.isAdmin ? "An Admin" : "a Patient"}</b> user</span>

            {session.isAdmin && <div className="flex flex-col justify-center items-center m-4">
                <button className="text-blue-600 border border-blue-600 rounded-lg p-3 m-2 hover:text-white hover:bg-blue-600 active:scale-95">Update Patients Records</button>
                <button className="text-blue-600 border border-blue-600 rounded-lg p-3 m-2 hover:text-white hover:bg-blue-600 active:scale-95">Manage Access Control</button>
            </div>}
        </div>
    );
};

export default DashboardPage;