// Global varible
let booksArray = [];

// Forms
const searchForm = document.getElementById('search-book-form');
const addForm = document.getElementById('add-book-form');

// Add Form
const title = document.getElementById('add-title');
const author = document.getElementById('add-author');
const year = document.getElementById('add-year');
const isComplete = document.getElementById('add-isComplete');

// Search Form
const searchTitle = document.getElementById('search-book');

// book List
const readBookList = document.getElementById('read-book-list');
const unreadBookList = document.getElementById('unread-book-list');

// Functions
const addBook = (form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

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

const deleteBook = (id) => {
	booksArray = booksArray.filter((book) => book.id !== id);
	localStorage.getItem('book', JSON.stringify(booksArray));
	refreshBooks();
};

function checkBook(id) {
	const index = booksArray.findIndex((book) => book.id === id);
	booksArray[index].isComplete = true;
	refreshBooks();
}

function uncheckBook(id) {
	const index = booksArray.findIndex((book) => book.id === id);
	booksArray[index].isComplete = false;
	refreshBooks();
}

const searchBook = (form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		if (searchTitle.value) {
			render(
				booksArray.filter((book) =>
					book.title.toLowerCase().includes(searchTitle.value.toLowerCase())
				)
			);
		} else {
			render(booksArray);
		}
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
					<button onclick="deleteBook(${book.id})">
						<i class="fas fa-trash-can"></i>
					</button>

					<button onclick="checkBook(${book.id})">
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
						<button onclick="deleteBook(${book.id})">
							<i class="fas fa-trash-can"></i>
						</button>

						<button onclick="uncheckBook(${book.id})">
							<i class="fas fa-check-square"></i>
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
