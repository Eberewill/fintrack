 "use client"
import { HeaderProps } from "@/lib/types/components.types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Grid3X3, Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileSidebar from "./sidebars/MobileSidebar";
import Logo from "./Logo";
import { defaultMenuItems } from "@/lib/constants/defaultMenuItems";
import { useSidebar } from "@/hooks/useSidebar";

const Header: React.FC<HeaderProps> = ({ className }) => {

    const { toggleCollapsed } = useSidebar();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60",
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 lg:px-6 ">

        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileSidebar menuItems={defaultMenuItems}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </MobileSidebar>
          </div>

            <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hidden lg:flex"
            onClick={toggleCollapsed}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

             <Logo />
  
        </div>

        <div className="flex items-center gap-3">
         
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className=" h-9 w-64 pl-10 pr-4"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Grid button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="sr-only">Grid view</span>
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer ring-offset-2 hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary text-white text-sm font-medium">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header