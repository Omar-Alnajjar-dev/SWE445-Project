"use client";
import { getUserswithRoles, getRoles, updateRoles } from "@/actions";
import { useFormState } from "react-dom";
import { use, useEffect, useState } from "react";


const AccessControlTable = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patients = await getUserswithRoles();
      const roles = await getRoles();
      setRoles(roles);
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRoleChange = (index: number, value: string) => {
    setPatients((prevState) => {
      const newPatients = [...prevState];
      newPatients[index].RoleName = value;
      return newPatients;
    });
  };

  useEffect(() => {
    updateRoles(patients, roles);
  }, [patients]);

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
                <td className="pr-5"><select value={patient.RoleName} name="access"
                  id="access"
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  className="border border-gray-500 rounded-2xl hover:bg-slate-600 hover:text-white">
                  {roles.map((role, index) => (
                    <option key={index} value={role.RoleName}>{role.RoleName}</option>
                  ))}
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
