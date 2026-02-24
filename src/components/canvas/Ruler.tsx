/**
 * Horizontal ruler above the document canvas.
 * Visual aid only (Phase 1): shows scale and margin indicators.
 * Units configurable in Settings (mm, cm, inch); default mm per Australian conventions.
 */
import { useMemo, useRef, useState, useEffect } from "react";

export type RulerUnits = "mm" | "cm" | "inch";

const MM_PER_INCH = 25.4;
const PX_PER_INCH = 96;

/** Convert mm to pixels at 96 DPI */
function mmToPx(mm: number): number {
  return (mm / MM_PER_INCH) * PX_PER_INCH;
}

/** Convert inch to pixels */
function inchToPx(inch: number): number {
  return inch * PX_PER_INCH;
}

interface RulerProps {
  /** Optional explicit width; if 0 or omitted, uses ResizeObserver on track */
  widthPx?: number;
  units: RulerUnits;
  /** Left margin in the ruler's units (default 25mm) */
  marginLeft?: number;
  /** Right margin in the ruler's units (default 25mm) */
  marginRight?: number;
}

function unitsToPx(value: number, units: RulerUnits): number {
  switch (units) {
    case "mm":
      return mmToPx(value);
    case "cm":
      return mmToPx(value * 10);
    case "inch":
      return inchToPx(value);
    default:
      return mmToPx(value);
  }
}

function pxToUnits(px: number, units: RulerUnits): number {
  const pxPerMm = PX_PER_INCH / MM_PER_INCH;
  const mm = px / pxPerMm;
  switch (units) {
    case "mm":
      return mm;
    case "cm":
      return mm / 10;
    case "inch":
      return px / PX_PER_INCH;
    default:
      return mm;
  }
}

export function Ruler({
  widthPx: widthPxProp = 0,
  units,
  marginLeft = 25,
  marginRight = 25,
}: RulerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(720);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (typeof w === "number") setMeasuredWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const effectiveWidth = widthPxProp > 0 ? widthPxProp : measuredWidth;
  const { ticks, labelInterval, marginLeftPx, marginRightPx } = useMemo(() => {
    const totalUnits = pxToUnits(effectiveWidth, units);
    const marginLeftPx = unitsToPx(marginLeft, units);
    const marginRightPx = effectiveWidth - unitsToPx(marginRight, units);

    let minorStep: number;
    let majorStep: number;
    let labelInterval: number;

    switch (units) {
      case "mm":
        minorStep = 1;
        majorStep = 10;
        labelInterval = 10;
        break;
      case "cm":
        minorStep = 0.1;
        majorStep = 1;
        labelInterval = 1;
        break;
      case "inch":
        minorStep = 1 / 16;
        majorStep = 0.5;
        labelInterval = 1;
        break;
      default:
        minorStep = 1;
        majorStep = 10;
        labelInterval = 10;
    }

    const ticks: { position: number; value: number; isMajor: boolean }[] = [];
    const step = minorStep;
    for (let i = 0; ; i++) {
      const u = i * step;
      if (u > totalUnits) break;
      const pos = unitsToPx(u, units);
      if (pos > effectiveWidth) break;
      const isMajor = Math.abs((u / majorStep) - Math.round(u / majorStep)) < 1e-6;
      ticks.push({ position: pos, value: u, isMajor });
    }

    return { ticks, labelInterval, marginLeftPx, marginRightPx };
  }, [effectiveWidth, units, marginLeft, marginRight]);

  const formatLabel = (value: number): string => {
    if (units === "inch") {
      return value % 1 === 0 ? String(value) : value.toFixed(1);
    }
    return value % 1 === 0 ? String(Math.round(value)) : value.toFixed(1);
  };

  return (
    <div
      className="canvas-ruler"
      role="img"
      aria-label={`Ruler in ${units}, ${Math.round(effectiveWidth)} pixels wide`}
    >
      <div ref={trackRef} className="canvas-ruler-track">
        {ticks.map((t, i) => (
          <div
            key={i}
            className={`canvas-ruler-tick ${t.isMajor ? "canvas-ruler-tick--major" : ""}`}
            style={{ left: t.position }}
          />
        ))}
        {ticks
          .filter(
            (t) =>
              t.isMajor &&
              t.value > 0 &&
              Math.abs((t.value / labelInterval) - Math.round(t.value / labelInterval)) < 1e-6
          )
          .map((t, i) => (
            <span
              key={`label-${i}`}
              className="canvas-ruler-label"
              style={{ left: t.position }}
            >
              {formatLabel(t.value)}
            </span>
          ))}
        <div
          className="canvas-ruler-margin canvas-ruler-margin--left"
          style={{ width: marginLeftPx }}
        />
        <div
          className="canvas-ruler-margin canvas-ruler-margin--right"
          style={{ left: marginRightPx, right: 0 }}
        />
      </div>
    </div>
  );
}
