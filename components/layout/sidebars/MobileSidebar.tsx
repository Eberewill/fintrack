'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebarProps } from "@/types/components.types";
import Logo from "../Logo";
import NavigationItems from "../NavigationItems";

const MobileSidebar: React.FC<MobileSidebarProps> = ({ menuItems, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle navigation item click - close sidebar
  const handleNavigationClick = (item: any) => {
    // Close the sheet
    setIsOpen(false);
    
    // Optional: Add any additional logic here
    console.log(`Navigating to ${item.label}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b border-gray-200 p-4">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 px-4 py-4">
          <NavigationItems 
            items={menuItems} 
            onItemClick={handleNavigationClick}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;