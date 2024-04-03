import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

test('Verifica che il componente Welcome sia renderizzato correttamente', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/Welcome to My Bookstore/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('Verifica che vengano renderizzate tante cards bootstrap quanti sono i libri nel file json', () => {
  const { getAllByTestId } = render(<App />);
  const bookCards = getAllByTestId('book-card');
  expect(bookCards.length).toBe(150); // 150 sono i libri presenti in fantasy.json
});

test('Verifica che CommentArea sia rendereizzato correttamente', () => {
  const { getByTestId } = render(<App />);
  const commentArea = getByTestId('comment-area');
  expect(commentArea).toBeInTheDocument();
});

test('Verifica il filtraggio dei libri tramite navbar', () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  const navbarItem = getByTestId('navbar-fantasy'); 
  fireEvent.click(navbarItem);
  const fantasyBookCards = getAllByTestId('book-card');
  fantasyBookCards.forEach (card => {
    const category = card.getAttribute("data-category");
    expect(category).toBe("fantasy"); // verifica se la categoria del libro è fantasy
  });
});

test('Verifica il bordo del libro', () => {
  const { getAllByTestId } = render(<App />);
  const bookCards = getAllByTestId('book-card');
  const firstBook = bookCards[0];
  fireEvent.click(firstBook);
  expect(firstBook).toHaveStyle('border-color: red');
});

test('verifica che cliccando su un altro il primo torni normale', () => {
  const { getAllByTestId } = render(<App />);
  const bookCards = getAllByTestId('book-card');
  const firstBook = bookCards[0];
  const secondBook = bookCards[1];
  fireEvent.click(firstBook);
  fireEvent.click(secondBook);
  expect(firstBook).not.toHaveStyle('border-color: red');
});

test('verifica non ci siano istanza di SingleComment', () => {
  const { queryByTestId } = render(<App />);
  const singleComment = queryByTestId('single-comment');
  expect(singleComment).not.toBeInTheDocument();
});

test('verifica click del libro le recensioni escano nel dom', () => {
  const { getAllByTestId, getByText } = render(<App />);
  const bookCards = getAllByTestId('book-card');
  const bookWithComments = bookCards.find(book => book.comments.length > 0);
  fireEvent.click(bookWithComments);
  const commentText = getByText(bookWithComments.comments[0]);
  expect(commentText).toBeInTheDocument();
});

