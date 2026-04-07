import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";

type Props = {
  tex: string;
  /** Display (block) mode */
  display?: boolean;
  className?: string;
};

export function KaTeX({ tex, display, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      katex.render(tex, el, {
        displayMode: !!display,
        throwOnError: false,
        strict: "ignore",
      });
    } catch {
      el.textContent = tex;
    }
  }, [tex, display]);

  return <span ref={ref} className={className} />;
}
