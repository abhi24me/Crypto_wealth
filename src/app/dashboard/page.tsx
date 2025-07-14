import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KxIndexChartDynamic } from "@/components/dashboard/kx-index-chart-dynamic";
import { ArrowRight, RefreshCw, TrendingUp } from "lucide-react";

const recentActivity = [
  {
    icon: <RefreshCw className="h-5 w-5 text-muted-foreground" />,
    type: "Token Purchase",
    time: "40 mins ago",
    details: "Profile Updated",
    detailsTime: "40 hr ago",
    detailsIcon: <ArrowRight className="h-5 w-5 text-muted-foreground" />,
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-muted-foreground" />,
    type: "Token Purchase",
    time: "2 hrs ago",
    details: "Conversion",
    detailsTime: "2 hrs ago",
    detailsIcon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
  },
];

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        
        {/* Top Row */}
        <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">LX Token Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
              </CardContent>
              <CardFooter>
                <Button>Buy LX</Button>
              </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Voucher Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">Convert to Voucher</Button>
              </CardFooter>
            </Card>
        </div>
        
        {/* This empty div helps push the next items to the new row on large screens */}
        <div className="hidden lg:block lg:col-span-6"></div>

        {/* Middle Row (Chart) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-12">
            <KxIndexChartDynamic />
        </div>

        {/* Bottom Row */}
        <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Stake Tokens</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                 <Button size="lg" className="w-full">Stake Tokens</Button>
              </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                 <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {recentActivity.map((activity, index) => (
                        <TableRow key={index} className="[&_td]:py-4">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted rounded-full">
                                {activity.icon}
                              </div>
                              <div>
                                <p className="font-medium">{activity.type}</p>
                                <p className="text-muted-foreground text-sm md:hidden">{activity.time}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden md:table-cell">{activity.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                {activity.detailsIcon}
                              <div>
                                <p className="font-medium">{activity.details}</p>
                                <p className="text-right text-muted-foreground text-sm md:hidden">{activity.detailsTime}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground hidden md:table-cell">{activity.detailsTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
        </div>

      </div>
    </main>
  );
}