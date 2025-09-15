'use client'

import { motion } from 'framer-motion'

interface HeroAnimationsProps {
  type?: 'floating' | 'scroll'
}

export function HeroAnimations({ type = 'floating' }: HeroAnimationsProps) {
  if (type === 'scroll') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Best Seller Badge */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 bg-accent text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg"
      >
        Best Seller
      </motion.div>
      
      {/* Free Shipping Badge */}
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -2, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-4 -left-4 bg-background border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
      >
        Free Shipping
      </motion.div>
    </>
  )
}
