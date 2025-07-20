import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // Track which action is loading

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('User not authenticated');
        }
        
        const user = JSON.parse(userData);
        const token = user.token;
        
        const response = await axios.get(
          'https://finalclear-backend-5.onrender.com/api/credentials/admin/credentials',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCredentials(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch credentials');
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  if (loading) {
    return <div className="p-4">Loading credentials...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-[30px] lg:px-[50px] mt-[50px] xl:px-[137px]">
      <h1 className="text-2xl font-bold mb-6">Student Credentials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matric Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {credentials.map((student) => (
              <tr key={student._id || student.matricNumber}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {student.matricNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {student.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleStatusUpdate(student._id, 'Approved')}
                    className={`text-green-600 hover:text-green-900 mr-4 ${
                      actionLoading === student._id+'-approve' ? 'opacity-50' : ''
                    }`}
                    disabled={student.status === 'Approved' || actionLoading}
                  >
                    {actionLoading === student._id+'-approve' ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(student._id, 'Denied')}
                    className={`text-red-600 hover:text-red-900 ${
                      actionLoading === student._id+'-deny' ? 'opacity-50' : ''
                    }`}
                    disabled={student.status === 'Denied' || actionLoading}
                  >
                    {actionLoading === student._id+'-deny' ? 'Processing...' : 'Deny'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function handleStatusUpdate(id, newStatus) {
    try {
      setActionLoading(id + '-' + (newStatus === 'Approved' ? 'approve' : 'deny'));
      
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userData);
      const token = user.token;
      
      await axios.patch(
        `https://finalclear-backend-5.onrender.com/api/credentials/admin/credentials/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update local state
      setCredentials(credentials.map(cred => 
        cred._id === id ? {...cred, status: newStatus} : cred
      ));
    } catch (err) {
      setError(`Failed to update status: ${err.response?.data?.message || err.message}`);
    } finally {
      setActionLoading(null);
    }
  }
};

export default AdminDashboard;