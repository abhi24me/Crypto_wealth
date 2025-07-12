import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { DollarSign, Users } from "lucide-react";
import { ReferralActions } from "@/components/dashboard/referral-actions";

const invitedUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Accepted",
    date: "2024-05-15",
  },
  {
    name: "Bob Williams",
    email: "bob@example.com",
    status: "Pending",
    date: "2024-05-18",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "Accepted",
    date: "2024-05-20",
  },
];

const referralHierarchy = [
    {
      level: 1,
      name: 'You',
      children: [
        {
          level: 2,
          name: 'Alice Johnson',
          children: [
            { level: 3, name: 'David Smith', children: [] },
          ],
        },
        {
          level: 2,
          name: 'Charlie Brown',
          children: [],
        },
      ],
    },
  ];

const renderHierarchy = (nodes: any[]) => {
    return (
      <ul className="space-y-2">
        {nodes.map((node, index) => (
          <li key={index}>
            <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{node.name} (Level {node.level})</span>
            </div>
            {node.children && node.children.length > 0 && (
              <div className="pl-6 border-l-2 border-primary/20 ml-2.5 mt-2">
                {renderHierarchy(node.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
};
  
export default function ReferralPage() {
  const referralLink = "https://cryptowealth.com/signup?ref=johndoe123";

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Referral Program</CardTitle>
            <CardDescription>
              Earn rewards by inviting new users to our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">How It Works</h3>
            <p className="text-muted-foreground">
              Our referral program has a 3-level marketing structure. You earn commissions not only from your direct referrals but also from the users they refer, down to three levels.
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li><span className="font-medium text-foreground">Level 1:</span> Earn 10% from your direct referrals.</li>
                <li><span className="font-medium text-foreground">Level 2:</span> Earn 5% from the referrals of your Level 1 users.</li>
                <li><span className="font-medium text-foreground">Level 3:</span> Earn 2% from the referrals of your Level 2 users.</li>
            </ul>
          </CardContent>
        </Card>

        <ReferralActions referralLink={referralLink} />

        <Card>
            <CardHeader>
                <CardTitle>Invited Users</CardTitle>
                <CardDescription>Track the status of your invitations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="text-right">Invite Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invitedUsers.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground md:hidden">{user.email}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant={user.status === 'Accepted' ? 'default' : 'secondary'}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{user.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-7">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Referral Hierarchy</CardTitle>
                    <CardDescription>Your multi-level referral network.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderHierarchy(referralHierarchy)}
                </CardContent>
            </Card>
            <Card className="lg:col-span-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Referral Earnings</CardTitle>
                            <CardDescription>Your earnings over the last 6 months.</CardDescription>
                        </div>
                        <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="pl-2">
                    <PortfolioChart />
                </CardContent>
            </Card>
        </div>

      </div>
    </main>
  );
}
