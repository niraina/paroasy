import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#ffe009] dark:bg-[#22364f] pt-5'>
        <div className="container">
            <div className="flex justify-between items-center py-5">
                <Link href="/" className='dark:text-[#ffe009] text-[#22364f]'>Diocèse de Tolagnaro</Link>
                <p className='dark:text-[#ffe009] text-[#22364f]'>Copyright © Diocèse de Tolagnaro - Tous droits réservés</p>
            </div>
        </div>
    </div>
  )
}

export default Footer