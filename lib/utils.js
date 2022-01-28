import axios from 'axios'

export const fetcher = async (url) => {
  return axios.get(url).then((res) => res.data)
}

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

export const isIT = (user) => {
  const { email } = user
  const emails = [
    'marta.fernandez@somenergia.coop',
    'david.riera@somenergia.coop',
    'benjami.ramos@somenergia.coop',
    'juanpe.sanchez@somenergia.coop',
    'joana.figueira@somenergia.coop',
    'pol.monso@somenergia.coop',
    'david.garcia@somenergia.coop',
    'alberto.rasillo@somenergia.coop',
    'david.suarez@somenergia.coop',
    'mar.jene@somenergia.coop',
    'oriol.piera@somenergia.coop',
    'francisco.cubero@somenergia.coop',
    'jordi.pons@somenergia.coop',
    'joan.sarola@somenergia.coop',
    'marite.guerrieri@somenergia.coop',
    'xavi.dolz@somenergia.coop',
    'israel.pino@somenergia.coop'
  ]

  return emails.includes(email)
}
