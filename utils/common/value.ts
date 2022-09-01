export type Value = {
  name: string
}

export function getValues(name: string = '') {
  const values = new Array<Value>()
  switch (name) {
    case '母乳':
      for (let i = 1; i <= 60; i++) {
        values.push({ name: i.toString().concat('分') })
      }
      break
    case 'ミルク':
    case '搾乳':
      for (let i = 5; i <= 200; i += 5) {
        values.push({ name: i.toString() })
      }
      break
    case 'うんこ':
      values.push({ name: '小' })
      values.push({ name: '中' })
      values.push({ name: '大' })
      values.push({ name: '特' })
      break
    default:
      break
  }
  return {
    values,
  }
}
