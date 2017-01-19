const getBrowserLang = function () {
  const full = navigator.language || navigator.userLanguage
  const parts = full.split('-')
  return parts[0]
}

const getSavedLang = function () {
  return window.localStorage.wLang
}

const getUserLang = function (user) {
  if (!user) return
  if (!user.profile) return
  if (!user.profile.language) return
  return user.profile.language
}

export default function (user) {
  return getUserLang(user) || getSavedLang() || getBrowserLang()
}
