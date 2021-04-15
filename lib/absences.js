import * as dayjs from 'dayjs'

export const HOLIDAYS_ABSENCE_TYPE = 2

export const countAbsencesType = (data, type = false) => {
  let count = 0
  data.forEach((absence) => {
    if (!type || absence?.absence_type === type) {
      count +=
        dayjs(absence.end_time).diff(dayjs(absence.start_time), 'days') + 1
    }
  })
  return count
}

export const countHolidays = (data) =>
  countAbsencesType(data, HOLIDAYS_ABSENCE_TYPE)

export const absenceTypeName = (types, typeId) => {
  const filtredAbsences =
    Array.isArray(types) && types.filter(({ id }) => id === typeId)
  return filtredAbsences?.[0]?.name
}

export const absenceTypeEmoji = (typeId) => {
  // 🏖 🧗‍♀️ 🎉 👩🏽‍🎓 🤧 😷 🤒 ⚰️ 💀 ⚫️ 📦
  switch (typeId) {
    case 2:
      return '🏖'
    default:
      return '🎉'
  }
}
