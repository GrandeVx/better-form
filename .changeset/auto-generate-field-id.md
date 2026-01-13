---
"@better_form/core": minor
---

Auto-generate field ID from name

- Fields now automatically get their `id` set from `name` if not explicitly provided
- Improves DX by allowing users to only specify `name` in field configuration
- Fix: Handle title object in metadata to prevent [object Object] display
