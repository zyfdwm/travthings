import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Extract the type from the helper function's return type to bypass namespace collision
type Config = ReturnType<typeof defineCloudflareConfig>;

const config = {
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
} satisfies Config;

export default config as Config;