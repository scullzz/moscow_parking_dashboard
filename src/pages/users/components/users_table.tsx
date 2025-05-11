'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/types';
import UserRow from './user_row';

interface Props {
  users: User[];
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, onDelete }: Props) {
  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-lg">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-wider text-muted-foreground">
              <TableHead className="w-32">Username</TableHead>
              <TableHead className="w-40">First name</TableHead>
              <TableHead className="w-56">Created at</TableHead>
              <TableHead className="w-56">Updated at</TableHead>
              <TableHead className="w-12 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <UserRow key={u.id} user={u} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
