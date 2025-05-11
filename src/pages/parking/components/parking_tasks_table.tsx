import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ParkingTask } from '@/lib/types';
import { format } from 'date-fns';

export default function ParkingTasksTable({ items }: { items: ParkingTask[] }) {
  const fmt = (iso: string) => format(new Date(iso), 'yyyy-MM-dd HH:mm');

  return (
    <Card className="rounded-2xl border-muted shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-24">User</TableHead>
              <TableHead className="w-32">Action</TableHead>
              <TableHead>Parameters</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-48">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((t) => (
              <TableRow key={t.id} className="hover:bg-muted/50">
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.user_id}</TableCell>
                <TableCell>{t.action_type}</TableCell>
                <TableCell>{t.parameters}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{fmt(t.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
