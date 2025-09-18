"use client";
import axios from "axios";
import SuggentionCard from "./SuggetionCard";
import { useEffect, useState } from "react";

type userData = {
  id: string;
  name: string;
  image: string;
  bio: string;
};

const UsersSuggestions = () => {
  const [users, setUsers] = useState<userData[]>();

  const getUsers = async () => {
    const res = await axios.get(
      `/api/getAllUsers`
    );
    console.log(res.data.users);
    setUsers(res?.data?.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="border-l  h-screen">
      
      {users?.map((user: userData) => (
        <SuggentionCard
          key={user.name}
          id={user.id}
          name={user.name}
          image={user.image}
          bio={user.bio}
        />
      ))}
    </div>
  );
};

export default UsersSuggestions;
