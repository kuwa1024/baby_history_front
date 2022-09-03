export type Name = {
  name: string
}

const names: Name[] = [
  { name: '母乳(右)' },
  { name: '母乳(左)' },
  { name: 'ミルク' },
  { name: '搾乳' },
  { name: 'おしっこ' },
  { name: 'うんこ' },
]

export function getNames() {
  return {
    names,
  }
}
