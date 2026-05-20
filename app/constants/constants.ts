export const MenuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Fleet Solution",
    dropdown: [
      {
        label: "add new vehicle",
        href: "/vehicle/create-vehicle",
      },
      {
        label: "Get All Vehicles",
        href: "/vehicle/get-vehicle",
      },
    ],
  },
  {
    label: "Driver Management",
    dropdown: [
      {
        label: "add new driver",
        href: "/driver/create-driver",
      },
       {
        label: "drivers List",
        href: "/driver/get-all-driver",
      },
    ],
  },
  {
    label: "Our Blogs",
    href: "/blogs",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
