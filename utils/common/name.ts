export type Name = {
  name: string
}

const names: Name[] = [
  { name: '母乳' },
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
