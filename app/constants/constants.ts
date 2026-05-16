export const MenuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Our Vehicles",
    dropdown: [
      {
        label: "add new vehicle",
        href: "/vehicle/create-vehicle",
      },
      {
        label: "Get All Vehicles",
        href: "/vehicle/get-vehicle",
      },
      {
        label: "update vehicle",
        href: "/vehicles/update-vehicle",
      },
    ],
  },
  {
    label: "Our Driver",
    dropdown: [
      {
        label: "add new driver",
        href: "/drivers/create",
      },
      {
        label: "update driver",
        href: "/drivers/update",
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
