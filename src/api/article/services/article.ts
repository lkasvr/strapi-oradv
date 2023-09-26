/**
 * article service
 */

import { Strapi, factories } from '@strapi/strapi';
import utils from '@strapi/utils';
const { ApplicationError, ValidationError } = utils.errors;

export default factories.createCoreService('api::article.article');
