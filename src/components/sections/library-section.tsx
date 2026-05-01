'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Library, Loader2, Search, Sparkles } from 'lucide-react'
import { searchOpenLibrary, trendingOpenLibrary, type OpenLibraryBook } from '@/lib/api-client'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { truncateText } from '@/lib/utils'

const BOOK_SUBJECTS = ['technology', 'science', 'history', 'design', 'business'] as const

export default function LibrarySection() {
  const [subject, setSubject] = useState<string>(BOOK_SUBJECTS[0])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [books, setBooks] = useState<OpenLibraryBook[]>([])

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    setErrorMessage(null)

    void trendingOpenLibrary(subject)
      .then((items) => {
        if (!mounted) return
        setBooks(items)
      })
      .catch((err) => {
        if (!mounted) return
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load library')
      })
      .finally(() => {
        if (!mounted) return
        setIsLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [subject])

  const title = useMemo(
    () => (query.trim() ? `Search Results for "${query}"` : `Trending in ${subject}`),
    [query, subject],
  )

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const result = await searchOpenLibrary(query.trim(), 24)
      setBooks(result.results)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-5 p-4 md:p-6 pb-24 md:pb-6">
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="ios-widget ios-gradient-mesh p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Legacy Library Restored
            </p>
            <h2 className="mt-1 text-xl font-bold flex items-center gap-2">
              <Library className="w-5 h-5 text-honey" />
              Open Library Hub
            </h2>
          </div>
          <span className="ios-pill text-[10px]">
            <Sparkles className="w-3 h-3" />
            No Login Required
          </span>
        </div>
      </motion.section>

      <motion.form
        onSubmit={handleSearch}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.08 }}
        className="ios-widget p-3"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, authors, topics..."
              className="w-full h-11 rounded-xl bg-background/30 pl-10 pr-3 text-sm outline-none border border-white/10 focus:border-honey/40 transition-colors"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="h-11 px-4 rounded-xl bg-honey text-background text-sm font-semibold"
          >
            Search
          </motion.button>
        </div>
      </motion.form>

      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.14 }}
        className="ios-widget p-3"
      >
        <div className="flex flex-wrap gap-2">
          {BOOK_SUBJECTS.map((item) => (
            <motion.button
              key={item}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              onClick={() => {
                setQuery('')
                setSubject(item)
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                subject === item
                  ? 'bg-honey text-background'
                  : 'bg-background/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer(0.05)}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <div className="ios-section-header">
          <span className="ios-section-title">{title}</span>
          <span className="text-[11px] text-muted-foreground">{books.length} items</span>
        </div>

        {isLoading && (
          <div className="ios-widget p-5 text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading library...
          </div>
        )}

        {errorMessage && (
          <div className="ios-widget p-4 text-sm text-red-300 border border-red-500/30 bg-red-500/10">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && books.length === 0 && (
          <div className="ios-widget p-5 text-sm text-muted-foreground">
            No books found for this query.
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          books.map((book) => (
            <motion.article
              key={`${book.ol_key}-${book.title}`}
              variants={staggerItem}
              whileHover={{ y: -2 }}
              className="ios-widget p-3"
            >
              <div className="flex gap-3">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-[72px] h-[98px] rounded-lg object-cover border border-white/10 shrink-0"
                  />
                ) : (
                  <div className="w-[72px] h-[98px] rounded-lg bg-background/30 border border-white/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-tight">{truncateText(book.title, 88)}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{truncateText(book.author, 80)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {book.year && <span className="ios-pill text-[10px]">{book.year}</span>}
                    {book.pages && <span className="ios-pill text-[10px]">{book.pages} pages</span>}
                    {book.language && <span className="ios-pill text-[10px]">{book.language}</span>}
                  </div>

                  {book.read_url && (
                    <a
                      href={book.read_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-honey hover:text-honey-light transition-colors"
                    >
                      Open Book
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
      </motion.section>
    </div>
  )
}

