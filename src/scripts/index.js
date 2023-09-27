// Global varible
let booksArray = [];

// Forms
const searchForm = document.getElementById('search-book-form');
const addForm = document.getElementById('add-book-form');

// book List
const readBookList = document.getElementById('read-book-list');
const unreadBookList = document.getElementById('unread-book-list');

const addBook = (form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const title = document.getElementById('add-title');
		const author = document.getElementById('add-author');
		const year = document.getElementById('add-year');
		const isComplete = document.getElementById('add-isComplete');

		const dataBook = {
			id: +new Date(),
			title: title.value,
			author: author.value,
			year: year.value,
			isComplete: isComplete.checked,
		};

		booksArray.push(dataBook);
		console.log(dataBook);
		refreshBooks();
	});
};

const refreshBooks = () => {
	localStorage.setItem('book', JSON.stringify(booksArray));
	render(booksArray);
};

const fillArray = () => {
	booksArray = JSON.parse(localStorage.getItem('book')) || [];
	render(booksArray);
};

const searchBook = (form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
	});
};

const createBookItem = () => {
	const bookItem = document.createElement('div');
	bookItem.classList.add('book-item');
	return bookItem;
};

const render = (books) => {
	unreadBookList.innerHTML = '';
	readBookList.innerHTML = '';

	books.forEach((book) => {
		const bookItem = createBookItem(book);

		if (!book.isComplete) {
			bookItem.innerHTML = `
				<div class="book-item-text">
					<h5>
						${book.title} 
					</h5>
					<p>
						${book.author}
					</p>
					<p>
						${book.year}
					</p>
				</div>

				<div class="book-item-btn">
					<button>
						<i class="fas fa-trash-can"></i>
					</button>

					<button>
						<i class="far fa-check-square"></i>
					</button>
				</div>
			`;
			unreadBookList.appendChild(bookItem);
		} else if (book.isComplete) {
			bookItem.innerHTML = `
					<div class="book-item-text">
						<h5>
							${book.title} 
						</h5>
						<p>
							${book.author}
						</p>
						<p>
							${book.year}
						</p>
					</div>
	
					<div class="book-item-btn">
						<button>
							<i class="fas fa-trash-can"></i>
						</button>
	
						<button>
							<i class="far fa-check-square"></i>
						</button>
					</div>
				`;
			readBookList.appendChild(bookItem);
		}
	});
};

window.addEventListener('load', () => {
	fillArray();

	searchBook(searchForm);
	addBook(addForm);
});
