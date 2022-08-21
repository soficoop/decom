
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.plugin('graphql').service('extension').use({
      resolversConfig: {
        'Query.suggestions': {
          middlewares: [
            async (next, parent, args, context, info) => {
              const password = context.koaContext.headers['x-password'];
              if (!password) {
                throw new Error('No password provided');
              }
              const suggestions = await next(parent, args, context, info);
              suggestions.nodes = suggestions.nodes.filter(suggestion => suggestion.community.password === password);
              return suggestions;
            }
          ]
        }
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};
