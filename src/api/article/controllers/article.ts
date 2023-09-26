/**
 * article controller
 */
import { Strapi, factories } from '@strapi/strapi'
import utils from '@strapi/utils';
const { ApplicationError, ValidationError } = utils.errors;

export default factories.createCoreController('api::article.article', ({ strapi }: { strapi: Strapi }) => ({
  async create(ctx) {
    const { category, metadata } = ctx.request.body;

    const transaction: any = await strapi.db.connection.transaction();
    console.log(category);

    try {
      if (category) {
        if (!category.data?.name) throw new ValidationError('name must be defined')
        if (!category.data?.display_name) category.data.display_name = category.data.name;

        const newCategoy = await transaction('categories').insert(category.data, '*');
        if (!newCategoy[0].id) throw new ApplicationError('operation failed');
        ctx.request.body.data.categories = { connect: [newCategoy[0].id] };
      }

      const newArticleMetadata = await transaction('articles_metadata').insert(metadata.data, '*');
      if (!newArticleMetadata[0].id) throw new ApplicationError('operation failed');
      ctx.request.body.data['article_metada'] = { connect: [newArticleMetadata[0].id] };

      await transaction.commit();
      const entry = await super.create(ctx);

      return entry;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      ctx.response.body = new ApplicationError(error.message);
      ctx.response.status = 400;
      return ctx;
    }
  }
}));
