"use client";
import { getPatients, login, OTP } from "@/actions";
import { useFormState } from "react-dom";
import { use, useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";


const PatientsTable = () => {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patients = await getPatients();
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: number) => {
    router.push(`/adminPages/updatePatients/patient?id=${patients[id].PersonID}`);
  }




  return (
    <div>
      <table className="text-center">
        <thead>
          <tr className="border border-transparent border-b-gray-500">
            <th className="pr-5">Patient ID</th>
            <th className="pr-5">Patient Name</th>
            <th className="pr-5">Patient DOB</th>
            <th className="pr-5">Patient Gender</th>
            <th className="pr-5">Patient Address</th>
            <th className="pr-5">Patient Phone</th>
            <th className="pr-5">Patient Email</th>
            <th className="pr-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td className="pr-5">{patient.PersonID}</td>
              <td className="pr-5">{patient.FirstName + " " + patient.LastName}</td>
              <td className="pr-5">{patient.DateOfBirth}</td>
              <td className="pr-5">{patient.Gender}</td>
              <td className="pr-5">{patient.Address}</td>
              <td className="pr-5">{patient.PhoneNumber}</td>
              <td className="pr-5">{patient.Email}</td>
              <td className="pr-5"><button onClick={() => handleEdit(index)} className="bg-white hover:bg-gray-300 border font-bold py-2 px-4 rounded-2xl"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
              </svg></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default PatientsTable;
