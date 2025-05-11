import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Setting } from '@/lib/types';
import SettingRow from './settings_row_table';

export default function SettingsTable({
  items,
  onDelete,
  onUpdate
}: {
  items: Setting[];
  onDelete: (id: number) => void;
  onUpdate: (s: Setting) => void;
}) {
  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-40">Key</TableHead>
              <TableHead className="w-40">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-12 text-right" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((s) => (
              <SettingRow
                key={s.id}
                setting={s}
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
