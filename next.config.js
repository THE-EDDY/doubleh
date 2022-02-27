// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const moduleExports = {
    env: {
        API: "https://admin.avamot.com/webapi",
        MOBILE_API: "https://admin.avamot.com/api",
        LIVEAPI: "https://admin.avamot.com/webapi",
        MAPS_API_KEY: "AIzaSyAu5yh7B9Tvgj1DDDfb9iWKEMLzt9rGLug",

    }
};

module.exports = moduleExports;