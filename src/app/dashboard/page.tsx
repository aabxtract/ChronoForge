
import { ClockCard } from "@/app/components/clock-card";
import { mockClocks } from "@/lib/mock-data";
import { FileClock, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TxnHistory } from "./txn-history";

export default function DashboardPage() {
  // In a real app, you would fetch clocks owned by the connected user.
  // Here, we'll just show a subset of mock clocks.
  const userClocks = mockClocks.slice(0, 4);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileClock className="w-8 h-8 text-primary" />
          My Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          A dashboard of all your forged timepieces and transaction history.
        </p>
      </div>

      <Tabs defaultValue="clocks">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="clocks">
            <FileClock className="w-4 h-4 mr-2" />
            My Clocks
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            Transaction History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="clocks">
           {userClocks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {userClocks.map((clock) => (
                <ClockCard key={clock.id} clock={clock} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No Clocks Yet</h3>
                <p className="text-muted-foreground mt-2">Go to the mint page to forge your first clock.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history">
          <TxnHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
