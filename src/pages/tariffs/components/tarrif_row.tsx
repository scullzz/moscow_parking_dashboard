import { TableCell, TableRow } from '@/components/ui/table';
import { Tariff } from '@/lib/types';
import TariffActions from './tariff_action';

export default function TariffRow({
  tariff,
  onDelete,
  onUpdate
}: {
  tariff: Tariff;
  onDelete: (id: number) => void;
  onUpdate: (t: Tariff) => void;
}) {
  return (
    <TableRow className="transition-colors hover:bg-muted/50">
      <TableCell>{tariff.name}</TableCell>
      <TableCell>{tariff.description}</TableCell>
      <TableCell className="text-right">{tariff.days_count}</TableCell>
      <TableCell className="text-right">{tariff.price}</TableCell>
      <TableCell className="text-right">{tariff.filters_count}</TableCell>
      <TableCell className="text-right">
        <TariffActions
          tariff={tariff}
          onDeleted={onDelete}
          onUpdated={onUpdate}
        />
      </TableCell>
    </TableRow>
  );
}
