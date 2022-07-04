let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 300,
        amount: 0,
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        img: 'images/product2.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        },
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 700,
        amount: 0,
        descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        img: 'images/product1.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        },
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1100,
        amount: 0,
        descr: 'FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        img: 'images/product3.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        },
    },
    BestBurger: {
        name: 'Самый лучший бургер',
        price: 50900,
        kcall: 1600,
        amount: 0,
        descr: 'Best Burger in Tashkent',
        img: 'https://cdnn1.img.sputniknews-uz.com/img/07e5/0a/13/20963736_320:0:1600:1280_1920x0_80_0_0_a56abdbe1daa06b4f9b03e5961ba807e.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        },
    },
}

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 3000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 4000,
        kcall: 20
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 120
    },
    ketchup: {
        name: 'Кетчуп',
        price: 3500,
        kcall: 70
    },
}






let result = '';

function createProduct() {
    let main = document.querySelector('.main')
    for (let key in product) {
        let {
            name,
            price,
            img,
            descr
        } = product[key]
        result += `<section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
                ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">
                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
            </div>
            <div class="main__product-price"><span>0</span> сум</div> 
        </div>
        <div class="main__product-extraProduct">`;
        for (let newKey in extraProduct) {
            result += `<label class="main__product-label">
                <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
                <span class="main__product-check"></span>
                ${extraProduct[newKey].name}
                </label>`;
        }
        result += `</div>
                <div class="main__product-kcall"><span>0</span> калорий</div> 
                </section>`;
    }
    main.innerHTML = result
    logic()
}
setTimeout(() => createProduct(), 1000)



function logic() {


    let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
        checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
        addCart = document.querySelector('.addCart'),
        receipt = document.querySelector('.receipt'),
        receiptWindow = document.querySelector('.receipt__window'),
        receiptOut = document.querySelector('.receipt__window-out'),
        payBtn = document.querySelector('.receipt__window-btn');



    btnPlusOrMinus.forEach((btn) => {
        btn.addEventListener('click', function () {
            plusOrMinus(this)
        })
    })

    function plusOrMinus(element) {
        // closest() - подключаеться к ближайшему заданому родительскому элементу
        // getAttribute() - берет значение указанного атрибута

        let parentId = element.closest('.main__product').getAttribute('id')
        let output = element.closest('.main__product').querySelector('.main__product-num')
        let price = element.closest('.main__product').querySelector('.main__product-price span')
        let kcall = element.closest('.main__product').querySelector('.main__product-kcall span')

        if (element.getAttribute('data-symbol') == '+') {
            product[parentId].amount++
        } else if (element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }

        output.innerHTML = product[parentId].amount
        price.innerHTML = product[parentId].SUMM
        kcall.innerHTML = product[parentId].KCALL

    }


    checkExtraProduct.forEach(product => {
        product.addEventListener('click', function () {
            addExtraProduct(this)
        })
    })

    function addExtraProduct(element) {
        let parent = element.closest('.main__product')
        let parentId = parent.getAttribute('id')

        product[parentId][element.getAttribute('data-extra')] = element.checked

        let price = parent.querySelector('.main__product-price span');
        let kcall = parent.querySelector('.main__product-kcall span');
        let elData = element.getAttribute('data-extra')

        if (product[parentId][elData] == true) {
            product[parentId].price += extraProduct[elData].price
            product[parentId].kcall += extraProduct[elData].kcall
        } else {
            product[parentId].price -= extraProduct[elData].price
            product[parentId].kcall -= extraProduct[elData].kcall
        }

        price.innerHTML = product[parentId].SUMM
        kcall.innerHTML = product[parentId].KCALL

    }

    let cart = [];
    let fullName = '';
    let fullPrice = 0;
    let fullKcall = 0;


    addCart.addEventListener('click', () => {
        for (let key in product) {
            let burger = product[key]
            if (burger.amount > 0) {
                cart.push(burger)
                for (let newKey in burger) {
                    if (burger[newKey] === true) {
                        burger.name += ' и ' + extraProduct[newKey].name
                    }
                }
                burger.price = burger.SUMM;
                burger.kcall = burger.KCALL;
            }
        }

        cart.forEach(burger => {
            // '\n' - Экранирование он переносит  наш элемент на след строку
            fullName += '\n' + burger.name + '\n';
            fullPrice += burger.price;
            fullKcall += burger.kcall;
        })

        receipt.style.display = 'flex';
        setTimeout(() => {
            receipt.style.opacity = '1'
            receiptWindow.style.top = '0';
        }, 100)

        receiptOut.innerHTML = `Ваш заказ: \n ${fullName} \nКаллорийность: ${fullKcall} Общая сумма ${fullPrice}сумм`;

        let amount = document.querySelectorAll('.main__product-num');
        let price = document.querySelectorAll('.main__product-price span');
        let kcall = document.querySelectorAll('.main__product-kcall span');

        for (let i = 0; i < amount.length; i++) {
            amount[i].innerHTML = 0;
            price[i].innerHTML = 0;
            kcall[i].innerHTML = 0;
        }
    })

    payBtn.addEventListener('click', () => location.reload())

}
let timer;
let x = 0;
countdown();
function countdown(){
  document.querySelector('.header__timer-extra').innerHTML = x;
  x++;
  if (x == 101){
    clearTimeout(timer);
  }
  else if (x >= 50){
    timer = setTimeout(countdown, 300);
  }
  else{
    timer = setTimeout(countdown, 300);
  }
}