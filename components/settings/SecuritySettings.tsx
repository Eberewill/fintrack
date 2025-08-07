import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const SecuritySettings = () => {
  return (
       <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Security</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 space-x-2">
                <Button variant="outline" className="w-full sm:w-auto flex-1 justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full sm:w-auto flex-1 justify-start">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full sm:w-auto flex-1 justify-start">
                  Download Account Data
                </Button>
              </div>
            </CardContent>
          </Card>
  )
}

export default SecuritySettings