import { useLayoutEffect, useRef, useState } from "react";

type Pt = { x: number; y: number };

export function useContainerCenter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [center, setCenter] = useState<Pt | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ro: ResizeObserver | null = null;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const r = el.getBoundingClientRect();
      setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };

    const run = async () => {
      // Wait for fonts if available (prevents “shift after load” center bugs)
      try { 
          // @ts-ignore - document.fonts is not yet in all TS definitions
          await document.fonts?.ready; 
      } catch {}
      
      raf = requestAnimationFrame(() => {
        measure();
        raf = requestAnimationFrame(measure); // second pass catches late layout settling
      });

      ro = new ResizeObserver(() => measure());
      ro.observe(el);
    };

    run();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  return { ref, center };
}
