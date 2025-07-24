import React from 'react'
import { useUserContext } from '../Context/UserContext'



export default function EmployerDashbord() {
  const {user} = useUserContext()
  return (
   <div>
    <h1>Hi Employer ........</h1>
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    name
                </th>
                <th scope="col" className="px-6 py-3">
                    email
                </th>
                <th scope="col" className="px-6 py-3">
                    updated_at
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.id}
                </th>
                <td className="px-6 py-4">
                    {user.name}
                </td>
                <td className="px-6 py-4">
                {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.created_at}
                </td>
            </tr>
         
            
        </tbody>
    </table>
</div>
   </div>
    
  
  )
}
