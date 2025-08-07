'use client';

import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import PageHeader from '../dashboard/PageHeader';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import ProfileSettings from './ProfileSettings';

const SettingsPage: React.FC = () => {
 
  return (
    <div className="space-y-8">
   
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and configurations"
        actions={
          <Button variant="outline">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <ProfileSettings/>
          <NotificationSettings/>
          <SecuritySettings/>
      
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;