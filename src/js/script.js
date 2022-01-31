{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
      form: '.filters'
    },
  };

  const tamplate = Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML);
  const booksList = document.querySelector('.books-list');
  const filters = [];
  function render() {
    

    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;
      
        
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      
      console.log(book.ratingBgc);
      console.log(ratingBgc);
      //console.log(book);
      const generatedHTML = tamplate(book);
      //console.log(generatedHTML);
      book = utils.createDOMFromHTML(generatedHTML);
      //console.log(book);
      booksList.appendChild(book);
      
    }

  }

  function initAction() {
    const favoriteBooks = [];

    const bookImage = booksList.querySelectorAll(select.containerOf.bookImage);
    console.log(bookImage);
    const filter = document.querySelector(select.containerOf.form);
    //console.log(filter);


    for (let book of bookImage) {
      // function for adding to favorite
      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        book.classList.toggle('favorite');

        const dataId = book.getAttribute('data-id');
        const bookInFavorite = favoriteBooks.includes(dataId);
        if (bookInFavorite) {
          favoriteBooks.pop(dataId);
        }
        else {
          favoriteBooks.push(dataId);
        }
        console.log(favoriteBooks);
        console.log(book);
      });



    }

    filter.addEventListener('click', function (event) {

      //console.log('filter books');
      const clickedElement = event.target;
      //console.log(clickedElement);
      if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
        //console.log(clickedElement.value);
      }

      if (clickedElement.checked) {
        filters.push(clickedElement.value);
      } else {
        const indexOfRemoveValue = filters.indexOf(clickedElement.value);
        filters.splice(indexOfRemoveValue, 1);
      }
      filterBooks();
    });

  }
  function filterBooks() {


    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      //console.log(book);
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden === true) {
        console.log('hiden was add');
        bookImage.classList.add('hidden');
      } else {
        console.log('hiden was remowe');
        bookImage.classList.remove('hidden');
      }
      console.log(book);
    }
  }
  function determineRatingBgc(rating) {
    if(rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }else if(rating > 8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }else if (rating > 9){
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }

  }
  render();
  initAction();
}
