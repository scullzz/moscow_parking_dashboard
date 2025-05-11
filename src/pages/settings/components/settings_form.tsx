'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  value: z.string().min(1)
});
export type SettingFormData = z.infer<typeof schema>;

export default function SettingForm({
  defaultValues,
  loading,
  onSubmit,
  onCancel
}: {
  defaultValues: SettingFormData;
  loading: boolean;
  onSubmit: (d: SettingFormData) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SettingFormData>({
    resolver: zodResolver(schema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(['key', 'name', 'description', 'value'] as const).map((f) => (
        <div key={f} className="space-y-1">
          <Label className="capitalize">{f}</Label>
          <Input {...register(f)} />
          {errors[f] && (
            <p className="text-xs text-red-600">{errors[f]?.message}</p>
          )}
        </div>
      ))}

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
