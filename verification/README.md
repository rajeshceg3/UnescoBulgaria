# Gallery and detail regression

    NODE_PATH=/path/to/node_modules node verification/mobile.cjs

Needs Playwright and Chrome. `CHROME_PATH` overrides `/usr/bin/google-chrome`; `URL` uses a deployed site instead of starting a local server, `WIDTHS` defaults to `320,390,1280`, `REDUCED=1` checks reduced motion, and `SHOTS` sets the screenshot directory.

Tests all seven sites via phone cards and desktop orrery, loaded illustrations, complete title/story text, scrolling to official links and notes, local note persistence/status, inert background, keyboard activation, Escape, focus return/trapping, Back bounds and runtime errors. Notes created by this test live only in its disposable browser context. Save does not post anything.

The pre-existing `verification_script.py` captures desktop/mobile states but writes to a fixed `/home/jules/verification` folder and assumes a bundled browser. It is retained unchanged; the new suite checks the same states plus every site and the previously unreachable content.
