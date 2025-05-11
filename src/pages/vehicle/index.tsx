import Pagination from '@/components/shared/pagination';
import { getVehicles } from '@/lib/api';
import { Vehicle } from '@/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import VehiclesTable from './components/vehicle_table';

export default function VehiclesPage() {
  const [page, setPage] = useState(1);
  const size = 50;

  const [items, setItems] = useState<Vehicle[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const data = await getVehicles(p, size);
      setItems(data.items);
      setPages(data.pages);
    } catch {
      toast.error('Cannot load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => void load(page), [page]);

  return (
    <main className="container mx-auto space-y-6 p-6">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <VehiclesTable items={items} />
          <Pagination
            current={page}
            total={pages}
            size={size}
            onChange={setPage}
          />
        </>
      )}
    </main>
  );
}
