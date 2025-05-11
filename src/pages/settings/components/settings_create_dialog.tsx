'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { createSetting } from '@/lib/api';
import { Setting } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';
import SettingForm, { SettingFormData } from './settings_form';

export default function SettingCreateDialog({
  open,
  onOpenChange,
  onCreated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (s: Setting) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: SettingFormData) => {
    setLoading(true);
    try {
      const created = await createSetting(data);
      onCreated(created);
      toast.success('Setting created');
      onOpenChange(false);
    } catch {
      toast.error('Failed to create setting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Setting</DialogTitle>
        </DialogHeader>
        <SettingForm
          defaultValues={{ key: '', name: '', description: '', value: '' }}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
