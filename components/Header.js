import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

function Header() {
    const headerMenu = [
        {
            id: 1,
            name: 'Create a Ride',
            icon: '/taxi.png',
            route: '/createride'
        },
        {
            id: 2,
            name: 'View Rides',
            icon: '/delivery.png',
            route: '/viewride'
        }
    ];

    return (
        <div className='flex bg-[#800000]'>
            <div className='p-5 pb-3 pl-10 border-b-[4px] border-[#ac6e6d] w-full flex items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center'>
                    <Link href='/' passHref>
                        <Image src='/oldlogowhite.png' width={140} height={140} alt='logo' />
                    </Link>
                </div>

                {/* Header Menu */}
                <div className="flex gap-6 ml-10 flex-wrap">
                    {headerMenu.map((item) => (
                        <Link href={item.route} key={item.id} passHref aria-label={`Navigate to ${item.name}`}>
                            <div className="flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform duration-300">
                                <Image src={item.icon} width={40} height={40} alt={item.name} />
                                <span className="text-[18px] font-medium text-[#fff4ee] hover:text-orange-400">{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* User Button */}
                <div className="ml-auto flex items-center">
                    <UserButton className="w-10 h-10 md:w-12 md:h-12" />
                </div>
            </div>
        </div>
    );
}

export default Header;
