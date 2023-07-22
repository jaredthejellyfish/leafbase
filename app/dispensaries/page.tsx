import React from 'react';
import 'react-phone-number-input/style.css';
import Link from 'next/link';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const Dispensaries = () => {
  return <Link href={"/dispensaries/1up"}>1 UP</Link>;
};

export default Dispensaries;
