
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.plugin('graphql').service('extension').use({
      typeDefs: `
        type Query {
          isPasswordValid(communityId: ID!, password: String!): Boolean!
        }
        `,
      resolvers: {
        Query: {
          isPasswordValid: async (obj, { communityId, password }) => {
            const community = await strapi.entityService.findOne('api::community.community', communityId);
            return community.password === password;
          },
        }
      },
      resolversConfig: {
        'Query.isPasswordValid': {
          auth: false,
        },
        'Query.suggestions': {
          middlewares: [
            async (next, parent, args, context, info) => {
              const communityId = args?.filters?.community?.id?.eq;
              return nextIfPasswordIsValid(communityId, context, strapi, next, parent, args, info);
            }
          ]
        },
        'Mutation.createSuggestion': {
          middlewares: [
            async (next, parent, args, context, info) => {
              const communityId = args?.data?.community;
              return nextIfPasswordIsValid(communityId, context, strapi, next, parent, args, info);
            }
          ]
        },
        'Mutation.updateSuggestion': {
          middlewares: [
            async (next, parent, args, context, info) => {
              const suggestion = await strapi.entityService.findOne('api::suggestion.suggestion', args.id, { populate: ['community'] });
              return nextIfPasswordIsValid(suggestion.community.id, context, strapi, next, parent, args, info);
            }
          ]
        },
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

async function nextIfPasswordIsValid(communityId, context, strapi, next, parent, args, info) {
  if (!communityId) {
    throw new Error('communityId is required');
  }
  const password = context.koaContext.headers.authorization?.split(' ')?.[1];
  const community = await strapi.entityService.findOne('api::community.community', communityId);
  if (community.requiresPassword && community.password !== password) {
    throw new Error('Invalid password');
  }
  return next(parent, args, context, info);
}

