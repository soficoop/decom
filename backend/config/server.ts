export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", ""),
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: env.bool("CRON_ENABLED", false),
    tasks: {
      // every day at 4:00 AM
      '* * * * *': async ({ strapi }) => {
        let suggestions = []
        let start = 0
        do {
          suggestions = await strapi.entityService.findMany('api::suggestion.suggestion', { start, limit: 100 });
          start += 100;
          for (const suggestion of suggestions) {
            await strapi.entityService.update('api::suggestion.suggestion', suggestion.id, { data: {} });
          }
        } while (suggestions.length);
      },
    },
  }
});
