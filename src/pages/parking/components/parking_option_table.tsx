import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ParkingOption } from '@/lib/types';
import ParkingOptionRow from './parking_option_row';

export default function ParkingOptionsTable({
  items,
  onDelete,
  onUpdate
}: {
  items: ParkingOption[];
  onDelete: (id: number) => void;
  onUpdate: (o: ParkingOption) => void;
}) {
  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-40">Zone</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-24 text-right">Rate</TableHead>
              <TableHead className="w-24">Avail.</TableHead>
              <TableHead className="w-12 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((o) => (
              <ParkingOptionRow
                key={o.id}
                option={o}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
