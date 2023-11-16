import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  pairing: {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
    image: null | string;
  };
};

function Pairing({ pairing }: Props) {
  const [body, setBody] = useState<string | null>(
    pairing.body || 'Hello world'
  );

  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function generate() {
      if (!pairing.body) {
        setGenerating(true);
        setBody('');

        // make a POST call to our api route
        const res = await fetch('/api/generate/short-pairing', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            strain1: pairing.strain1_id,
            strain2: pairing.strain2_id,
          }),
        });

        if (res.ok && res.body) {
          // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
          const reader = res.body.getReader();

          const processStream = async () => {
            while (true) {
              // .read() returns 2 properties
              const { done, value } = await reader.read();

              // if done is true
              if (done) {
                console.log('stream completed');
                setGenerating(false);
                break;
              }
              // value is a binary data in Uint8Array format, as Uint8Array is suitable data structure for binary data
              // we decode Uint8Array using TextDecoder
              let chunk = new TextDecoder('utf-8').decode(value);

              // chunk like this -> data: {"response":" sweet"}
              // we remove the 'data: ' from the chunk
              chunk = chunk.replace(/^data: /, '');

              // parse the chunk
              const parsed = JSON.parse(chunk) as { response: string };

              // append to the response
              setBody((prev) => prev + parsed.response);

              // Easy Peasy!! :)
            }
          };

          processStream().catch((err) => console.log('--stream error--', err));
        } else {
          alert(`error getting response`);
        }
      }
    }

    generate();
  }, [pairing.body, pairing.strain1_id, pairing.strain2_id]);

  if (!pairing.body) return null;

  return (
    <Link
      href={`/strain/`}
      className="flex flex-row items-center justify-between gap-3 border border-zinc-700 py-2 rounded"
    >
      <Image
        src={pairing.image || ''}
        alt={pairing.id || ''}
        width={90}
        height={90}
      />
      <p>{generating ? body : 'loading...'}</p>
    </Link>
  );
}

export default Pairing;
