import Pagination from '@/components/shared/pagination';
import { getSettings } from '@/lib/api';
import { Setting } from '@/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SettingsTable from './components/settings_table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import SettingCreateDialog from './components/settings_create_dialog';

export default function SettingsPage() {
  const [page, setPage] = useState(1);
  const size = 50;

  const [items, setItems] = useState<Setting[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const data = await getSettings(p, size);
      setItems(data.items);
      setPages(data.pages);
    } catch {
      toast.error('Cannot load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => void load(page), [page]);

  const handleDeleted = (id: number) =>
    setItems((prev) => prev.filter((s) => s.id !== id));

  const handleUpdated = (s: Setting) =>
    setItems((prev) => prev.map((x) => (x.id === s.id ? s : x)));

  const handleCreated = (s: Setting) => setItems((prev) => [s, ...prev]);

  return (
    <main className="container mx-auto space-y-6 p-6">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>
          <Icons.add className="mr-2 h-4 w-4" />
          Add Setting
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <SettingsTable
            items={items}
            onDelete={handleDeleted}
            onUpdate={handleUpdated}
          />
          <Pagination
            current={page}
            total={pages}
            size={size}
            onChange={setPage}
          />
        </>
      )}

      <SettingCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />
    </main>
  );
}
