"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client';
import styles from './global.module.css'
import '../styles/global.css'
import { WindowHeader } from '../components/WindowHeader';
import { Comment } from '../components/Comment';
import Device from '../components/Device'
import { Session, User } from '@supabase/supabase-js';
var WAValidator = require('multicoin-address-validator');
import Image from 'next/image'

export default function Infoboard() {
  const [comments, setComments] = useState<{ id: string; content: string; discord_username: string; created_at: string, btc_address: string }[]>([])
  const [newComment, setNewComment] = useState('')
  const [newBTCAddress, setNewBTCAddress] = useState('');
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}`,
        scopes: 'identify',
      },
    })

    if (error) {
      console.log('Error signing in with Discord:', error)
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  useEffect(() => {
    const getSessionFromCookie = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Error getting session from cookie:', sessionError)
      } else {
        setSession(sessionData.session)
      }
    }

    getSessionFromCookie()
  }, [])

  useEffect(() => {
    async function fetchComments() {
      const { data, count } = await supabase
        .from('comments')
        .select('*', { count: 'estimated' })
        .order('created_at', { ascending: false })

      setComments(data as any)

      if (count !== null) {
        setTotalPages(Math.ceil(count / 10)) // Assuming you want to display 10 comments per page
      }
    }
    fetchComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WAValidator.validate(newBTCAddress, 'BTC')) {
      alert('The BTC address is not valid.');
      return;
    }

    if (newComment.length > 200) {
      alert('Comment should be up to 200 symbols');
      return;
    }

    if (newComment.length < 201 && newComment.trim() && session?.user?.user_metadata?.full_name) {
      const commentData = {
        content: newComment,
        discord_username: session.user.user_metadata.full_name,
        btc_address: newBTCAddress,
      };

      const { data, error } = await supabase.from('comments').insert([commentData]);
      if (error) {
        console.error('Error inserting comment:', error);
      } else {
        setComments(data ? [...data, ...comments] : [...comments]);
        setNewComment('');
        setNewBTCAddress('');
      }
    } else {
      alert('You must be signed in to submit comments.');
    }
  };


  return (
    <div>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <div className={styles.topnavbar}>
        <h1>ready to become epic?</h1>
      </div>
      <Device>
        {(rdd) => (
          <div className='flex justify-center'>
            <div className={`${rdd.isMobile ? 'py-20 w-4/5' : 'py-20 w-1/2'}`}>
              <WindowHeader title="Epic collection">
                {(props) => (
                  <div
                    className="flex flex-row backdrop-hue-rotate-90 backdrop-blur-sm border-2 p-2 text-white"
                    style={{
                      backdropFilter: "blur(4px)",
                      borderWidth: "2px",
                      padding: "1rem",
                      borderColor: props.bgColor,
                      wordWrap: 'break-word'
                    }}
                  >
                    <div style={{ width: "50%" }}> {/* Adjusted from 75% to 50% */}
                      <Image src={"/img.png"} alt="cool image" width="256" height="256" />
                    </div>
                    <div className='flex flex-col justify-center' style={{ width: "50%" }}> {/* Explicitly set to 50% */}
                      <div className="mr-4 py-2 text-center">Coming soon &nbsp;...</div>
                    </div>
                  </div>
                )}
              </WindowHeader>
            </div>
          </div>
        )}
      </Device>
    </div>
  );
} 