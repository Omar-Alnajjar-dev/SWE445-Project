import { getSession } from "@/actions";
import PatientsTable from "@/components/PatientsTable";
import Link from "next/link";
import { redirect } from "next/navigation";

const UpdatePatients = async () => {
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
    <>
      <div className="border p-14 bg-white rounded-3xl p-b-4">
        <h1 className="text-3xl mb-5">Patients Records</h1>
        <div className="">
          <PatientsTable />
        </div>
      </div>
    </>



  );
};

export default UpdatePatients;
