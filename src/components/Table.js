import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
      setUsers(response.data);
    })
  }, [])

  const getUserRows = () => {
    return users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.company.name}</td>
          <td>{user.name}</td>
          <td>{user.address.city}</td>
        </tr>
      )
    })
  }

  return <>
    <div className="heading">
      <h2>Users List</h2>
    </div>
    {users &&
      <table className="users-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {getUserRows()}
        </tbody>
      </table>
    }
  </>;
}