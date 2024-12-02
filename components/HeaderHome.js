import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

function HeaderHome() {
    const headerMenu = [
        {
            id: 1,
            name: 'Create a Ride',
            icon: '/taxi.png',
            route: '/createride',
        },
        {
            id: 2,
            name: 'View Rides',
            icon: '/delivery.png',
            route: '/viewride',
        },
    ];

    return (
        <div className="header">
            <div className="flex">
                <div className="p-5 pb-3 pl-10 w-full flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={'/'} passHref>
                            <Image src="/oldlogowhite.png" width={200} height={200} alt="logo" />
                        </Link>
                    </div>

                    {/* Header Menu */}
                    <div className="flex gap-6 ml-10">
                        {headerMenu.map((item) => (
                            <Link href={item.route} key={item.id} passHref>
                                <div className="flex gap-2 items-center cursor-pointer group">
                                    <Image src={item.icon} width={40} height={40} alt={item.name} />
                                    <span className="text-[22px] font-medium text-[#fff4ee] relative">
                                        {item.name}
                                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#fff4ee] transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* User Button */}
                    <div className="w-[100px] h-[100px] ml-auto">
                        <UserButton />
                    </div>
                </div>
            </div>
            <section className="flex m-4 gap-80">
                <div>
                    <p className="text-red-100 font-bold text-[60px] mt-20 left-12">Welcome to Ryde</p>
                    <p className="text-red-50 font-medium text-[30px] mt-10 left-5">Create and View the rides near you</p>
                    <Link href="/sign-in">
                        <button className="bg-[#800000] rounded-3xl text-white p-5 m-5 font-semibold hover:bg-orange-400 transition-all">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className="p-4">
                    <Image src={'/bannerbg.png'} width={500} height={500} alt={'headerimage'} />
                </div>
            </section>
        </div>
    );
}

export default HeaderHome;
