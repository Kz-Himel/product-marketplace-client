import Link from "next/link";
import { FiGrid, FiTag, FiBox, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: FiGrid },
  { href: "/dashboard/products", label: "Products", icon: FiBox },
  { href: "/dashboard/categories", label: "Categories", icon: FiTag },
  { href: "/dashboard/orders", label: "Orders", icon: FiShoppingCart },
  { href: "/dashboard/reviews", label: "Reviews", icon: FiStar },
  { href: "/dashboard/users", label: "Users", icon: FiUsers },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-24 md:self-start">
        <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-surface p-2 md:flex-col md:overflow-visible">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent/10 hover:text-accent"
            >
              <Icon /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}