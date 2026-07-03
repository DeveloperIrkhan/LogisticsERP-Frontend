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
    label: "Fuel",
    dropdown: [
      { label: "Add Fuel Entry", href: "/fuel/add-fuel" },
      { label: "Fuel History", href: "/fuel/full-record" },
    ],
  },
  {
    label: "Maintenance",
    dropdown: [
      { label: "Add Record", href: "/maintenance/add-maintenance" },
      { label: "All Records", href: "/maintenance/get-maintenances" },
      { label: "Upcoming", href: "/maintenance/upcoming" },
    ],
  },

  {
    label: "Duty",
    dropdown: [
      { label: "Add Duty", href: "/duty/create-duty" },
      { label: "All Duties", href: "/duty/get-duties" },
      { label: "Duty Roster", href: "/roster/monthly" },
    ],
  },
  {
    label: "Expense",
    dropdown: [
      { label: "Add Expense", href: "/expense/create-expense" },
      { label: "All Expenses", href: "/expense/view-all" },
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
