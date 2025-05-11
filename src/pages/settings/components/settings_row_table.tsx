import { TableCell, TableRow } from '@/components/ui/table';
import { Setting } from '@/lib/types';
import SettingActions from './settings_action';

export default function SettingRow({
  setting,
  onDelete,
  onUpdate
}: {
  setting: Setting;
  onDelete: (id: number) => void;
  onUpdate: (s: Setting) => void;
}) {
  return (
    <TableRow className="transition-colors hover:bg-muted/50">
      <TableCell>{setting.id}</TableCell>
      <TableCell>{setting.key}</TableCell>
      <TableCell>{setting.name}</TableCell>
      <TableCell>{setting.description}</TableCell>
      <TableCell>{setting.value}</TableCell>
      <TableCell className="text-right">
        <SettingActions
          setting={setting}
          onDeleted={onDelete}
          onUpdated={onUpdate}
        />
      </TableCell>
    </TableRow>
  );
}
