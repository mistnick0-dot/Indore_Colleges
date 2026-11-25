import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const streams = [
  {
    id: 'engineering',
    name: 'Engineering',
    cardClasses: 'from-blue-50 via-indigo-50/90 to-blue-100/80 border-blue-200/90 text-blue-900 shadow-blue-500/10 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 hover:border-blue-600 hover:text-white hover:shadow-blue-500/35',
    dotClasses: 'bg-blue-600 group-hover:bg-white',
  },
  {
    id: 'bba',
    name: 'BBA',
    cardClasses: 'from-emerald-50 via-teal-50/90 to-emerald-100/80 border-emerald-200/90 text-emerald-900 shadow-emerald-500/10 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 hover:border-emerald-600 hover:text-white hover:shadow-emerald-500/35',
    dotClasses: 'bg-emerald-600 group-hover:bg-white',
  },
  {
    id: 'mba',
    name: 'MBA',
    cardClasses: 'from-rose-50 via-red-50/90 to-rose-100/80 border-rose-200/90 text-rose-900 shadow-rose-500/10 hover:from-rose-600 hover:via-red-600 hover:to-rose-700 hover:border-rose-600 hover:text-white hover:shadow-rose-500/35',
    dotClasses: 'bg-rose-600 group-hover:bg-white',
  },
  {
    id: 'bca',
    name: 'BCA',
    cardClasses: 'from-violet-50 via-purple-50/90 to-violet-100/80 border-violet-200/90 text-violet-900 shadow-violet-500/10 hover:from-violet-600 hover:via-purple-600 hover:to-violet-700 hover:border-violet-600 hover:text-white hover:shadow-violet-500/35',
    dotClasses: 'bg-violet-600 group-hover:bg-white',
  },
  {
    id: 'mca',
    name: 'MCA',
    cardClasses: 'from-cyan-50 via-sky-50/90 to-cyan-100/80 border-cyan-200/90 text-cyan-900 shadow-cyan-500/10 hover:from-cyan-600 hover:via-sky-600 hover:to-cyan-700 hover:border-cyan-600 hover:text-white hover:shadow-cyan-500/35',
    dotClasses: 'bg-cyan-600 group-hover:bg-white',
  },
  {
    id: 'paramedical',
    name: 'Paramedical',
    cardClasses: 'from-teal-50 via-emerald-50/90 to-teal-100/80 border-teal-200/90 text-teal-900 shadow-teal-500/10 hover:from-teal-600 hover:via-emerald-600 hover:to-teal-700 hover:border-teal-600 hover:text-white hover:shadow-teal-500/35',
    dotClasses: 'bg-teal-600 group-hover:bg-white',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    cardClasses: 'from-pink-50 via-rose-50/90 to-pink-100/80 border-pink-200/90 text-pink-900 shadow-pink-500/10 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 hover:border-pink-600 hover:text-white hover:shadow-pink-500/35',
    dotClasses: 'bg-pink-600 group-hover:bg-white',
  },
  {
    id: 'bcom',
    name: 'B.Com.',
    cardClasses: 'from-amber-50 via-orange-50/90 to-amber-100/80 border-amber-200/90 text-amber-900 shadow-amber-500/10 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 hover:border-amber-500 hover:text-white hover:shadow-amber-500/35',
    dotClasses: 'bg-amber-600 group-hover:bg-white',
  },
  {
    id: 'bsc',
    name: 'B.Sc.',
    cardClasses: 'from-indigo-50 via-blue-50/90 to-indigo-100/80 border-indigo-200/90 text-indigo-900 shadow-indigo-500/10 hover:from-indigo-600 hover:via-blue-600 hover:to-indigo-700 hover:border-indigo-600 hover:text-white hover:shadow-indigo-500/35',
    dotClasses: 'bg-indigo-600 group-hover:bg-white',
  },
  {
    id: 'design',
    name: 'Design',
    cardClasses: 'from-fuchsia-50 via-pink-50/90 to-fuchsia-100/80 border-fuchsia-200/90 text-fuchsia-900 shadow-fuchsia-500/10 hover:from-fuchsia-600 hover:via-pink-600 hover:to-fuchsia-700 hover:border-fuchsia-600 hover:text-white hover:shadow-fuchsia-500/35',
    dotClasses: 'bg-fuchsia-600 group-hover:bg-white',
  },
  {
    id: 'law',
    name: 'Law',
    cardClasses: 'from-red-50 via-orange-50/90 to-red-100/80 border-red-200/90 text-red-900 shadow-red-500/10 hover:from-red-600 hover:via-orange-600 hover:to-red-700 hover:border-red-600 hover:text-white hover:shadow-red-500/35',
    dotClasses: 'bg-red-600 group-hover:bg-white',
  },
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
      </div>

      <div className="relative flex flex-wrap justify-center gap-3 sm:gap-3.5 max-w-5xl mx-auto">
        {streams.map((stream, index) => (
          <motion.a
            id={`stream-box-${stream.id}`}
            key={stream.id}
            href={`/explore/${stream.id}`}
            initial={false}
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 3 + (index % 4) * 0.45,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.14,
            }}
            whileHover={{ scale: 1.07, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={event => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onSelectStream(stream.id);
            }}
            className={`relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 h-14 sm:h-15 min-w-[132px] sm:min-w-[148px] bg-gradient-to-br border rounded-2xl transition-all duration-300 cursor-pointer text-center group shadow-sm hover:shadow-lg ${stream.cardClasses}`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
            <span
              aria-hidden="true"
              className={`relative z-10 h-2.5 w-2.5 rounded-full shrink-0 animate-pulse transition-colors duration-300 ${stream.dotClasses}`}
            />
            <span className="relative z-10 text-base sm:text-lg font-black tracking-wide uppercase transition-colors duration-200">
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
