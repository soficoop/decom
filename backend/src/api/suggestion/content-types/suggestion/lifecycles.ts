export default {
  async beforeUpdate(event) {
    const { createdAt, upvotes, downvotes } = await strapi.entityService.findOne('api::suggestion.suggestion', event.params.where.id);
    event.params.data.score = calculateScore(new Date(createdAt), event.params.data.upvotes || upvotes, event.params.data.downvotes || downvotes);
  },
  async beforeCreate(event) {
    event.params.data.score = calculateScore(new Date(), event.params.data.upvotes, event.params.data.downvotes);
  }
}

function calculateScore(createdAt: Date, upvotes: any, downvotes: any): any {
  const daysSinceCreation = (Date.now() - createdAt.getTime()) / 1000 / 60 / 60 / 24;
  const score = Math.exp(-0.005 * daysSinceCreation) / (1 + Math.exp(-0.05 * (upvotes - downvotes)));
  return score;
}
