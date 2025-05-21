"use client";
import axios from "axios";
import SuggentionCard from "./SuggetionCard";
import { useEffect, useState } from "react";

type userData = {
  name: string;
  image: string;
  bio: string;
};

const UsersSuggestions = () => {
  const [users, setUsers] = useState<userData[]>();

  const getUsers = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAllUsers`
    );
    console.log(res.data.users);
    setUsers(res?.data?.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="border-l h-screen">
      
      {users?.map((user: userData) => (
        <SuggentionCard
          key={user.name}
          name={user.name}
          image={user.image}
          bio={user.bio}
        />
      ))}
    </div>
  );
};

export default UsersSuggestions;
