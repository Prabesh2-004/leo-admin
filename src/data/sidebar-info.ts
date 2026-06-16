import {
  ChartColumnDecreasing,
  LayoutDashboard,
  User,
  House,
  Users,
  CalendarFold,
  BookUser,
  Images,
  Info,
  CirclePlus,
  List,
  UserPen,
  Contact,
  HandCoins,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Stats",
      url: "#",
      icon: ChartColumnDecreasing,
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "User",
          url: "/user",
          icon: User,
        },
      ],
    },
    {
      title: "Content Modification",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/home",
          icon: House,
        },
        {
          title: "Team",
          url: "/team",
          icon: Users,
        },
        {
          title: "Programs",
          url: "/programs",
          icon: CalendarFold,
        },
        {
          title: "Contact",
          url: "/contact",
          icon: BookUser,
        },
        {
          title: "Gallery",
          url: "/gallery",
          icon: Images,
        },
        {
          title: "About",
          url: "/about",
          icon: Info,
        },
      ],
    },
    {
      title: "Infos",
      url: "#",
      items: [
        {
          title: "Add Info",
          url: "/add-info",
          icon: CirclePlus,
        },
        {
          title: "Old Infos",
          url: "old-infos",
          icon: List,
        },
      ],
    },
    {
      title: "User Request",
      url: "#",
      items: [
        {
          title: "Member Request",
          url: "/member-request",
          icon: UserPen
        },
        {
          title: "Contact Info",
          url: "/contact-info",
          icon: Contact,
        },
      ],
    },
    {
      title: "Contribution",
      url: "#",
      items: [
        {
          title: "Contribution Info",
          url: "#",
          icon: HandCoins,
        },
      ],
    },
  ],
};