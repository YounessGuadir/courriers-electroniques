import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Truck,
  Mail,
  List,
  ChevronLeft,
  ChevronRight,
  Music,
  PlayCircle,
  User,
  Users,
  Disc,
  Download

} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { useUserContext } from "../Context/UserContext";
import { Admin_AFFICHER_COLIER_ROUTE, ADMIN_DACHBORD_ROUTE, ADMIN_MANEGE_CLIENT_ROUTE, ADMIN_MANEGE_EMPLOYER_ROUTE, ADMIN_MANEGE_FACTEUR_ROUTE, ADMIN_MANEGE_IMPRIMENT_ROUTE, CLIENT_AFFICHER_COLIER_ROUTE, IMPRIMENT_DACHBORD_ROUTE } from "../router";


export function SidebarAdmin({ className }) {
  const { user } = useUserContext()
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <aside
      className={cn(
        "relative h-full border-r bg-gradient-to-b from-background to-background/95 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-semibold tracking-tight overflow-hidden transition-all duration-200">
              Admin Panel
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full hover:bg-muted"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {/* Administration Section */}
          <div className="mb-6">
            <h2 className={cn(
              "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
              collapsed ? "text-center px-0" : "px-2"
            )}>
              {collapsed ? "Admin" : "Administration"}
            </h2>
            <nav className="space-y-1">
              <NavItem
                to={ADMIN_DACHBORD_ROUTE}
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Dashboard"
                active={isActive(ADMIN_DACHBORD_ROUTE)}
                collapsed={collapsed}
              />
              {/* <NavItem
                to={ADMIN_MANEGE_EMPLOYER_ROUTE}
                icon={<Briefcase className="h-5 w-5" />}
                label="Employer"
                active={isActive(ADMIN_MANEGE_EMPLOYER_ROUTE)}
                collapsed={collapsed}
              /> */}
              <NavItem
                to={ADMIN_MANEGE_CLIENT_ROUTE}
                icon={<Users className="h-5 w-5" />}
                label="Client"
                active={isActive(ADMIN_MANEGE_CLIENT_ROUTE)}
                collapsed={collapsed}
              />
              <NavItem
                to={ADMIN_MANEGE_FACTEUR_ROUTE}
                icon={<Truck className="h-5 w-5" />}
                label="Facteur"
                active={isActive(ADMIN_MANEGE_FACTEUR_ROUTE)}
                collapsed={collapsed}
              />
              <NavItem
                to={ADMIN_MANEGE_IMPRIMENT_ROUTE}
                icon={<Download className="h-5 w-5" />}
                label="imprement"
                active={isActive(ADMIN_MANEGE_IMPRIMENT_ROUTE)}
                collapsed={collapsed}
              />
              <NavItem
                to={Admin_AFFICHER_COLIER_ROUTE}
                icon={<List className="h-5 w-5" />}
                label="Informations"
                active={isActive(CLIENT_AFFICHER_COLIER_ROUTE)}
                collapsed={collapsed}
              />

            </nav>
          </div>

          {/* Library Section */}
          <div>
            <h2 className={cn(
              "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
              collapsed ? "text-center px-0" : "px-2"
            )}>
              {collapsed ? "Lib" : "Library"}
            </h2>
            <nav className="space-y-1">
              <NavItem
                to="/for-you"
                icon={<User className="h-5 w-5" />}
                label="Made for You"
                collapsed={collapsed}
              />
              <NavItem
                to="/artists"
                icon={<Users className="h-5 w-5" />}
                label="Artists"
                collapsed={collapsed}
              />
           
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}



function NavItem({ to, icon, label, active, collapsed }) {
  return (
    <Link to={to}>
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full group transition-all duration-200 ease-in-out",
          collapsed ? "justify-center px-2" : "justify-start gap-3",
          active && "font-medium"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {icon}
        </div>
        {!collapsed && (
          <span className="truncate">{label}</span>
        )}
        {active && !collapsed && (
          <div className="absolute left-0 inset-y-0 w-1 bg-primary rounded-r-full" />
        )}
      </Button>
    </Link>
  );
}
