COASTAL HEALTHCARE ADVOCATES — LOGO PACKAGE
Supersedes every earlier set. Delete anything older; nothing here is
compatible with the pre-round-24 geometry.

  marks/     the Advocate Beacon mark on its own, 5 colourways + 2 favicon variants
  lockups/   mark + wordmark, 4 forms x 4 colourways, all type outlined

--------------------------------------------------------------------------------
COLOUR — the brand's own values. These are what everything is built from.

      Navy      #0F1E4A      Cyan      #00F2FE      Seagrass  #0BA678
      Sky       #4FACFE      Coral     #FE1E1A      Lantern   #E07A00
      Midnight  #0A0F24      Paper     #F5FBFF      Sand      #FFC93C
      Deep-tone alt shield    #2E3F72

  There is NO stripe colour. The stripes are negative space — the shield shows
  through them. Any spec naming a stripe ink is wrong.

NEAREST PANTONE — reference only, do NOT substitute into these files
  For quoting a job in Solid Coated. Matched by CIEDE2000; dE is how far off the
  chip is (under 2 imperceptible, over 5 a visible shift). Matched against
  published sRGB approximations, NOT Pantone's licensed data — check a physical
  fan deck before committing to a print run.

      Navy            PANTONE 2767 C          dE 1.2
      Sky             PANTONE 284 C           dE 3.3
      Cyan            PANTONE 3105 C          dE 6.3   weakest match in the set
      Coral           PANTONE Bright Red C    dE 2.0
      Midnight        PANTONE 5395 C          dE 7.1   see note
      Deep-tone alt   PANTONE 534 C           dE 2.1
      Seagrass        PANTONE 3278 C          dE 3.8
      Lantern         PANTONE 152 C           dE 1.6
      Sand            PANTONE 123 C           dE 1.1
      Paper           none — substrate, not an ink

  Cyan is the weakest match because a screen cyan that bright is outside what
  Solid Coated reaches. Midnight is deliberately NOT the literal nearest: 2768 C
  is closer but sits only dE 3.3 from 2767 C, and ink and dark ground would
  collapse into one colour. 5395 C is further off alone but holds the two apart.

--------------------------------------------------------------------------------
GEOMETRY

  POSITION  The whole lighthouse sits 3 units below the shield centre, so the
            finial clears the shield's peak with a tip of space.

  SCALE     The lighthouse is scaled 1.25x about (60,30) inside an unchanged
            shield and clipped to it, so the tower base is held by the shield.

  STRIPES   Helices on the tower surface, not flat diagonals. The tower is a
            tapered cone; a surface point at angle t projects orthographically to
            x = c(y) + w(y)*sin(t). Since dx/dt -> 0 as t -> +-90, each band
            flattens as it reaches the silhouette, which is what makes it read as
            wrapping in 3D. One revolution over the tower height, stripe occupying
            45% of each quarter-turn period. Five bands.

  CORNERS   Where the beams and the finial meet the shield outline, corners are
            rounded at r 1.2. Those are boolean intersections, not corners of any
            source path, so the rounding is applied to the composed silhouette
            (opening: erode 1.2, dilate 1.2, round joins) and then cleaned of the
            thin hooks and small lobes that morphology leaves behind.

  These files are flat filled paths, not masks. That is deliberate — the
  silhouette is a boolean result, so it is resolved at build time rather than left
  to the renderer. It also makes the antialiasing seams of earlier rounds
  structurally impossible. Editable source geometry lives in the build scripts
  (geom24.py / spiral.py / bake2.py), not in these outputs.

--------------------------------------------------------------------------------
MARKS  (SVG is the master; PNG 16/32/48/64/128/256/512/1024px, transparent)

  advocate-beacon-primary          Sky shield, coral heart        on Paper
  advocate-beacon-dark             Lightened sky, near-white      on Midnight
  advocate-beacon-one-colour       Single Navy ink                letterhead, stamps
  advocate-beacon-reversed         Paper shield, cyan heart       on deep ink
  advocate-beacon-deep-tone-alt    Muted navy shield, coral       on Paper
  advocate-beacon-favicon-primary  } simplified small-size mark, see below
  advocate-beacon-favicon-dark     }
  favicon-primary.ico           } multi-resolution 16-256, padded square.
  favicon-dark.ico              } drop favicon-primary.ico at your web root

  THE FAVICON FILES ARE DIFFERENT ON PURPOSE. Below ~28px the stripes close up.
  The favicon drops them, fills the tower solid Navy #0F1E4A, and scales the
  lighthouse 1.625x. Correct for 16-48px only; above that use the full mark.

  Full mark 20px minimum (28px+ recommended). Clear space 12 units (10% of width).

LOCKUPS  (PNG 2048/1024/512px, transparent; clear space baked into each artboard)

  lockup-horizontal-*   mark + rule + stacked wordmark. Default. Min width 180px.
  lockup-stacked-*      mark above centred wordmark. Square. Min width 120px.
  wordmark-*            "COASTAL / HEALTHCARE ADVOCATES", no mark. Min 140px.
  logotype-*            "COASTAL" alone. App headers, tight spaces. Min 90px.

  Each in primary, dark, one-colour and reversed. All type is OUTLINED (Tenor
  Sans, Ysabeau 500) — no fonts required at the printer.

--------------------------------------------------------------------------------
RASTERISING THESE YOURSELF

  Use a real browser engine (Chromium, resvg, Inkscape). cairosvg SILENTLY DROPS
  the <mask> element and hands back a solid shield with no lighthouse in it, with
  no warning. The masks are gone from the marks themselves, but
  this still applies to anything else in the identity that uses one.
