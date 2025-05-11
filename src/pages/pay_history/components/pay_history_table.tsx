import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { PayHistory } from '@/lib/types';
import { format } from 'date-fns';

export default function PayHistoryTable({ items }: { items: PayHistory[] }) {
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
              <TableHead className="w-24 text-right">Price</TableHead>
              <TableHead className="w-28">Success</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead className="w-56">Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/50">
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.user_id}</TableCell>
                <TableCell>{p.tariff_id}</TableCell>
                <TableCell className="text-right">{p.price}</TableCell>
                <TableCell>{p.successfully ? '✔' : '✖'}</TableCell>
                <TableCell>{p.invoice_id}</TableCell>
                <TableCell>{fmt(p.create_dttm)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
