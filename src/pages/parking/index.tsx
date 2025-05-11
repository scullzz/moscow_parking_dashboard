import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Pagination from '@/components/shared/pagination';

import {
  getParkingOptions,
  getParkingSessions,
  getParkingTasks
} from '@/lib/api';
import type { ParkingOption, ParkingSession, ParkingTask } from '@/lib/types';

import ParkingOptionsTable from './components/parking_option_table';
import ParkingTasksTable from './components/parking_tasks_table';
import ParkingOptionCreateDialog from './components/create_edit_parking_option';
import ParkingSessionsTable from './components/parking_sesstion_table';

export default function ParkingOptionsPage() {
  /* ---------- Options ---------- */
  const [optPage, setOptPage] = useState(1);
  const [options, setOptions] = useState<ParkingOption[]>([]);
  const [optPages, setOptPages] = useState(1);
  const [loadingOpts, setLoadingOpts] = useState(true);

  /* ---------- Sessions ---------- */
  const [sessPage, setSessPage] = useState(1);
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [sessPages, setSessPages] = useState(1);
  const [loadingSess, setLoadingSess] = useState(true);

  /* ---------- Tasks ---------- */
  const [taskPage, setTaskPage] = useState(1);
  const [tasks, setTasks] = useState<ParkingTask[]>([]);
  const [taskPages, setTaskPages] = useState(1);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const size = 50;

  /* ---------- load helpers ---------- */
  const loadOptions = async (p = optPage) => {
    setLoadingOpts(true);
    try {
      const d = await getParkingOptions(p, size);
      setOptions(d.items);
      setOptPages(d.pages);
    } catch {
      toast.error('Cannot load options');
    } finally {
      setLoadingOpts(false);
    }
  };

  const loadSessions = async (p = sessPage) => {
    setLoadingSess(true);
    try {
      const d = await getParkingSessions(p, size);
      setSessions(d.items);
      setSessPages(d.pages);
    } catch {
      toast.error('Cannot load sessions');
    } finally {
      setLoadingSess(false);
    }
  };

  const loadTasks = async (p = taskPage) => {
    setLoadingTasks(true);
    try {
      const d = await getParkingTasks(p, size);
      setTasks(d.items);
      setTaskPages(d.pages);
    } catch {
      toast.error('Cannot load tasks');
    } finally {
      setLoadingTasks(false);
    }
  };

  /* ---------- effects ---------- */
  useEffect(() => void loadOptions(optPage), [optPage]);
  useEffect(() => void loadSessions(sessPage), [sessPage]);
  useEffect(() => void loadTasks(taskPage), [taskPage]);

  /* ---------- create / update / delete for options ---------- */
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreated = (o: ParkingOption) =>
    setOptions((prev) => [o, ...prev]);

  const handleDeleted = (id: number) =>
    setOptions((prev) => prev.filter((x) => x.id !== id));

  const handleUpdated = (o: ParkingOption) =>
    setOptions((prev) => prev.map((x) => (x.id === o.id ? o : x)));

  /* ---------- JSX ---------- */
  return (
    <main className="container mx-auto space-y-12 p-6">
      {/* -------- OPTIONS -------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Icons.parking className="h-5 w-5" />
            Parking options
          </h2>
          <Button onClick={() => setCreateOpen(true)}>
            <Icons.add className="mr-2 h-4 w-4" />
            Add Option
          </Button>
        </div>

        {loadingOpts ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ParkingOptionsTable
              items={options}
              onDelete={handleDeleted}
              onUpdate={handleUpdated}
            />
            <Pagination
              current={optPage}
              total={optPages}
              size={size}
              onChange={setOptPage}
            />
          </>
        )}
      </section>

      {/* -------- SESSIONS -------- */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Icons.session className="h-5 w-5" />
          Parking sessions
        </h2>

        {loadingSess ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ParkingSessionsTable items={sessions} />
            <Pagination
              current={sessPage}
              total={sessPages}
              size={size}
              onChange={setSessPage}
            />
          </>
        )}
      </section>

      {/* -------- TASKS -------- */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Icons.task className="h-5 w-5" />
          Parking tasks
        </h2>

        {loadingTasks ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ParkingTasksTable items={tasks} />
            <Pagination
              current={taskPage}
              total={taskPages}
              size={size}
              onChange={setTaskPage}
            />
          </>
        )}
      </section>

      {/* -------- CREATE DIALOG -------- */}
      <ParkingOptionCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />
    </main>
  );
}
