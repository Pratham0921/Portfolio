import { motion } from 'framer-motion'

export default function CustomAnimatedBg({ colors = ['#ff0080', '#7928ca', '#ff4d4d', '#f9cb28'] }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#050510]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['-20%', '10%', '-20%'],
          y: ['-10%', '20%', '-10%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[100px] opacity-40"
        style={{ backgroundImage: `radial-gradient(circle, ${colors[0]}, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ['20%', '-10%', '20%'],
          y: ['20%', '-10%', '20%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen blur-[120px] opacity-30"
        style={{ backgroundImage: `radial-gradient(circle, ${colors[1]}, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
          x: ['0%', '20%', '0%'],
          y: ['0%', '-20%', '0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen blur-[90px] opacity-40"
        style={{ backgroundImage: `radial-gradient(circle, ${colors[2]}, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ['-10%', '30%', '-10%'],
          y: ['20%', '0%', '20%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[10%] left-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-screen blur-[110px] opacity-30"
        style={{ backgroundImage: `radial-gradient(circle, ${colors[3]}, transparent 70%)` }}
      />
      
      {/* Overlay to grain/texture if wanted, making it look premium */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
