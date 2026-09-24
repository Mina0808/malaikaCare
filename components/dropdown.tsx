'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import TooltipComponent from './tooltip';

export default function Dropdown({ tooltipMsg, state, setState, menuName, itemList }: { tooltipMsg: string, state:{open:boolean, type:string}, setState:Function, menuName: string, itemList: { name: string, href: string }[] }) {
    const router = useRouter();

    const toggleDropdown = () => {
        if (state.open){
            setState({open:false, type:""})
        }
        else{
            setState({open:true, type:menuName})
        }
    };

    const closeDropdown = (href: string) => {
        setState({open:false, type:""})
        router.push(href)
    };

    return (
        <div className='z-20'>
            <div className="relative inline-block">
                <TooltipComponent msg={tooltipMsg}>
                    <button
                        type="button"
                        className="px-4 hover:border-b hover:border-5 hover:border-yellow-600 flex items-center p-5 text-gray-700 inline-flex items-center"
                        onClick={toggleDropdown}
                    >
                        {menuName}
                    </button>
                </TooltipComponent>

                {state.open && state.type==menuName && (
                    <div className="origin-top-right absolute left-1/2 transform -translate-x-1/2 w-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-5">
                        <ul
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                            className="grid grid-cols-1 gap-2"
                        >
                            {itemList.map((item, index) => (
                                <li key={index}>
                                    <button
                                        className="text-lg text-gray-900 hover:bg-gray-100 rounded-lg text-center flex flex-col items-center py-5 w-full"
                                        onClick={() => closeDropdown(item.href)}
                                    >
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}