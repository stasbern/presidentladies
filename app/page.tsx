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
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify',
      },
    })

    if (error) {
      console.log('Error signing in with Discord:', error)
    }
  }

  async function validate() {
    var valid = WAValidator.validate('bc1pxhzuj3frsugrvl75lafwscmpv8uv06htdr7vszzvtxqt0mnd08gqwapeaf', 'BTC');
    if (valid)
      console.log('This is a valid address');
    else
      console.log('Address INVALID');
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
      <div className={styles.topnavbar}>
        <h1 onClick={signOut}>Y'all'll be rugged</h1>
        {session ? (
          <>
            <h1>hello, {session.user.user_metadata.full_name}</h1>
            <button onClick={() => { signOut(); window.location.reload(); }}>Logout</button>
          </>
        ) : (
          <button onClick={signInWithDiscord}>Sign in with Discord</button>
        )}
      </div>
      <Device>
        {(rdd) => (
          <div className={`${styles.row} ${rdd.isMobile ? 'flex-col mt-10' : 'flex-row'}`}>
            <div className={`${styles.column} ${rdd.isMobile ? 'w-11/12' : 'w-5/12'}`}>
              <div className={styles.column}>
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
                      <Image src={"/img.png"} alt="cool image" width="256" height="256" />
                      <div className='flex flex-col'>
                        <div className="mr-4 py-2">fumar</div>
                        <div className="mr-4 py-2">seen:</div>
                        <div className="mr-4 py-2">6.9h ago</div>
                      </div>
                    </div>
                  )}
                </WindowHeader>
                <WindowHeader title="random info">
                  {(props) => (
                    <div className='backdrop-hue-rotate-90 backdrop-blur-sm border-2 p-2 text-white' style={{ backdropFilter: 'blur(4px)', borderWidth: '2px', padding: '1rem', borderColor: props.bgColor }}>
                      <h1 className='py-1'>do stuff on this page</h1>
                      <h1 className='py-1 flex flex-row'>gather <h1 className='text-purple-400'>&nbsp;points</h1></h1>
                      <h1 className='py-1'>gathered enough - get <h1 className='flex flex-row'> access to <h1 className='text-indigo-600'>&nbsp;discord</h1></h1></h1>
                      <h1 className='py-1 flex flex-row'><h1 className=' text-indigo-600'>discord</h1>&nbsp;access - OG</h1>
                      <h1 className='py-1 flex flex-row'>OG - <h1 className='text-yellow-400'>&nbsp;Free mint</h1></h1>
                    </div>
                  )}
                </WindowHeader>
              </div>
            </div>
            <div className={`${styles.column} ${rdd.isMobile ? 'w-11/12' : 'w-5/12'}`}>
              <WindowHeader title="Add your comment">
                {(props) => (
                  <div style={{ backdropFilter: 'blur(4px)', borderWidth: '2px', padding: '1rem', marginBottom: '1rem', borderColor: props.bgColor }}>
                    <form onSubmit={handleSubmit}>
                      <input
                        className="appearance-none w-full py-2 px-3 text-gray-700 border border-neutral-500 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={newBTCAddress}
                        onChange={(e) => setNewBTCAddress(e.target.value)}
                        placeholder="Enter your BTC address..."
                      />
                      <div className="flex">
                        <textarea
                          className="appearance-none w-full py-2 px-3 text-gray-700 border border-neutral-500 leading-tight focus:outline-none focus:shadow-outline"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Enter your comment..."
                          rows={3}
                        />
                        <button className="text-white border-neutral-500 border-2 px-4" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </WindowHeader>
              <WindowHeader title={`comments ${comments.length}`}>
                {(props) => (
                  <div>
                    {comments
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((comment) => (
                        <Comment
                          bg_color={props.bgColor}
                          key={comment.id}
                          id={comment.id}
                          discord_username={comment.discord_username}
                          content={comment.content}
                          created_at={comment.created_at}
                        />
                      ))}
                    <div className="flex justify-between mt-4">
                      <button
                        className={`text-white ${currentPage === 1 ? 'opacity-50' : ''}`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        &lt;
                      </button>
                      <span className="text-white">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className={`text-white ${currentPage === totalPages ? 'opacity-50' : ''}`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        &gt;
                      </button>
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