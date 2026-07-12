export const MALE_NAMES = [
  'Erik', 'Karl', 'Lars', 'Anders', 'Johan', 'Per', 'Nils', 'Gustav',
  'Olof', 'Axel', 'Hugo', 'Elias', 'Oscar', 'Viktor', 'Emil', 'Ludvig',
  'Arvid', 'Filip', 'Leo', 'Alfred', 'Sixten', 'Melker', 'Måns', 'Björn',
  'Sven', 'Bengt', 'Göran', 'Henrik', 'Magnus', 'Mattias', 'Mikael',
  'Fredrik', 'Tobias', 'Rasmus', 'Linus', 'Simon', 'Anton', 'Jesper',
  'Niklas', 'Kevin',
]

export const FEMALE_NAMES = [
  'Anna', 'Eva', 'Maria', 'Karin', 'Sara', 'Emma', 'Elin', 'Astrid',
  'Ebba', 'Wilma', 'Alice', 'Maja', 'Elsa', 'Julia', 'Linnéa', 'Alva',
  'Klara', 'Stina', 'Agnes', 'Signe', 'Ingrid', 'Greta', 'Saga', 'Tuva',
  'Lova', 'Vera', 'Selma', 'Hedda', 'Majken', 'Lena', 'Sofia', 'Hanna',
  'Frida', 'Matilda', 'Moa', 'Nellie', 'Ellen', 'Ida', 'Amanda', 'Felicia',
]

export function randomName(gender) {
  const list = gender === 'man' ? MALE_NAMES : FEMALE_NAMES
  return list[Math.floor(Math.random() * list.length)]
}
