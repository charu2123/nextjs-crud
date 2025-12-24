"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users List</h1>

      {/* ADD USER – list ke bahar */}
      <Link href="/users/add">
        <button>Add User</button>
      </Link>

      {users.map(user => (
        <div key={user.id}>
          <p>
            <strong>{user.name}</strong> - {user.email}
          </p>

          <Link href={`/users/${user.id}`}>
            <button>View</button>
          </Link>

          <button
            onClick={async () => {
              // Optimistic UI update
              setUsers(prev => prev.filter(u => u.id !== user.id));

              await fetch(
                `https://jsonplaceholder.typicode.com/users/${user.id}`,
                { method: "DELETE" }
              );
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
