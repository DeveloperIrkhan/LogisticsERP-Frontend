export const MenuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Fleet",
    dropdown: [
      { label: "Add New Vehicle", href: "/vehicle/create-vehicle" },
      { label: "All Vehicles", href: "/vehicle/get-vehicle" },
      { label: "Assigned Vehicles", href: "/vehicle/assigned" },
      { label: "Unassigned Vehicles", href: "/vehicle/unassigned" },
      { label: "Expiry Tracking", href: "/vehicle/expiry" },
    ],
  },
  {
    label: "Drivers",
    dropdown: [
      { label: "Add New Driver", href: "/driver/create-driver" },
      { label: "All Drivers", href: "/driver/get-all-driver" },
      { label: "Available Drivers", href: "/driver/available" },
      { label: "Assign Driver", href: "/driver/assign-driver" },
      { label: "Expiring Licenses", href: "/driver/expiring-licenses" },
    ],
  },
  {
    label: "Maintenance",
    dropdown: [
      { label: "Add Record", href: "/maintenance/add" },
      { label: "All Records", href: "/maintenance/list" },
      { label: "Upcoming", href: "/maintenance/upcoming" },
    ],
  },
  {
    label: "Fuel",
    dropdown: [
      { label: "Add Fuel Entry", href: "/fuel/add" },
      { label: "Fuel History", href: "/fuel/list" },
    ],
  },
  {
    label: "Duty",
    dropdown: [
      { label: "Add Duty", href: "/duty/add" },
      { label: "All Duties", href: "/duty/list" },
      { label: "Duty Roster", href: "/roster/monthly" },
    ],
  },
  {
    label: "Expense",
    dropdown: [
      { label: "Add Expense", href: "/expense/add" },
      { label: "All Expenses", href: "/expense/list" },
    ],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: "facebook" | "twitter" | "linkedin" | "youtube";
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
];
