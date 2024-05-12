"use client";
import { getPatients, getUserswithRoles, login, OTP } from "@/actions";
import { useFormState } from "react-dom";
import { use, useEffect, useState } from "react";


const AccessControlTable = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patients = await getUserswithRoles();
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table className="text-center">
        <thead>
          <tr className="border border-transparent border-b-gray-500">
            <th className="pr-5">User ID</th>
            <th className="pr-5">User Name</th>
            <th className="pr-5">User Email</th>
            <th className="pr-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <>
              <tr key={index}>
                <td className="pr-5">{patient.PersonID}</td>
                <td className="pr-5">{patient.FullName}</td>
                <td className="pr-5">{patient.Email}</td>
                <td className="pr-5"><select value={patient.RoleName} name="access" id="access" className="border border-gray-500 rounded-2xl hover:bg-slate-600 hover:text-white">
                  <option value="Admin">Admin</option>
                  <option value="Patient">Patient</option>
                </select></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default AccessControlTable;
