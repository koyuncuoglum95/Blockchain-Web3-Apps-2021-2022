import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: 's2tbkook',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skSAShioA1gfosXZegusi99rYnq85pHjI3XivNQsrzWoM9fNSp8V6Hf3y3JVxZlcMD6FKuEIzHfxYlJCE7DOfIewdrdJG1MWLZgXTMc5VwiwvFYoXzRQgkWgWguBqOQv4d0TiD5ghn2aZAZfnzlCEpaEWhEc29Axzr2lpYfpw0Yyv26Oif8P',
    useCdn: false,
})