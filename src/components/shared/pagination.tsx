'use client';

import { Button } from '@/components/ui/button';

interface Props {
  current: number;
  total: number;
  size: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        Prev
      </Button>

      <span className="text-sm text-muted-foreground">
        {current} / {total}
      </span>

      <Button
        variant="outline"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        Next
      </Button>
    </div>
  );
}
