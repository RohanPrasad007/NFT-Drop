import { createCureentUserHook, createClient } from 'next-sanity'
import creatImageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uhulm6nb',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

export const urlFor = (source) => creatImageUrlBuilder(config).image(source)
