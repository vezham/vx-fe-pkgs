# Tamizhi compatibility exports

Implementation now lives in `packages/tamizhi/{ui,client,contracts,core}`.
Use `@vezham/tamizhi-ui` and `@vezham/tamizhi-contracts` for new consumers.
The previous `@vezham/react/tamizhi/ui` and `/contracts` entrypoints forward to these packages for compatibility.

AppLayout supplies the embedded session above responsive panel mounts and accepts `tamizhi={{ client }}` for a backend connection. The original assistant panel remains available for comparison.

See [Tamizhi architecture and integration](../../../../../tamizhi/README.md).
