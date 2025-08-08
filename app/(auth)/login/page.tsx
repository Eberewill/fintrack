import { LoginForm } from "@/components/auth/login-form";
import { Info } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
        
        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Demo Application
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is a demonstration application. You can use any email address to login. 
                No personal information is stored or processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}