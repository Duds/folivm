#!/usr/bin/env python3
"""
Convert a PNG image to SVG using potracer.
Usage: python png-to-svg.py <input.png> [output.svg]
"""

import sys
from pathlib import Path

from PIL import Image

# potracer package (pip install potracer)
from potrace import POTRACE_TURNPOLICY_MINORITY, Bitmap


def png_to_svg(input_path: Path, output_path: Path | None = None) -> None:
    """Convert PNG to SVG using potracer."""
    if output_path is None:
        output_path = input_path.with_suffix(".svg")

    image = Image.open(input_path)
    if image.mode != "L":
        image = image.convert("L")

    bm = Bitmap(image, blacklevel=0.5)
    plist = bm.trace(
        turdsize=2,
        turnpolicy=POTRACE_TURNPOLICY_MINORITY,
        alphamax=1,
        opticurve=False,
        opttolerance=0.2,
    )

    width, height = image.size

    path_d_parts = []
    for curve in plist:
        fs = curve.start_point
        parts = [f"M{fs.x},{fs.y}"]
        for segment in curve.segments:
            if segment.is_corner:
                a = segment.c
                b = segment.end_point
                parts.append(f"L{a.x},{a.y} L{b.x},{b.y}")
            else:
                a = segment.c1
                b = segment.c2
                c = segment.end_point
                parts.append(f"C{a.x},{a.y} {b.x},{b.y} {c.x},{c.y}")
        parts.append("z")
        path_d_parts.append("".join(parts))

    path_elements = "\n  ".join(
        f'<path d="{d}" fill="black"/>' for d in path_d_parts
    )

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  {path_elements}
</svg>'''

    output_path.write_text(svg, encoding="utf-8")
    print(f"Wrote {output_path}")


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python png-to-svg.py <input.png> [output.svg]", file=sys.stderr)
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else None

    if not input_path.exists():
        print(f"Error: {input_path} not found", file=sys.stderr)
        sys.exit(1)

    png_to_svg(input_path, output_path)


if __name__ == "__main__":
    main()
