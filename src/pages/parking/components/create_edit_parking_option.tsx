'use client';
import { ParkingOption } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';
import ParkingOptionForm, { OptionFormData } from './parking_options_form';
import { createParkingOption } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export default function ParkingOptionCreateDialog({
  open,
  onOpenChange,
  onCreated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (o: ParkingOption) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (d: OptionFormData) => {
    setLoading(true);
    try {
      const created = await createParkingOption(d);
      onCreated(created);
      toast.success('Option created');
      onOpenChange(false);
    } catch {
      toast.error('Failed to create option');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Parking Option</DialogTitle>
        </DialogHeader>
        <ParkingOptionForm
          defaultValues={{ zone_id: '', name: '', rate: 0, availability: true }}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
