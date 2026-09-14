## What it do?

Remove that awful "Upgrade" button from the Google Workspace suite. Right now only for Chrome.

Gmail specifically seems to be structured differently than other apps, so there are special cases for it. In order, the extension looks for and removes:

- an element with `aria-label="Upgrade"`
- a `div` with `data-pep-id="global-pep-gmail"`
- the parent `button` of a `span` containing the text `Upgrade` (if it falls back to this, there will be a blank space where the button used to be instead of the toolbar shifting over to the right to replace it)

## Installation

- Open Google Chrome and go to chrome://extensions/.
- Turn on Developer mode using the toggle switch in the top-right corner.
- Click the Load unpacked button in the top-left area.
- Select the folder containing your extension files. Visit any Google Workspace app (eg. `calendar.google.com`, `gmail.com`, `docs.google.com`) to test. You can open the console and see the element removed in the logs.
