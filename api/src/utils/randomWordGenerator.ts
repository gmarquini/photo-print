export function randomWordGenerator() {
  const wordList = [
    'Livro',
    'Casa',
    'Carro',
    'Árvore',
    'Computador',
    'Janela',
    'Estudante',
    'Professor',
    'Fotografia',
    'Maçã',
    'Função',
    'Objeto',
    'Lista',
    'Elemento',
    'Contente',
    'Mensagem',
    'Besouro',
    'Melancia',
    'Relógio',
    'Couve-flor',
  ];

  return wordList[Math.floor(Math.random() * wordList.length)];
}
