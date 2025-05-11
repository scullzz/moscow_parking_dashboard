import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Vehicle } from '@/lib/types';
import { format } from 'date-fns';

export default function VehiclesTable({ items }: { items: Vehicle[] }) {
  const fmt = (iso: string) => format(new Date(iso), 'yyyy-MM-dd HH:mm');

  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-32">User ID</TableHead>
              <TableHead className="w-40">Plate</TableHead>
              <TableHead className="w-32">Type</TableHead>
              <TableHead className="w-56">Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id} className="hover:bg-muted/50">
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.user_id}</TableCell>
                <TableCell>{v.license_plate}</TableCell>
                <TableCell>{v.vehicle_type}</TableCell>
                <TableCell>{fmt(v.create_dttm)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
