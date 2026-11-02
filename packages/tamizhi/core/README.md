# TypeScript runtime prototype

This package preserves the earlier Cordis/TanStack AI implementation and its comparison tests. The production Tamizhi backend is now Go in the sibling `vx-be-kit-lab` workspace. Static frontend applications use `@vezham/tamizhi-client` and must not import this package.

See [the Tamizhi package guide](../README.md) for the current integration.

Local example data defaults to `.vezham/tamizhi/data`, relative to the working directory. Set `TAMIZHI_DATA_DIRECTORY` to override it.
