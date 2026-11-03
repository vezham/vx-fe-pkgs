# @vezham/tamizhi-ui

HeroUI React chat components for standalone and embedded Tamizhi. Includes composers, avatar assets, session state, and UI plugin slots.

See [Tamizhi architecture and usage](../README.md).

The standalone welcome screen reads task suggestions from each profile's
`suggestions` list in `vx.tamizhi.yaml`. Each item has a short `title` and the
`prompt` sent when selected (up to ten items per profile). Profiles without a
list inherit the default Tamizhi suggestions; an empty list hides them. Embedded
welcomes show two randomly selected suggestions from the host profile, above ComposerLite,
without a profile picker.

On the standalone welcome screen, task suggestions sit directly above the
bottom composer. Focusing the composer keeps them visible. The composer remains
mounted when a conversation starts, preserving draft, attachment, and voice state;
the existing avatar transition continues to track its composer perch.

Standalone welcomes randomly show up to three suggestions. Embedded welcomes
show up to two. Each welcome samples without replacement after hydration, so
prerendering stays consistent. The sample stays stable while typing and during
status updates, and refreshes when the profile changes or a new welcome opens.
