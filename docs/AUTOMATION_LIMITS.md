# Automation limits
The application automates only actions exposed by the connected WhatsApp provider/library and the permissions granted to the account.

Purchase screenshot publishing is implemented as an event hook, not as a promise that every WhatsApp environment exposes a native screenshot API. The safe design is: confirmed purchase -> generate/store receipt image -> publish through the supported channel adapter.

WhatsApp OTP codes are never intercepted or stored. Use Linked Devices/QR for bot pairing.

AI image provenance is advisory only. It cannot reliably prove original/manual/AI editing from an image alone.