'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  zone_id: z.string().min(1),
  name: z.string().min(1),
  rate: z.coerce.number().nonnegative(),
  availability: z.boolean()
});
export type OptionFormData = z.infer<typeof schema>;

export default function ParkingOptionForm({
  defaultValues,
  loading,
  onSubmit,
  onCancel
}: {
  defaultValues: OptionFormData;
  loading: boolean;
  onSubmit: (d: OptionFormData) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OptionFormData>({
    resolver: zodResolver(schema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(['zone_id', 'name'] as const).map((f) => (
        <div key={f} className="space-y-1">
          <Label className="capitalize">{f.replace('_', ' ')}</Label>
          <Input {...register(f)} />
          {errors[f] && (
            <p className="text-xs text-red-600">{errors[f]?.message}</p>
          )}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Rate</Label>
          <Input type="number" {...register('rate')} />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" {...register('availability')} />
          <Label>Available</Label>
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
