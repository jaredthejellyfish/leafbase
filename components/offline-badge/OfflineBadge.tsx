"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles/OfflineBadge.module.css";
import { RiWifiOffLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const OfflineBadge = () => {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <AnimatePresence>
          <motion.div
            className={styles.offlineBadgeContainer}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <RiWifiOffLine size={28} />
            <div className={styles.offlineBadgeText}>
              <span className={styles.offlineBadgeTitle}>
                It looks like you are offline...
              </span>
              <span className={styles.offlineBadgeSubtitle}>
                Please check your connection and try again.
              </span>
            </div>
            <button
              className={styles.offlineBadgeButton}
              onClick={() => router.refresh()}
            >
              Retry
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default OfflineBadge;
