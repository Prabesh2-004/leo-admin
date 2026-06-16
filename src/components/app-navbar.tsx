"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const User = "Tika Datta Gautam";
  const UserAvatar = User.split(" ").map((item, index) => (
    <div key={index}>{item.charAt(0)}</div>
  ));
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <div className="">
      <nav
        className="h-14 fixed flex items-center px-4 z-50 bg-background transition-all duration-200"
        style={{
          width: isCollapsed ? "100%" : "calc(100% - var(--sidebar-width))",
          left: isCollapsed ? "0" : "var(--sidebar-width)",
        }}
      >
        <SidebarTrigger />
        <div className="flex justify-end items-center flex-1 gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button variant={"ghost"}>
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 border-2 border-black">
                <span className="flex border p-2 rounded-lg bg-black text-white">
                  {UserAvatar}
                </span>{" "}
                {User}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
