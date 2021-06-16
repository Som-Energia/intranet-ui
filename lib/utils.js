import axios from 'axios'

export const fetch = async (url) => {
  return axios.get(url).then((res) => res.data)
}

export const fetchWithToken = async (url, token) => {
  return axios
    .get(url, { headers: { Authorization: 'JWT ' + token } })
    .then((res) => res.data)
}

export const welcomeMessage = () => {
  const date = new Date()
  return date.getHours() <= 14
    ? date.getHours() > 5
      ? 'Bon dia'
      : 'Bona nit'
    : date.getHours() <= 20
    ? 'Bona tarda'
    : 'Bona nit'
}

export const slugify = (str = '') => {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
