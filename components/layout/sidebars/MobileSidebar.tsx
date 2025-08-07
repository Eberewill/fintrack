
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebarProps } from "@/lib/types/components.types";
import Logo from "../Logo";
import NavigationItems from "../NavigationItems";

const MobileSidebar: React.FC<MobileSidebarProps> = ({ menuItems, children }) => {
  return (
    <Sheet>
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
          <NavigationItems items={menuItems} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar