import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getUsers } from '@/lib/api';
import { User } from '@/lib/types';
import UsersTable from './components/users_table';
import Pagination from '@/components/shared/pagination';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const size = 50;
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUsers(page, size);
        console.log(data);
        setUsers(data.items);
        setTotalPages(data.pages);
      } catch {
        toast.error('Cannot load users');
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const handleUserDeleted = (id: number) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <main className="container mx-auto space-y-6 p-6">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <UsersTable users={users} onDelete={handleUserDeleted} />
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
