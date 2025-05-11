'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import { ParkingOption } from '@/lib/types';
import { deleteParkingOption } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ParkingOptionEditDialog from './parking_edit_dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export default function ParkingOptionActions({
  option,
  onDeleted,
  onUpdated
}: {
  option: ParkingOption;
  onDeleted: (id: number) => void;
  onUpdated: (o: ParkingOption) => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteParkingOption(option.id);
      onDeleted(option.id);
      toast.success('Option deleted');
      setDelOpen(false);
    } catch {
      toast.error('Failed to delete option');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setDelOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ParkingOptionEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        option={option}
        onUpdated={onUpdated}
      />

      <AlertDialog open={delOpen} onOpenChange={setDelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete option?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
