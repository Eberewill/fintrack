'use client';
import {  Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '../dashboard/PageHeader';
import { useIsMobile } from '@/hooks/useMobile';


const ReportsPage: React.FC = () => {
  const isMobile = useIsMobile();

  const reportTypes = [
    {
      id: 'financial-summary',
      title: 'Financial Summary',
      description: 'Overview of income, expenses, and net worth',
      icon: BarChart3,
      lastGenerated: '2 hours ago'
    },
    {
      id: 'transaction-analysis',
      title: 'Transaction Analysis',
      description: 'Detailed breakdown of spending patterns',
      icon: PieChart,
      lastGenerated: '1 day ago'
    },
    {
      id: 'performance-report',
      title: 'Performance Report',
      description: 'Investment and portfolio performance metrics',
      icon: TrendingUp,
      lastGenerated: '3 days ago'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
    
      <PageHeader
        title="Reports"
        subtitle="Generate and download financial reports"
        actions={
          <Button className="bg-primary hover:bg-primary/90 ">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        }
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Available Reports</h2>
        
        <div className="space-y-4">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            
            // Mobile Layout
            if (isMobile) {
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
       
                    <div className="space-y-4">
                   
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-base leading-tight">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {report.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Last generated: {report.lastGenerated}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none py-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white flex-1 sm:flex-none py-1">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            
            // Desktop Layout
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last generated: {report.lastGenerated}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0 ml-4">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;