"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { user } from "@/data/user-data";
import { List, Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";

export default function UserPage() {
  const [search, setSearch] = useState("");

  const filterUser = useMemo(() => {
    return user.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);
  return (
    <div className="">
      <div className="px-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Users className="bg-blue-500 w-12 h-12 p-2 rounded" />
            <div>
              <p className="text-blue-500 font-bold ">Management</p>
              <h3 className="font-bold text-2xl">Users</h3>
            </div>
          </div>
          <div>
            <Button variant={"ghost"} className="border-gray-500">
              <Plus /> Add User
            </Button>
          </div>
        </div>
        <div className="border border-gray-500 rounded py-8 px-6 mt-10">
          <div className="flex justify-between">
            <h4 className="flex gap-3 text-xl font-bold">
              <List className="bg-blue-500 w-8 h-8 p-2 rounded" /> Users List
            </h4>
            <Input
              className="max-w-64"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="hidden md:block mt-10 overflow-x-auto rounded-xl border shadow">
            <table className="min-w-[700px] w-full">
              <thead className="">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filterUser.map((item) => (
                  <tr key={item.id} className="border-t transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                          {item.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <span className="font-medium whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-700">
                        {item.role}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {item.email}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant={"ghost"} className="rounded cursor-pointer">
                          Edit
                        </Button>

                        <Button variant={"destructive"} className="rounded cursor-pointer">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 md:hidden mt-10">
            {filterUser.map((item) => (
              <div key={item.id} className="rounded-xl border p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white">
                    {item.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm">{item.email}</p>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded bg-blue-500 py-2 text-white">
                    Edit
                  </button>

                  <button className="flex-1 rounded bg-red-500 py-2 text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
