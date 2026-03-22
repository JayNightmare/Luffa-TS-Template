# Auth Notes

## Current state

The template currently demonstrates a basic user info retrieval flow in app and index page logic.

## Known limitations

- The sample uses older user-info style APIs that may not be ideal for modern production apps.
- Consent and denied-permission states are simplified.

## Migration direction

Planned improvement path:

1. Introduce service layer modules for auth and user profile handling.
1. Move permission and profile logic out of page files.
1. Add explicit loading, denied, and fallback UI states.
1. Add tests for service behavior.

## Practical recommendation

Use the current logic as a scaffold only, then implement product-specific auth requirements before release.
