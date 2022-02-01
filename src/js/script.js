{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
      form: '.filters',
    },
  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
    }

    render() {
      const thisBooksList = this;
      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        //console.log(book.ratingBgc);
        //console.log(ratingBgc);
        //console.log(book);
        const generatedHTML = template.book(book);
        //console.log(generatedHTML);
        book = utils.createDOMFromHTML(generatedHTML);
        //console.log(book);
        const bookList = document.querySelector(select.containerOf.booksList);
        bookList.appendChild(book);
      }
    }
    initActions() {
      //const favoriteBooks = [];
      const thisBooksList = this;
      //const bookImage = booksList.querySelectorAll(select.containerOf.bookImage);
      //console.log(bookImage);

      thisBooksList.dom.container.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        if (clickedElement.classList.contains('book__image')) {
          const bookInFavorite = clickedElement.getAttribute('data-id');
          if (thisBooksList.favoriteBooks.includes(bookInFavorite)) {
            clickedElement.classList.remove('favorite');
            
            const indexOfRemoveBook = thisBooksList.favoriteBooks.indexOf(bookInFavorite);
            thisBooksList.favoriteBooks.splice(indexOfRemoveBook, 1);
          } else {
            clickedElement.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookInFavorite);
            console.log(bookInFavorite);
          }

        }
      });
      
      
      thisBooksList.dom.form.addEventListener('click', function (event) {

        //console.log('filter books');
        const clickedElement = event.target;
        //console.log(clickedElement);
        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
          console.log(clickedElement.value);
          const value = clickedElement.value;
          if (clickedElement.checked) {
            thisBooksList.filters.push(value);
          } else {
            const indexOfRemoveValue = thisBooksList.filters.indexOf(value);
            thisBooksList.filters.splice(indexOfRemoveValue, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.dom = {};
      thisBooksList.dom.form = document.querySelector(select.containerOf.form);
      thisBooksList.dom.container = document.querySelector(select.containerOf.booksList);

    }
    filterBooks() {
      const thisBooksList = this;

      for (const book of thisBooksList.data) {
        let shouldBeHidden = false;
        //console.log(book);
        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if (shouldBeHidden === true) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {

      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

  }
  const app = new BooksList();
  console.log('app run:',app);
}