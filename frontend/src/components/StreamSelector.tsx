import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const streams = [
  { id: 'engineering', name: 'Engineering' },
  { id: 'bba', name: 'BBA' },
  { id: 'bca', name: 'BCA' },
  { id: 'mba', name: 'MBA' },
  { id: 'law', name: 'Law' },
  { id: 'medical', name: 'Medical' },
  { id: 'design', name: 'Design' },
];

interface StreamSelectorProps {
  onSelectStream: (stream: string) => void;
}

export default function StreamSelector({ onSelectStream }: StreamSelectorProps) {
  return (
    <div className="bg-gradient-to-tr from-red-500/10 via-amber-500/5 to-rose-500/10 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden mb-12 border border-red-100/50">
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 -right-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative text-center max-w-3xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-3xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-red-500 animate-spin" style={{ animationDuration: '4s' }} />
          Discover Indore&apos;s Finest
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-gray-900"
        >
          Are you looking for?
        </motion.h2>
        <p className="mt-4 text-sm sm:text-base text-gray-600">
          Pick a course to see matching colleges, then compare fees and details.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {streams.map((stream, index) => (
          <motion.a
            id={`stream-box-${stream.id}`}
            key={stream.id}
            href={`/explore/${stream.id}`}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={event => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onSelectStream(stream.id);
            }}
            className="flex items-center justify-center p-6 bg-white border border-gray-100 hover:bg-red-50/30 hover:border-red-200 rounded-2xl transition cursor-pointer text-center group h-28 shadow-xs hover:shadow-md"
          >
            <span className="text-sm font-extrabold tracking-wider uppercase text-gray-800 group-hover:text-red-600 transition duration-200">
              {stream.name}
            </span>
          </motion.a>
        ))}
      </div>

      <p className="relative mt-6 text-center text-xs sm:text-sm text-gray-600">
        Tip: Check course options, yearly fees and campus location before you shortlist.
      </p>
    </div>
  );
}
