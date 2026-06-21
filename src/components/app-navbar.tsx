"use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Bell, Moon, Sun } from "lucide-react";
// import { Button } from "./ui/button";
// import { SidebarTrigger, useSidebar } from "./ui/sidebar";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";

// export default function Navbar({ userInfo }) {
//   const supabase = createClient();
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [userData, setUserData] = useState("Tika Datta Gautam");
//   const UserAvatar = userData.split(" ").map((item, index) => (
//     <div key={index}>{item.charAt(0)}</div>
//   ));
//   const { state } = useSidebar();
//   const isCollapsed = state === "collapsed";

//   const fetchUser = async () => {
//     const { data: { user } } = await supabase.from("profile").select("*").eq("user_id", userInfo.id).single()
//     console.log(user)
//   }

//   console.log(fetchUser())

//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   return (
//     <div className="">
//       <nav
//         className="h-14 fixed flex items-center px-4 z-50 bg-background transition-all duration-200"
//         style={{
//           width: isCollapsed ? "100%" : "calc(100% - var(--sidebar-width))",
//           left: isCollapsed ? "0" : "var(--sidebar-width)",
//         }}
//       >
//         <SidebarTrigger />
//         <div className="flex justify-end items-center flex-1 gap-2">
//           {mounted && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="border-gray-500"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? <Sun /> : <Moon />}
//             </Button>
//           )}
//           <Button variant={"ghost"} className="border-gray-500">
//             <Bell />
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="h-12 border-2 ">
//                 <span className="flex border p-2 rounded-lg bg-gray-800 text-white">
//                   {UserAvatar}
//                 </span>{" "}
//                 {userData}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuGroup>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Logout</DropdownMenuItem>
//               </DropdownMenuGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </nav>
//     </div>
//   );
// }

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
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar({ userInfo }: { userInfo: User }) {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState("");
  const UserAvatar = userData
    .split(" ")
    .map((item, index) => <div key={index}>{item.charAt(0)}</div>);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!userInfo?.id) return;
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userInfo.id)
        .single();
      if (data) {
        setUserData((prev) => data.full_name ?? data.name ?? prev);
      }
      if (error) console.error(error);
    };
    fetchUser();
  }, [userInfo?.id, supabase]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error?.message);
    router.push("/login");
    router.refresh();
  };

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
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="border-gray-500"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          )}
          <Button variant={"ghost"} className="border-gray-500">
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 border-2 ">
                <span className="flex border p-2 rounded-lg bg-gray-800 text-white">
                  {UserAvatar}
                </span>{" "}
                {userData}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
