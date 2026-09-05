COASTAL HEALTHCARE ADVOCATES — "Pulse Beacon" mark
Round 24. Supersedes the round-23 set completely; delete the old files.

WHAT CHANGED FROM ROUND 23
  1. The lighthouse is scaled 1.25x about (60,30) inside an unchanged shield, so the
     tower and lantern read at smaller sizes.
  2. It is clipped to the shield. The tower base no longer overhangs the shield point
     the way it does on the caps and the vehicle wrap.
  3. The tower stripes are no longer painted navy. Tower and stripes are ONE evenodd
     path with the stripes punched out, so the shield shows through them. The entire
     mark is now negative space: lighthouse, beams and stripes all let the ground show.
  4. The collar is drawn last and overlaps the tower top, so the stripes meet it flush.

  There is NO stripe colour anywhere in this set. Any spec, quote or vendor file that
  names one (Navy #0F1E4A for the stripe, coral on Deep tone, cyan on Reversed) predates
  this round and is out of date.

FILES  (SVG is the master; PNGs at 1024/512/256/128/64/32px, transparent)
  pulse-beacon-primary          Sky shield, coral heart          on Paper #F5FBFF
  pulse-beacon-dark             Lightened sky, near-white heart  on Midnight #0A0F24
  pulse-beacon-one-colour       Single Navy ink                  on Paper
  pulse-beacon-reversed         Paper shield, cyan heart         on deep ink #0F1E4A
  pulse-beacon-deep-tone-alt    Muted navy shield, coral heart   on Paper
  pulse-beacon-favicon-primary  } simplified small-size mark, see below
  pulse-beacon-favicon-dark     }

THE FAVICON FILES ARE DIFFERENT ON PURPOSE
  Below about 28px the stripes close up and the mark turns to mush. The favicon files
  drop the stripes, fill the tower SOLID Navy #0F1E4A, and scale the lighthouse 1.625x.
  They are the only files here that break the negative-space rule, and they are correct
  for 16-48px only. Above that, use the full mark.

ALSO IN THIS SET
  favicon-primary.ico / favicon-dark.ico
      Multi-resolution ICO (16/32/48/64/128/256) built from the favicon mark, padded
      square with transparency. Drop favicon-primary.ico at your web root.
  PNGs now include 16px and 48px alongside 1024/512/256/128/64/32.

SIZES AND CLEAR SPACE
  Full mark:    20px minimum width, 28px+ recommended.
  Favicon mark: 16-48px.
  Clear space:  12 units (10% of mark width) on all sides.

RASTERISING THESE YOURSELF
  Use a real browser engine (Chromium / resvg / Inkscape). cairosvg SILENTLY DROPS the
  <mask> element and will hand you a solid shield with no lighthouse in it, no warning.
