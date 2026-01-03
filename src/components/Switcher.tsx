import { ArrowDownUp } from "lucide-react";

import { useStore } from "@/store/StoreContext";

import { Button } from "@/components/ui/button";

export function Switcher() {
  const { swap } = useStore();

  return (
    <Button onClick={swap} variant="ghost">
      <ArrowDownUp />
    </Button>
  );
}
