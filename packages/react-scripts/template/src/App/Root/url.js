
const isProduction = window.location.hostname.includes('orionsoft.io')
const baseURL = isProduction ? 'http://api.orionsoft.io' : `http://${window.location.hostname}:3000`

export default baseURL
