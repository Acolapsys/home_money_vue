import store from '../store'
import russian from '@/locales/russian.json'
import english from '@/locales/english.json'

const locales = {
    'russian': russian,
    'english': english
}

export default function localzeFilter(key) {
    const locale = store.getters.getInfo.locale || 'russian'
    return locales[locale][key] || `[Localize Error]: key '${key}' not found`


}