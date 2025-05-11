import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Subscription } from '@/lib/types';
import { format } from 'date-fns';

export default function SubscriptionsTable({
  items
}: {
  items: Subscription[];
}) {
  const fmt = (iso: string) => format(new Date(iso), 'yyyy-MM-dd HH:mm');

  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-32">User ID</TableHead>
              <TableHead className="w-32">Tariff ID</TableHead>
              <TableHead className="w-56">End date</TableHead>
              <TableHead className="w-56">Created</TableHead>
              <TableHead className="w-56">Updated</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id} className="hover:bg-muted/50">
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.user_id}</TableCell>
                <TableCell>{s.tariff_id}</TableCell>
                <TableCell>{fmt(s.subscription_end)}</TableCell>
                <TableCell>{fmt(s.create_dttm)}</TableCell>
                <TableCell>{fmt(s.update_dttm)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
