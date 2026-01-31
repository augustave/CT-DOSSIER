import { useEffect, useState } from "react";

type Vp = { width: number; height: number; offsetLeft: number; offsetTop: number };

export function useStableViewport(): Vp {
  const read = (): Vp => {
    // Only access window if defined (SSR safety)
    if (typeof window === "undefined") return { width: 0, height: 0, offsetLeft: 0, offsetTop: 0 };
    
    // Check for visualViewport support
    const vv = window.visualViewport;
    if (vv) {
        return { width: vv.width, height: vv.height, offsetLeft: vv.offsetLeft, offsetTop: vv.offsetTop };
    }
    
    return { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
  };

  const [vp, setVp] = useState<Vp>(() => read());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const vv = window.visualViewport;
    const onChange = () => setVp(read());

    window.addEventListener("resize", onChange, { passive: true });
    window.addEventListener("scroll", onChange, { passive: true });
    
    if (vv) {
        vv.addEventListener("resize", onChange, { passive: true });
        vv.addEventListener("scroll", onChange, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
      if (vv) {
          vv.removeEventListener("resize", onChange);
          vv.removeEventListener("scroll", onChange);
      }
    };
  }, []);

  return vp;
}
