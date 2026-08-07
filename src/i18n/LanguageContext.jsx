import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_LANG,
  SUPPORTED_LANGS,
  translations,
} from './translations'

const STORAGE_KEY = 'silly-sally-lang'
const LanguageContext = createContext(null)

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key]
    return undefined
  }, obj)
}

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LANGS.includes(stored)) return stored
  } catch {
    /* ignore */
  }

  const browser = navigator.language?.slice(0, 2).toLowerCase()
  if (browser === 'es') return 'es'
  return DEFAULT_LANG
}

function interpolate(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (key, vars) => {
      const fromLang = getByPath(translations[lang], key)
      const fromFallback = getByPath(translations[DEFAULT_LANG], key)
      const value = fromLang ?? fromFallback ?? key
      if (typeof value !== 'string') return value ?? key
      return vars ? interpolate(value, vars) : value
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, t, languages: SUPPORTED_LANGS }),
    [lang, setLang, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}

/** Renders translation strings that may include simple <em>/<u> tags. */
export function T({ k, vars, as: Tag = 'span', className }) {
  const { t } = useLanguage()
  const html = t(k, vars)
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(html) }}
    />
  )
}

function sanitizeInlineHtml(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;em&gt;/g, '<em>')
    .replace(/&lt;\/em&gt;/g, '</em>')
    .replace(/&lt;u&gt;/g, '<u>')
    .replace(/&lt;\/u&gt;/g, '</u>')
}
