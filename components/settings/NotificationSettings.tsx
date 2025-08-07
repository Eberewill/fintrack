import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
    marketing: true,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose how you want to be notified about account activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-900">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                handleNotificationChange("email", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between  ">
            <div>
              <Label className="text-gray-900">Push Notifications</Label>
              <p className="text-sm text-gray-600">
                Receive push notifications in browser
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                handleNotificationChange("push", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between ">
            <div>
              <Label className="text-gray-900">SMS Notifications</Label>
              <p className="text-sm text-gray-600">
                Receive important alerts via SMS
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                handleNotificationChange("sms", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between ">
            <div>
              <Label className="text-gray-900">Marketing Communications</Label>
              <p className="text-sm text-gray-600">
                Receive product updates and offers
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) =>
                handleNotificationChange("marketing", checked)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
