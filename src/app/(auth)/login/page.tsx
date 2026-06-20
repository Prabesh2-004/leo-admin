"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setFrom] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supabase = await createClient();
    
    try {
        const { error } = await supabase.auth.signInWithPassword(form)
        if(error) throw error
        router.push("/user");
        router.refresh();
    } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred")
    }
  };
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <form onSubmit={handleSubmit} method="POST" className="p-4 flex flex-col gap-3 shadow shadow-gray-400 rounded-xl">
        <h3 className="text-center font-bold text-xl text-blue-500">Login</h3>
        {error ? <p className="text-red-500">{error}</p> : ""}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="border px-2 py-2"
            name="email"
            value={form.email}
            onChange={(e) =>
              setFrom({ ...form, [e.target.name]: e.target.value })
            }
            placeholder="email"
            autoFocus={true}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="border px-2 py-2"
            name="password"
            placeholder="password"
            onChange={(e) =>
              setFrom({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}
