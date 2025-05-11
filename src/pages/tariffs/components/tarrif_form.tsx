'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  days_count: z.coerce.number().int().positive(),
  price: z.coerce.number().nonnegative(),
  filters_count: z.coerce.number().int().nonnegative()
});
export type TariffFormData = z.infer<typeof schema>;

export default function TariffForm({
  defaultValues,
  loading,
  onSubmit,
  onCancel
}: {
  defaultValues: TariffFormData;
  loading: boolean;
  onSubmit: (d: TariffFormData) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TariffFormData>({
    resolver: zodResolver(schema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(['name', 'description'] as const).map((f) => (
        <div key={f} className="space-y-1">
          <Label className="capitalize">{f}</Label>
          <Input {...register(f)} />
          {errors[f] && (
            <p className="text-xs text-red-600">{errors[f]?.message}</p>
          )}
        </div>
      ))}

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Days</Label>
          <Input type="number" {...register('days_count')} />
        </div>
        <div>
          <Label>Price</Label>
          <Input type="number" {...register('price')} />
        </div>
        <div>
          <Label>Filters</Label>
          <Input type="number" {...register('filters_count')} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
