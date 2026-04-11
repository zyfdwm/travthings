import type { OpenNextConfig } from "@opennextjs/cloudflare";

// @ts-ignore - OpenNextConfig is incorrectly identified as a namespace in some environments
const config: OpenNextConfig = {
    default: {
        override: {
            wrapper: "cloudflare-node",
            converter: "edge",
            proxyExternalRequest: "fetch",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
    edgeExternals: ["node:crypto"],
    middleware: {
        external: true,
        override: {
            wrapper: "cloudflare-edge",
            converter: "edge",
            proxyExternalRequest: "fetch",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
};

export default config;