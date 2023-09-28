// Global varible
const STORAGE_KEY = 'book';
let booksArray = getAllBooksLocal();
const bookcaseEl = document.getElementById('bookcase-box');

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

// Get All Books
function getAllBooksLocal() {
	const dataBook = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
	return dataBook;
}

// CRUD Functions
const addNewBook = () => {
	addForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const dataBook = {
			id: +new Date(),
			title: title.value,
			author: author.value,
			year: year.value,
			isComplete: isComplete.checked,
		};

		booksArray.push(dataBook);
		addAndRenderBooks();
	});
};

const deleteBook = (id, data) => {
	const deleteForm = document.getElementById('delete-form');
	deleteForm.remove();
	if (data) {
		booksArray = booksArray.filter((book) => book.id !== id);
		localStorage.getItem(STORAGE_KEY, JSON.stringify(booksArray));
		addAndRenderBooks();
	}
};

const deleteModal = (id) => {
	const modal = document.createElement('div');
	modal.classList.add('delete-modal');
	modal.id = 'delete-form';
	modal.innerHTML = `
		<div class="delete-form-box">
			<p>
			Apakah anda ingin menghapus buku ini?
			</p>
			<div>
			<button onclick="deleteBook(${id}, true)">Yes</button>
			<button onclick="deleteBook(${id}, false)">No</button>
			</div>
		</div>
	`;
	bookcaseEl.appendChild(modal);
};

// Book Features
const checkBook = (id) => {
	const index = booksArray.findIndex((book) => book.id === id);
	booksArray[index].isComplete = true;
	addAndRenderBooks();
};

const uncheckBook = (id) => {
	const index = booksArray.findIndex((book) => book.id === id);
	booksArray[index].isComplete = false;
	addAndRenderBooks();
};

const searchBook = () => {
	searchForm.addEventListener('submit', (event) => {
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

// Render Books
const addAndRenderBooks = () => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(booksArray));
	render(booksArray);
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
					<button onclick="deleteModal(${book.id})">
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
						<button onclick="deleteModal(${book.id})">
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

// After load
window.addEventListener('load', () => {
	render(booksArray);
	searchBook();
	addNewBook();
});
