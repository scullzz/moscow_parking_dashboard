import Pagination from '@/components/shared/pagination';
import { getPayHistory } from '@/lib/api';
import { PayHistory } from '@/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PayHistoryTable from './components/pay_history_table';

export default function PayHistoryPage() {
  const [page, setPage] = useState(1);
  const size = 50;

  const [items, setItems] = useState<PayHistory[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const data = await getPayHistory(p, size);
      setItems(data.items);
      setPages(data.pages);
    } catch {
      toast.error('Cannot load pay history');
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
          <PayHistoryTable items={items} />
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
