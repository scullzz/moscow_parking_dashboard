import { TableCell, TableRow } from '@/components/ui/table';
import { ParkingOption } from '@/lib/types';
import ParkingOptionActions from './parking_action';

export default function ParkingOptionRow({
  option,
  onDelete,
  onUpdate
}: {
  option: ParkingOption;
  onDelete: (id: number) => void;
  onUpdate: (o: ParkingOption) => void;
}) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>{option.id}</TableCell>
      <TableCell>{option.zone_id}</TableCell>
      <TableCell>{option.name}</TableCell>
      <TableCell className="text-right">{option.rate}</TableCell>
      <TableCell>{option.availability ? '✔' : '✖'}</TableCell>
      <TableCell className="text-right">
        <ParkingOptionActions
          option={option}
          onDeleted={onDelete}
          onUpdated={onUpdate}
        />
      </TableCell>
    </TableRow>
  );
}
