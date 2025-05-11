import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ParkingSession } from '@/lib/types';
import { format } from 'date-fns';

export default function ParkingSessionsTable({
  items
}: {
  items: ParkingSession[];
}) {
  const fmt = (iso: string) => format(new Date(iso), 'yyyy-MM-dd HH:mm');

  return (
    <Card className="rounded-2xl border-muted shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-24">User</TableHead>
              <TableHead className="w-24">Vehicle</TableHead>
              <TableHead className="w-24">Option</TableHead>
              <TableHead className="w-48">Start</TableHead>
              <TableHead className="w-48">End</TableHead>
              <TableHead className="w-24">Type</TableHead>
              <TableHead className="w-24">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id} className="hover:bg-muted/50">
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.user_id}</TableCell>
                <TableCell>{s.vehicle_id}</TableCell>
                <TableCell>{s.option_id}</TableCell>
                <TableCell>{fmt(s.start_time)}</TableCell>
                <TableCell>{fmt(s.end_time)}</TableCell>
                <TableCell>{s.type}</TableCell>
                <TableCell>{s.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
