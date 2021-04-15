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
