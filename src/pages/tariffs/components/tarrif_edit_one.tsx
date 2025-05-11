'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { Tariff } from '@/lib/types';
import { updateTariff } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  days_count: z.coerce.number().int().positive(),
  price: z.coerce.number().nonnegative(),
  filters_count: z.coerce.number().int().nonnegative()
});

type FormValues = z.infer<typeof schema>;

export default function TariffEditDialog({
  open,
  onOpenChange,
  tariff,
  onUpdated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tariff: Tariff;
  onUpdated: (t: Tariff) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: tariff.name,
      description: tariff.description,
      days_count: tariff.days_count,
      price: tariff.price,
      filters_count: tariff.filters_count
    }
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const updated = await updateTariff(tariff.id, values);
      onUpdated(updated);
      toast.success('Tariff updated');
      onOpenChange(false);
    } catch {
      toast.error('Failed to update tariff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tariff</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 pt-2"
          autoComplete="off"
        >
          <div className="space-y-1">
            <Label>Name</Label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Input {...register('description')} />
            {errors.description && (
              <p className="text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Days</Label>
              <Input type="number" {...register('days_count')} />
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input type="number" {...register('price')} />
            </div>
            <div className="space-y-1">
              <Label>Filters</Label>
              <Input type="number" {...register('filters_count')} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
