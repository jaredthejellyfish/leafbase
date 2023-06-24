"use client";

import React, { useEffect } from "react";
import { hotjar } from "react-hotjar";

type Props = {};

const Hotjar = (props: Props) => {
  useEffect(() => {
    hotjar.initialize(3547434, 6);
  }, []);
  return null;
};

export default Hotjar;
