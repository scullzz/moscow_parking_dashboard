import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Pagination from '@/components/shared/pagination';
import { getTariffs } from '@/lib/api';
import { Tariff } from '@/lib/types';
import TariffsTable from './components/tarrifs_table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import TariffCreateDialog from './components/tariff_create_dialog';

export default function TariffsPage() {
  const [page, setPage] = useState(1);
  const size = 50;

  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const data = await getTariffs(p, size);
      setTariffs(data.items);
      setPages(data.pages);
    } catch {
      toast.error('Cannot load tariffs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDeleted = (id: number) =>
    setTariffs((prev) => prev.filter((t) => t.id !== id));

  const handleUpdated = (updated: Tariff) =>
    setTariffs((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  const handleCreated = (t: Tariff) => setTariffs((prev) => [t, ...prev]);

  return (
    <main className="container mx-auto space-y-6 p-6">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>
          <Icons.add className="mr-2 h-4 w-4" />
          Add Tariff
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <TariffsTable
            tariffs={tariffs}
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

      <TariffCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />
    </main>
  );
}
