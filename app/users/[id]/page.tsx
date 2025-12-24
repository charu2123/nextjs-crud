"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    alert("User updated (fake API)");
    router.push("/users");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>Edit User</h1>

      <input
        type="text"
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
      />

      <br /><br />

      <input
        type="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
      />

      <br /><br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
