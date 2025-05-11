'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { User } from '@/lib/types';
import { format } from 'date-fns';
import UserActions from './user_action';

interface Props {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserRow({ user, onDelete }: Props) {
  const fmt = (iso: string) => format(new Date(iso), 'yyyy-MM-dd HH:mm');
  return (
    <TableRow className="transition-colors hover:bg-muted/50">
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{fmt(user.create_dttm)}</TableCell>
      <TableCell>{fmt(user.update_dttm)}</TableCell>
      <TableCell className="text-right">
        <UserActions userId={user.id} onDeleted={onDelete} />
      </TableCell>
    </TableRow>
  );
}
