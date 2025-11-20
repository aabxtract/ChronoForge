import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockTransactions } from "@/lib/mock-data";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function TxnHistory() {
  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Transaction Hash</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Clock ID</TableHead>
          <TableHead>Details</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTransactions.map((txn) => (
          <TableRow key={txn.id}>
            <TableCell className="font-mono text-muted-foreground">{`${txn.id.slice(0, 6)}...${txn.id.slice(-4)}`}</TableCell>
            <TableCell>
              <Badge variant={txn.type === 'Mint' ? 'default' : 'secondary'} className="capitalize">{txn.type}</Badge>
            </TableCell>
            <TableCell>
              <Link href={`/clocks/${txn.clockId}`} className="hover:underline">
                #{txn.clockId}
              </Link>
            </TableCell>
            <TableCell>{txn.details}</TableCell>
            <TableCell className="text-right text-muted-foreground">{format(txn.timestamp, "PPp")}</TableCell>
            <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
