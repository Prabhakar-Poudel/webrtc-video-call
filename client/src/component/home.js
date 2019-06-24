import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Home() {
  

  const [chatId, setChatId] = useState(null)

  useEffect(() => {
    setChatId(prompt("Enter a chat id"));
  }, [])

  return (
    chatId ? (
      <Redirect to={{
        pathname: `/chat/${chatId}`
      }} />
    ) : (
    <div>
      Nothing here yet!
    </div>
  ));
}
