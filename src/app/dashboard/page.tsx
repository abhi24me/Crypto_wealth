import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { ArrowUpRight, RefreshCw, ArrowRight, TrendingUp } from "lucide-react";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio NAV</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PortfolioChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Stake Tokens</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
             <Button size="lg" className="w-full">Stake Tokens</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
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
        </Card>
      </div>
    </main>
  );
}
