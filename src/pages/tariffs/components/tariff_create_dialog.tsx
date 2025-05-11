'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import TariffForm, { TariffFormData } from './tarrif_form';
import { Tariff } from '@/lib/types';
import { createTariff } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TariffCreateDialog({
  open,
  onOpenChange,
  onCreated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (t: Tariff) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: TariffFormData) => {
    setLoading(true);
    try {
      const created = await createTariff(data);
      onCreated(created);
      toast.success('Tariff created');
      onOpenChange(false);
    } catch {
      toast.error('Failed to create tariff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Tariff</DialogTitle>
        </DialogHeader>
        <TariffForm
          defaultValues={{
            name: '',
            description: '',
            days_count: 0,
            price: 0,
            filters_count: 0
          }}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
