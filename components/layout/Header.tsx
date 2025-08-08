"use client"
import { useState } from "react";
import { HeaderProps } from "@/types/components.types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, Search, User, Settings, LogOut, HelpCircle, Bell, X } from "lucide-react";
import { LayoutGrid } from 'lucide-react';
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
//import { useIsMobile } from "@/hooks/useIsMobile";
import MobileSidebar from "./sidebars/MobileSidebar";
import Logo from "./Logo";
import { defaultMenuItems } from "@/lib/constants/defaultMenuItems";
import { useSidebar } from "@/hooks/useSidebar";
import { useIsMobile } from "@/hooks/useMobile";
import QuickActionsButton from "./QuickActionsButton";

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { toggleCollapsed } = useSidebar();
  const isMobile = useIsMobile(768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mockAvatarUrl = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face";
  
  const user = {
    name: "John Doe",
    email: "john.doe@fintrack.com",
    initials: "JD"
  };

  const handleMenuAction = (action: string) => {
    setMobileMenuOpen(false); // Close mobile menu
    
    switch (action) {
      case 'profile':
        console.log('Navigate to profile');
        break;
      case 'settings':
        console.log('Navigate to settings');
        break;
      case 'help':
        console.log('Open help center');
        break;
      case 'logout':
        console.log('Logout user');
        break;
      default:
        break;
    }
  };

  // Mobile User Menu Items
  const UserMenuItems = () => (
    <>
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockAvatarUrl} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <button
          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleMenuAction('profile')}
        >
          <User className="mr-3 h-4 w-4" />
          Profile
        </button>
        
        <button
          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleMenuAction('settings')}
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </button>
        
        <button
          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleMenuAction('help')}
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          Help & Support
        </button>
        
        <div className="border-t border-gray-200 mt-2 pt-2">
          <button
            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            onClick={() => handleMenuAction('logout')}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60  border-gray-200",
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileSidebar menuItems={defaultMenuItems}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Menu className="h-5 w-5" />
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
          </Button>

          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 pl-10 pr-4"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          <QuickActionsButton />

          {isMobile ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={mockAvatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary text-white text-sm font-medium">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>User Menu</SheetTitle>
                </SheetHeader>
                <UserMenuItems />
              </SheetContent>
            </Sheet>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 cursor-pointer ring-offset-2 hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={mockAvatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary text-white text-sm font-medium">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-gray-600">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => handleMenuAction('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleMenuAction('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleMenuAction('help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={() => handleMenuAction('logout')}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export   default Header