"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/** tiny utility to join classNames */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CellIdx = { row: number; col: number } | null;

export const BackgroundRippleEffect = ({
  rows = 8,              // minimums; auto-fit expands as needed
  cols = 27,
  cellSize = 56,         // px per cell
  hoverScale = 1.08,     // hovered cell scale
  hoverOpacity = 1.0,    // hovered cell opacity
  baseOpacity = 0.65,    // non-hovered cell opacity (↑ made brighter)
  fillAlpha = 0.3,      // base fill alpha (↑ was ~0.05)
  borderAlpha = 0.18,    // base border alpha (↑ was ~0.08–0.10)
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  hoverScale?: number;
  hoverOpacity?: number;
  baseOpacity?: number;
  fillAlpha?: number;
  borderAlpha?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<CellIdx>(null);  // click ripple center
  const [cursorCell, setCursorCell] = useState<CellIdx>(null);    // single hovered cell
  const [rippleKey, setRippleKey] = useState(0);

  // Auto-fit counts to ensure full-viewport coverage (+ small buffer)
  const [fitRows, setFitRows] = useState(rows);
  const [fitCols, setFitCols] = useState(cols);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Compute rows/cols to fill container/viewport
  useEffect(() => {
    const compute = () => {
      const el = rootRef.current;
      const w = el?.clientWidth || window.innerWidth;
      const h = el?.clientHeight || window.innerHeight;
      // +2 buffer so edges never gap during resize
      setFitCols(Math.max(cols, Math.ceil(w / cellSize) + 2));
      setFitRows(Math.max(rows, Math.ceil(h / cellSize) + 2));
    };
    compute();

    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    let ro: ResizeObserver | undefined;
    if (rootRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(compute);
      ro.observe(rootRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [rows, cols, cellSize]);

  // Mouse -> exact cell mapping (works through overlays)
  useEffect(() => {
    let ticking = false;

    const updateFromPoint = (clientX: number, clientY: number) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // Grid pixel size (anchored top-left; no centering)
      const gridWidthPx = fitCols * cellSize;
      const gridHeightPx = fitRows * cellSize;

      // Since the grid container sits at top-left of root, its origin equals root's origin.
      const gridLeft = rect.left;
      const gridTop = rect.top;

      // Clamp within grid bounds
      const relX = Math.max(0, Math.min(clientX - gridLeft, gridWidthPx - 1));
      const relY = Math.max(0, Math.min(clientY - gridTop, gridHeightPx - 1));

      const c = Math.floor(relX / cellSize);
      const r = Math.floor(relY / cellSize);

      setCursorCell({ row: r, col: c });
    };

    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateFromPoint(e.clientX, e.clientY);
        ticking = false;
      });
    };

    const onLeave = () => setCursorCell(null);

    const onClick = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const gridWidthPx = fitCols * cellSize;
      const gridHeightPx = fitRows * cellSize;

      const relX = Math.max(0, Math.min(e.clientX - rect.left, gridWidthPx - 1));
      const relY = Math.max(0, Math.min(e.clientY - rect.top, gridHeightPx - 1));

      const c = Math.floor(relX / cellSize);
      const r = Math.floor(relY / cellSize);

      setClickedCell({ row: r, col: c });
      setRippleKey((k) => k + 1); // fresh animation pass
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, [cellSize, fitRows, fitCols]);

  // Brighter defaults (but still respect your CSS vars)
  const fillColor = `rgba(255,255,255,${fillAlpha})`;
  const borderColor = `rgba(255,255,255,${borderAlpha})`;

  return (
    <div
      ref={rootRef}
      className={cn(
        "absolute inset-0 h-full w-full",
        // fallback vars (light/dark safe)
        "[--cell-shadow-color:var(--color-neutral-800,rgba(0,0,0,0.45))]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-100" // ↑ from 60 → 100 for visibility
          rows={fitRows}
          cols={fitCols}
          cellSize={cellSize}
          borderColor={borderColor}
          fillColor={fillColor}
          clickedCell={clickedCell}
          cursorCell={cursorCell}
          hoverScale={hoverScale}
          hoverOpacity={hoverOpacity}
          baseOpacity={baseOpacity}
          interactive={false} // we manage clicks globally; set true to click individual cells
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // px
  borderColor: string;
  fillColor: string;
  clickedCell: CellIdx;       // click pulse animation center
  cursorCell: CellIdx;        // hovered cell
  hoverScale: number;
  hoverOpacity: number;
  baseOpacity: number;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell = null,
  cursorCell = null,
  hoverScale,
  hoverOpacity,
  baseOpacity,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, idx) => idx), [rows, cols]);

  // IMPORTANT: anchor grid to top-left and size in exact pixels to avoid offset bugs
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: `${cols * cellSize}px`,
    height: `${rows * cellSize}px`,
    // no centering → exact math for mapping mouse → cell
    marginInline: "0",
    marginBlock: "0",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const isHovered =
          cursorCell && rowIdx === cursorCell.row && colIdx === cursorCell.col;

        // CLICK ripple (CSS keyframes) – you already have animate-cell-ripple keyframes in CSS
        const clickDistance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const clickDelay = clickedCell ? Math.max(0, clickDistance * 55) : 0; // ms
        const clickDuration = 220 + clickDistance * 85; // ms
        const clickAnimStyle: CellStyle = clickedCell
          ? { ["--delay"]: `${clickDelay}ms`, ["--duration"]: `${clickDuration}ms` }
          : {};

        // Hover: exactly one cell lights up
        const scale = isHovered ? hoverScale : 1;
        const opacity = isHovered ? hoverOpacity : baseOpacity;

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] transition-[transform,opacity,filter] duration-150 will-change-transform",
              "dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              transform: `scale(${scale})`,
              opacity,
              filter: isHovered ? "brightness(1.25)" : "none",
              ...clickAnimStyle,
            }}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
};