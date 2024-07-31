"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import styles from './global.module.css'
import '../styles/global.css'
import { WindowHeader } from '../components/WindowHeader';
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr';

export default function Infoboard() {
  const [Message, setMSG] = useState(<p className="sm:text-xl text-lg text-white">Paste Your Address</p>);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: fcfsData, error: fcfsError } = useSWR('/lists/FCFS.json', fetcher);
  const { data: gtdData, error: gtdError } = useSWR('/lists/GTD.json', fetcher);

  const isAddressInList = (list: string[] | undefined, address: string) => {
    let lowerList = list?.map(acc => acc.toLowerCase()) ?? [];
    let lowerAddress = address.toLowerCase();
    return lowerList.includes(lowerAddress);
  };

  const HandleCheck = (addr: string) => {
    if (typeof addr !== 'string' || addr.length === 0) {
      setMSG(<p className="sm:text-xl text-lg text-white">Paste Your Address</p>);
      return;
    }

    if (addr.length < 42) {
      setMSG(<p className="sm:text-xl text-lg text-orange-500">Not a valid address</p>);
      return;
    }

    let useradd = addr.toLowerCase();

    if (isAddressInList(gtdData, useradd)) {
      setMSG(<p className="sm:text-xl text-lg">GTD</p>);
    } else if (isAddressInList(fcfsData, useradd)) {
      setMSG(<p className="sm:text-xl text-lg">FCFS</p>);
    } else {
      setMSG(<p className="sm:text-xl text-lg">NOT IN WL</p>);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <div className='mt-10'></div>
      <WindowHeader title="President Lady Maker — ゆっくりしていってね!">
        {(props) => (
          <div className="backdrop-hue-rotate-30 p-4 text-white">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <div className="md:pl-4">
                <p className="mb-4">
                We r de fckn movement of crypto degens! U can join us only if u have less than 20 IQ score and more than 5k$ at ur BTC balance. One more Milady deriv? Ya probably, but who tf cares if it’s good art and vibes right? Join us and don’t be a pu**y!
                </p>
              </div>
            </div>
          </div>
        )}
      </WindowHeader>

      <div className='flex justify-center text-blue mt-4 gap-10'>
        <div className='w-full flex justify-center'>
        <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={"https://x.com/presidentladies"}>twitter</Link>
        </div>
        <div className='w-full flex justify-center'>
        <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={"https://magiceden.io/ordinals/launchpad/presidentladies"}>mint</Link>
        </div>
        <div className='w-full flex justify-center'>
        <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={"https://magiceden.io/ordinals/marketplace/presidentladies"}>magic eden</Link>
        </div>
      </div>

      <WindowHeader title='Wallet Checker'>
                {(props) => (
                  <div
                    className="flex flex-col backdrop-blur-sm border-2 p-2 text-white h-full"
                    style={{
                      backdropFilter: "blur(4px)",
                      borderWidth: "2px",
                      padding: "1rem",
                      borderColor: props.bgColor,
                      wordWrap: 'break-word'
                    }}
                  >
                    <div className="flex-grow flex flex-col space-y-5 justify-center items-center">
                      <input
                        className="w-full text-black p-3 focus:outline-2 focus:outline-slate-400 caret-slate-500"
                        type="text"
                        placeholder="Paste Your Address to check"
                        onChange={(e) => {
                          e.preventDefault();
                          HandleCheck(e.target.value);
                        }}
                      />
                      {Message}
                    </div>
                  </div>
                )}
              </WindowHeader>

      <div className='flex flex-wrap justify-center gap-10'>
        <WindowHeader title=" ">
          {(props) => (
            <div className="flex justify-center items-center p-4">
              <Image src="/giph1.gif" alt="nfts" width={300} height={300} className="rounded-lg" />
            </div>
          )}
        </WindowHeader>

        <WindowHeader title=" ">
          {(props) => (
            <div className="flex justify-center items-center p-4">
              <Image src="/giph2.gif" alt="nfts" width={300} height={300} className="rounded-lg" />
            </div>
          )}
        </WindowHeader>
      </div>
    </div>
  );
}