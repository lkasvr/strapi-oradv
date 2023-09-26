/**
 * sub-category controller
 */
import { Strapi, factories } from '@strapi/strapi'

import utils from '@strapi/utils';
const { ApplicationError } = utils.errors;

export default factories.createCoreController('api::sub-category.sub-category', ({ strapi }: { strapi: Strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    if (!data.displayName) data.displayName = data.name;

    const entry = await super.create(ctx);
    return entry;
  }
}));
