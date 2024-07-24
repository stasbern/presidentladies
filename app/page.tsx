"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import styles from './global.module.css'
import '../styles/global.css'
import { WindowHeader } from '../components/WindowHeader';
import Device from '../components/Device'
import { Session, User } from '@supabase/supabase-js';
var WAValidator = require('multicoin-address-validator');
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr';

export default function Infoboard() {
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
        <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={"https://magiceden.io/ordinals/marketplace/trumpladies"}>magic eden</Link>
        </div>
      </div>

      <WindowHeader title=''>
        {(props) => (
          <div className="backdrop-hue-rotate-30 p-4 text-white text-3xl text-center">
            WOLLET CHEKAR SOON...
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