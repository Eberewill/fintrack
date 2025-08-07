import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@fintrack.com",
    timezone: "UTC-5",
    currency: "USD",
  });

  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Profile Information</CardTitle>
        <CardDescription>
          Update your personal details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-gray-900">
              Full Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-900">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="timezone" className="text-gray-900">
              Timezone
            </Label>
            <Select
              value={profile.timezone}
              onValueChange={(value) => handleProfileChange("timezone", value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-gray-900">
                
                <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full">
            <Label htmlFor="currency" className="text-gray-900">
              Default Currency
            </Label>
            <Select
             
              value={profile.currency}
              onValueChange={(value) => handleProfileChange("currency", value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-gray-900">
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
