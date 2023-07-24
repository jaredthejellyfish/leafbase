import React, { useState } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { nearbyDispensary } from '@/types/interfaces';
import Link from 'next/link';

type Props = { dispensary: nearbyDispensary };

const DispensaryTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const dispensary = props.dispensary;

  const tableVariants = {
    closed: {
      opacity: 0,
      height: 0,
      display: 'none',
      transition: {
        display: {
          delay: 0.25,
        },
      },
    },
    open: {
      opacity: 1,
      display: 'block',
      height: 'auto',
      transition: {
        height: {
          afterAll: true,
        },
      },
    },
  };

  const buttonVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    },
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-2 flex flex-col">
      <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-zinc-800 dark:text-gray-400">
        <tr className="flex flex-row justify-between items-center">
          <th scope="col" className="px-6 py-3 w-2/3">
            <Link href={`/dispensaries/${dispensary.slug}`}>
              {dispensary.name}
            </Link>
          </th>
          {dispensary.menus.length > 0 && (
            <motion.th
              variants={buttonVariants}
              initial="closed"
              className="flex items-center mr-2 justify-center"
              animate={open ? 'open' : 'closed'}
              onClick={() => setOpen(!open)}
            >
              <RxCaretDown size={20} />
            </motion.th>
          )}
        </tr>
      </thead>

      <motion.tbody
        variants={tableVariants}
        initial={'closed'}
        animate={open ? 'open' : 'closed'}
        className="w-full"
      >
        {dispensary.menus.length > 0 &&
          dispensary.menus[0].strains.map((strain) => (
            <tr
              key={strain.id}
              className="bg-white border-b dark:bg-zinc-800/20 dark:border-zinc-700 flex items-center justify-center"
            >
              <th
                scope="row"
                className="px-6 py-2 w-full font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {strain.name}
              </th>

              <span className="flex w-28 flex-row mr-4 flex items-center justify-end">
                {dispensary.menus[0]?.prices?.filter(
                  (price) => price.strainId === strain.id
                )[0]?.price && (
                  <>
                    <p>
                      {
                        dispensary.menus[0].prices.filter(
                          (price) => price.strainId === strain.id
                        )[0].price
                      }
                    </p>
                    <p>€ / g</p>
                  </>
                )}
              </span>
            </tr>
          ))}
      </motion.tbody>
    </table>
  );
};

export default DispensaryTable;
