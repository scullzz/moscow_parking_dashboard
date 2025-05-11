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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteTariff } from '@/lib/api';
import { Tariff } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import TariffEditDialog from './tarrif_edit_one';

export default function TariffActions({
  tariff,
  onDeleted,
  onUpdated
}: {
  tariff: Tariff;
  onDeleted: (id: number) => void;
  onUpdated: (t: Tariff) => void;
}) {
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTariff(tariff.id);
      onDeleted(tariff.id);
      toast.success('Tariff deleted');
      setDialogDeleteOpen(false);
    } catch {
      toast.error('Failed to delete tariff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ----- DROPDOWN ----- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => setDialogEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setDialogDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ----- EDIT DIALOG ----- */}
      <TariffEditDialog
        open={dialogEditOpen}
        onOpenChange={setDialogEditOpen}
        tariff={tariff}
        onUpdated={onUpdated}
      />

      {/* ----- DELETE DIALOG ----- */}
      <AlertDialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete tariff?</AlertDialogTitle>
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
