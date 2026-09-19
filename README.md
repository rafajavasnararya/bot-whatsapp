# Nararya Unified WhatsApp CS

Professional multi-brand WhatsApp customer-service automation for Nararya Garage, Nararya Studio, Hilekros Products, Nararya Store, and NEXOVONARSA Corporation.

## Features
- Human-style auto replies and intent routing.
- Approved-group workflow with admin confirmation before group/channel automation.
- 23:00 WIB group close and 05:00 WIB reopen for approved groups only.
- Purchase/order records and financial reporting.
- Excel/Word report generation hooks, separated per brand.
- Google Drive upsert/replace design, avoiding duplicate uploads.
- Payment receipt snapshot workflow with redacted internal summaries.
- AI image triage: likely AI-edited, likely manually edited, likely original, or undetermined. This is a signal, not proof of authorship.
- Privacy-by-design: sensitive identity and face documents are never placed in GitHub, WhatsApp logs, or public channels.
- C++ native SHA-256 utility, TypeScript/JavaScript, Python, CSS and SQL.
- Web dashboard with grey/blue visual direction.

## Important
This repository is source code only. Never commit production credentials, WhatsApp session files, customer identity documents, biometric images, raw payment proofs, Google service-account JSON, or production databases.

Footer used by automated customer messages:

PT NEXOVONARSACORPORATION - All Right Reserved

## Production note
WhatsApp group/channel administration depends on the connected WhatsApp provider and the account's permissions. This project deliberately separates provider adapters from business logic. It is not truthful to promise 100% production operation without provider credentials, permissions, and an end-to-end test on the actual account.
