import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typiongs'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface Props {
  collection: Collection
}

function NFTDrop({ collection }: Props) {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-600 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* right */}
      <div className=" flex flex-1 flex-col p-12  lg:col-span-6">
        {/* header */}
        <header className="flex items-center justify-between">
          <Link href="/">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="decoration-pink-6 font-extrabold underline">
                PAPAFAN
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() => {
              address ? disconnect() : connectWithMetamask()
            }}
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You are logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* content */}
        <div className="felx-1 mt-10 flex flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="object w-80 object-cover pb-10 lg:h-48"
            src={urlFor(collection.mainImage).url()}
            alt="background"
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's Claimed</p>
        </div>
        {/* Mint button */}
        <button className="mt-10 h-10 w-full rounded-full bg-red-600 font-bold text-white">
          Mint NFT
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('this is getserversideprops')

  const query = `*[_type=="collection" && slug.current ==$id][0]{
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

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })
  console.log(collection)

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}

export default NFTDrop
