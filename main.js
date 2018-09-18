// el
// methods: prev, next, goTo
// options: autoplay, interval, pagination, arrow

class Carousel {
  constructor(el) {
    this.el = el;
    this.items = el.children;
  }

  prev() {}

  next() {}

  goTo(index) {}

  reset() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].style.display = 'none';
    }
  }

  init() {
    this.reset();
    this.items[0].style.display = 'flex';
  }
}

let carousel = new Carousel(document.querySelector('.carousel__content'));
carousel.init();
console.log(carousel.items);
