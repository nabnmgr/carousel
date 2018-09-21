class Carousel {
  constructor(el) {
    this.el = el;
    this.items = el.children;
    this.current = 0;
  }

  prev() {
    this.reset();
    if (this.current === 0) {
      this.current = this.items.length;
    }
    this.current--;
    this.items[this.current].style.display = 'flex';
    this.renderPagination();
  }

  next() {
    this.reset();
    if (this.current === this.items.length - 1) {
      this.current = -1;
    }
    this.current++;
    this.items[this.current].style.display = 'flex';
    this.renderPagination();
  }

  goTo(index) {
    this.current = index;
    this.reset();
    this.items[this.current].style.display = 'flex';
    this.renderPagination();
  }

  reset() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].style.display = 'none';
    }
  }

  init() {
    this.reset();
    this.items[0].style.display = 'flex';
    this.renderPagination();
  }

  renderPagination() {
    let html = '';
    for (let i = 0; i < this.items.length; i++) {
      html += `<span class="dot ${
        this.current === i ? 'active' : ''
      }" data-index="${i}"></span>`;
    }
    document.querySelector('.carousel__nav-paginate').innerHTML = html;
  }
}

const content = document.querySelector('.carousel__content');
let carousel = new Carousel(content);
carousel.init();

// BUTTONS

let prevBtn = document.querySelector('.carousel__nav-left');
let nextBtn = document.querySelector('.carousel__nav-right');

prevBtn.addEventListener('click', () => carousel.prev());
nextBtn.addEventListener('click', () => carousel.next());

// DOT PAGINATION

let pagination = document.querySelector('.carousel__nav-paginate');

pagination.addEventListener('click', e => {
  if (e.target.matches('.dot')) {
    let index = parseInt(e.target.getAttribute('data-index'));
    carousel.goTo(index);
  }
});

// BASIC DRAG

let isDown = false;
let startX;
let endX;

content.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - content.offsetLeft;
  content.classList.add('active');
});

content.addEventListener('mouseleave', e => {
  e.preventDefault();
  isDown = false;

  content.classList.remove('active');
});

content.addEventListener('mouseup', e => {
  isDown = false;

  content.classList.remove('active');
  prevBtn.classList.remove('active');
  nextBtn.classList.remove('active');

  if (endX > startX) {
    carousel.prev();
  } else if (endX < startX) {
    carousel.next();
  }
});

content.addEventListener('mousemove', e => {
  endX = e.pageX - content.offsetLeft;
  e.preventDefault();

  if (!isDown) return;
  if (endX > startX) {
    prevBtn.classList.add('active');
    nextBtn.classList.remove('active');
  } else if (endX < startX) {
    nextBtn.classList.add('active');
    prevBtn.classList.remove('active');
  }
});
