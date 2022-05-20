import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typiongs'

interface Props {
  collection: Collection[]
}

const Home = ({ collection }: Props) => {
  console.log(collection)

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-10 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-between">
        <h1 className="mb-10 text-4xl font-extralight">
          The{' '}
          <span className="font-extrabold underline decoration-pink-600">
            PAPAFAN
          </span>{' '}
          NFT Market Place
        </h1>
      </header>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="">
          {collection.map((collection) => {
            return (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                  <img
                    className="h-95 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="p-5">
                    <h2 className="text-3xl">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('this is getserversideprops')

  const query = `*[_type=="collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
    asset
  }, 
  previewImage{
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    address,
    slug{
    current
  }
  }
  }`

  const collection = await sanityClient.fetch(query)
  console.log(collection)

  return {
    props: {
      collection,
    },
  }
}
