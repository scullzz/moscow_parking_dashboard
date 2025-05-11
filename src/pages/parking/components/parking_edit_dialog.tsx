'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import ParkingOptionForm, { OptionFormData } from './parking_options_form';
import { ParkingOption } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { updateParkingOption } from '@/lib/api';

export default function ParkingOptionEditDialog({
  open,
  onOpenChange,
  option,
  onUpdated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  option: ParkingOption;
  onUpdated: (o: ParkingOption) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: OptionFormData) => {
    setLoading(true);
    try {
      const upd = await updateParkingOption(option.id, data);
      onUpdated(upd);
      toast.success('Option updated');
      onOpenChange(false);
    } catch {
      toast.error('Failed to update option');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Parking Option</DialogTitle>
        </DialogHeader>
        <ParkingOptionForm
          defaultValues={{
            zone_id: option.zone_id,
            name: option.name,
            rate: option.rate,
            availability: option.availability
          }}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
