import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMarketplace } from '@thirdweb-dev/react';
import NFTcard from './NFTcard';

const style = {
    wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:grid-cols-2 md:pt-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
}

const Listings = () => {
    const marketplace = useMarketplace("0x7cAfB16832c78d246a2607010A1cBe9AF537CbB9");
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const getListings = async () => {
            try {
                const list = await marketplace.getActiveListings()
    
                setListings(list);
            } catch (error) {
                console.log(error);
            }
        }
        getListings()
    },[marketplace])

  return (
    <div className={style.wrapper}>
        {listings.length > 0 ? (
            <>
            {listings?.map((listing, index) => (
                <Link 
                href={`/assets/${listing.assetContractAddress}/${listing.id}`} 
                key={index}
                >
                    <a>
                        <NFTcard listing={listing}/>
                    </a>
                </Link>
        
            ))}
            </>
        ) : (
            <div>Loading...</div>
        )
    }
    </div>
  )
}

export default Listings
