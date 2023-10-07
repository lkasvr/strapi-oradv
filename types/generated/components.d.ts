import type { Schema, Attribute } from '@strapi/strapi';

export interface IconIcon extends Schema.Component {
  collectionName: 'components_icon_icons';
  info: {
    displayName: 'icon';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    lib: Attribute.String;
  };
}

export interface MetadataFormatDetection extends Schema.Component {
  collectionName: 'components_metadata_format_detections';
  info: {
    displayName: 'formatDetection';
  };
  attributes: {
    email: Attribute.String;
    address: Attribute.String;
    telephone: Attribute.String;
  };
}

export interface MetadataGoogleBot extends Schema.Component {
  collectionName: 'components_metadata_google_bots';
  info: {
    displayName: 'googleBot';
    description: '';
  };
  attributes: {
    index: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    follow: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    noimageindex: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    maxSnippet: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        max: 100;
      }> &
      Attribute.DefaultTo<55>;
  };
}

export interface MetadataImages extends Schema.Component {
  collectionName: 'components_metadata_images';
  info: {
    displayName: 'images';
  };
  attributes: {
    url: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    alt: Attribute.String;
  };
}

export interface MetadataMetadataObject extends Schema.Component {
  collectionName: 'components_metadata_metadata_objects';
  info: {
    displayName: 'Object';
    description: '';
  };
  attributes: {
    keywords: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    robots: Attribute.Component<'metadata.google-bot'> & Attribute.Required;
  };
}

export interface MetadataOpenGraph extends Schema.Component {
  collectionName: 'components_metadata_open_graphs';
  info: {
    displayName: 'openGraph';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    url: Attribute.String;
    siteName: Attribute.String;
    images: Attribute.Component<'metadata.images', true>;
    locale: Attribute.String;
    type: Attribute.String;
    publishedTime: Attribute.String;
    authors: Attribute.String;
  };
}

export interface MetadataRobots extends Schema.Component {
  collectionName: 'components_metadata_robots';
  info: {
    displayName: 'robots';
  };
  attributes: {
    index: Attribute.Boolean & Attribute.Required;
    follow: Attribute.Boolean & Attribute.Required;
    nocache: Attribute.Boolean & Attribute.Required;
    googleBot: Attribute.Component<'metadata.google-bot'>;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'icon.icon': IconIcon;
      'metadata.format-detection': MetadataFormatDetection;
      'metadata.google-bot': MetadataGoogleBot;
      'metadata.images': MetadataImages;
      'metadata.metadata-object': MetadataMetadataObject;
      'metadata.open-graph': MetadataOpenGraph;
      'metadata.robots': MetadataRobots;
    }
  }
}
