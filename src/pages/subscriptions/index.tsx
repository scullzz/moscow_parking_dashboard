import Pagination from '@/components/shared/pagination';
import { getSubscriptions } from '@/lib/api';
import { Subscription } from '@/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SubscriptionsTable from './components/subscription_table';

export default function SubscriptionsPage() {
  const [page, setPage] = useState(1);
  const size = 50;

  const [items, setItems] = useState<Subscription[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const res = await getSubscriptions(p, size);
      setItems(res.items);
      setTotalPages(res.pages);
    } catch {
      toast.error('Cannot load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  return (
    <main className="container mx-auto space-y-6 p-6">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <SubscriptionsTable items={items} />
          <Pagination
            current={page}
            total={totalPages}
            size={size}
            onChange={setPage}
          />
        </>
      )}
    </main>
  );
}
