import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Mail, 
  List, 
  ChevronLeft,
  ChevronRight,
  Music,
  PlayCircle,
  User,
  Users,
  Disc,
  ShieldCheck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../Context/UserContext";
import { IMPRIMENT_AFFICHER_COLIER_ROUTE, IMPRIMENT_DACHBORD_ROUTE } from "../router";

export function SaidebarImpriment({ className }) {
  const { user } = useUserContext();
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const location = useLocation();
  
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={cn(
        "relative h-full border-r bg-gradient-to-b from-background via-background to-background/95",
        "shadow-sm transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className={cn(
            "flex items-center gap-3 transition-all duration-300",
            collapsed ? "justify-center w-full" : "justify-start"
          )}>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            
            {!collapsed && (
              <div className="flex flex-col items-start overflow-hidden">
                <h1 className="text-sm font-bold tracking-tight text-foreground">
                  Admin Panel
                </h1>
                <span className="text-xs text-muted-foreground">
                  Management System
                </span>
              </div>
            )}
          </div>
          
          <Button 
            variant="secondary"
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {collapsed ? 
              <ChevronRight className="h-3 w-3" /> : 
              <ChevronLeft className="h-3 w-3" />
            }
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-6 px-3">
            <div className="space-y-2">
              <div className={cn(
                "flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                collapsed ? "justify-center px-0" : "px-3"
              )}>
                {collapsed ? 
                  <LayoutDashboard className="h-4 w-4" /> : 
                  "Administration"
                }
              </div>
              
              <nav className="space-y-1 px-1">
                <NavItem
                  to={IMPRIMENT_DACHBORD_ROUTE}
                  icon={<LayoutDashboard className="h-5 w-5" />}
                  label="Dashboard"
                  active={isActive(IMPRIMENT_DACHBORD_ROUTE)}
                  collapsed={collapsed}
                />
                <NavItem 
                  to={IMPRIMENT_AFFICHER_COLIER_ROUTE}
                  icon={<Mail className="h-5 w-5" />}
                  label="Courrier Électronique"
                  active={isActive(IMPRIMENT_AFFICHER_COLIER_ROUTE)}
                  collapsed={collapsed}
                />
                <NavItem 
                  to="#"
                  icon={<List className="h-5 w-5" />}
                  label="Informations"
                  active={isActive("#")}
                  collapsed={collapsed}
                />
              </nav>
            </div>

            <div className="space-y-2">
              <div className={cn(
                "flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                collapsed ? "justify-center px-0" : "px-3"
              )}>
                {collapsed ? 
                  <Music className="h-4 w-4" /> : 
                  "Library"
                }
              </div>
              
              <nav className="space-y-1 px-1">
          
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
        </div>

        <div className="border-t bg-muted/30 p-3">
          <div className={cn(
            "flex items-center rounded-lg p-2 transition-all duration-300 hover:bg-muted",
            collapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
              <User className="h-5 w-5 text-primary" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
            </div>
            
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">{user?.name || 'Admin User'}</p>
                  <div className="ml-1.5 inline-flex h-5 items-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
                    Pro
                  </div>
                </div>
                <p className="truncate text-xs text-muted-foreground">{user?.email || 'admin@example.com'}</p>
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
    <Link 
      to={to}
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <div className={cn(
        "flex h-5 w-5 items-center justify-center",
        "transition-all duration-200 ease-in-out",
        collapsed ? "" : "mr-3",
        active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {icon}
      </div>
      
      {!collapsed && (
        <span className="truncate">{label}</span>
      )}
      
      {active && (
        <div className={cn(
          "absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary",
          "animate-pulse opacity-70"
        )} />
      )}
    </Link>
  );
}