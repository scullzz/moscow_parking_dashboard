import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { Setting } from '@/lib/types';
import { updateSetting } from '@/lib/api';
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
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  value: z.string().min(1)
});
type FormValues = z.infer<typeof schema>;

export default function SettingEditDialog({
  open,
  onOpenChange,
  setting,
  onUpdated
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  setting: Setting;
  onUpdated: (s: Setting) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      key: setting.key,
      name: setting.name,
      description: setting.description,
      value: setting.value
    }
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const updated = await updateSetting(setting.id, data);
      onUpdated(updated);
      toast.success('Setting updated');
      onOpenChange(false);
    } catch {
      toast.error('Failed to update setting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Setting</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {['key', 'name', 'description', 'value'].map((field) => (
            <div key={field} className="space-y-1">
              <Label className="capitalize">{field}</Label>
              <Input {...register(field as keyof FormValues)} />
              {errors[field as keyof FormValues] && (
                <p className="text-xs text-red-600">
                  {errors[field as keyof FormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

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
