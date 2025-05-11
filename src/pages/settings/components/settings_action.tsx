import { useState } from 'react';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import { Setting } from '@/lib/types';
import { deleteSetting } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
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
import SettingEditDialog from './settings_edit';

export default function SettingActions({
  setting,
  onDeleted,
  onUpdated
}: {
  setting: Setting;
  onDeleted: (id: number) => void;
  onUpdated: (s: Setting) => void;
}) {
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSetting(setting.id);
      onDeleted(setting.id);
      toast.success('Setting deleted');
      setDelOpen(false);
    } catch {
      toast.error('Failed to delete setting');
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

      <SettingEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        setting={setting}
        onUpdated={onUpdated}
      />

      <AlertDialog open={delOpen} onOpenChange={setDelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete setting?</AlertDialogTitle>
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
