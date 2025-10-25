import * as React from "react";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import type { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils"; // optional helper if using shadcn setup

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean; // show spinner during debounce
};

export function Search({
  value,
  onChange,
  onClear,
  placeholder = "Search movies...",
  loading = false,
}: Props) {
  const showClear = value.length > 2;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn("pr-10")} // add padding for icons
      />

      {/* Loader icon when debouncing */}
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
      )}

      {/* Cross icon when value > 2 */}
      {!loading && showClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
