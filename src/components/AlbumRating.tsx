"use clien"

import { useState } from 'react';
import Cookies from 'js-cookie';

const AlbumRating = ({nota, id}: any) => {
  const [rating, setRating] = useState<number>(nota);
  const [hoverRating, setHoverRating] = useState<number>(0);

  async function setNota(valor: number) {
    const token = Cookies.get('token');

    setRating(valor);

    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    const res = await fetch('http://localhost:4000/api/user/album/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            "Access-Control-Allow-Origin": '*'
        },
        cache: 'no-store',
        body: JSON.stringify({nota: valor})
        
    })
    
  }
  

  return (
    <div className="text-center">
      <span className="flex flex-row-reverse">
        {Array.from({ length: 10 }, (_, index) => (
          <svg
            key={index}
            onClick={() => setNota(10 - index)}
            onMouseEnter={() => setHoverRating(10 - index)}
            onMouseLeave={() => setHoverRating(0)}
            className={`cursor-pointer duration-100 ${
              (rating >= 10 - index || hoverRating >= 10 - index)
                ? 'text-yellow-400'
                : 'text-gray-600'
            }`}
            width="23"
            height="23"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
        ))}
      </span>
    </div>
  );
};

export default AlbumRating;