export type Value = {
  key: string
  name: string
}

export function getValues(name: string = '') {
  const values = new Array<Value>()
  values.push({ key: 'none', name: '選択' })
  switch (name) {
    case '母乳':
      for (let i = 1; i <= 60; i++) {
        values.push({
          key: i.toString().concat('分'),
          name: i.toString().concat('分'),
        })
      }
      break
    case 'ミルク':
    case '搾乳':
      for (let i = 5; i <= 200; i += 5) {
        values.push({ key: i.toString(), name: i.toString() })
      }
      break
    case 'うんこ':
      values.push({ key: '小', name: '小' })
      values.push({ key: '中', name: '中' })
      values.push({ key: '大', name: '大' })
      values.push({ key: '特', name: '特' })
      break
    default:
      break
  }
  return {
    values,
  }
}
