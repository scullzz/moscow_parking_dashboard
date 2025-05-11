import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tariff } from '@/lib/types';
import TariffRow from './tarrif_row';

export default function TariffsTable({
  tariffs,
  onDelete,
  onUpdate
}: {
  tariffs: Tariff[];
  onDelete: (id: number) => void;
  onUpdate: (t: Tariff) => void;
}) {
  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-40">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24 text-right">Days</TableHead>
              <TableHead className="w-24 text-right">Price</TableHead>
              <TableHead className="w-24 text-right">Filters</TableHead>
              <TableHead className="w-12 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tariffs.map((t) => (
              <TariffRow
                key={t.id}
                tariff={t}
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
