const products = {
  plainBurger: {
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 250
  },
  freshBurger: {
    name: 'Гамбургер FRESH ',
    price: 20500,
    kcall: 370
  },
  freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 600
  },
}
const extraproducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 200,
    kcall: 70,
  },
  lettuce: {
    name: 'Салатный лист',
    price: 270,
    kcall: 30,
  },
  cheese: {
    name: 'Сыр',
    price: 340,
    kcall: 50,
  },
}
function Summ(){return this.amount * this.price}
function Kcall(){return this.amount * this.kcall}
for(const key in products){
  products[key]['amount'] = 0
  products[key]['calcSumm'] = Summ
  products[key]['calcKcall'] = Kcall
}

const mainProducts = document.querySelectorAll('.main__product')

mainProducts.forEach(function(card, key){
  const cardBtns = card.querySelectorAll('.main__product-btn')
  const productCheckbox = card.querySelectorAll('.main__product-checkbox')
  const cardId = card.getAttribute('id')
  const mainProductAmount = card.querySelector('.main__product-num')
  const mainProductPrice = card.querySelector('.main__product-price span')
  const mainProductKcall = card.querySelector('.main__product-kcall span')
  
  productCheckbox.forEach(function(check, keyCheck){
    check.addEventListener('click', function(){
      const checkAttr = check.getAttribute('data-extra')
      products[cardId][checkAttr] = check.checked
      
      if(products[cardId][checkAttr] == true){
        products[cardId].price += extraproducts[checkAttr].price
        products[cardId].kcall += extraproducts[checkAttr].kcall
      }else{
        products[cardId].price -= extraproducts[checkAttr].price
        products[cardId].kcall -= extraproducts[checkAttr].kcall
      }
      mainProductPrice.innerHTML = products[cardId].calcSumm();
      mainProductKcall.innerHTML = products[cardId].calcKcall();
    })
  })
  
  cardBtns.forEach(function(btn, keyBtn){
    btn.addEventListener('click', function(){
      const symbol = btn.getAttribute('data-symbol')
      
      if(symbol == '+' && products[cardId].amount < 30){
        products[cardId].amount++
      }else if(symbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      mainProductAmount.innerHTML = products[cardId].amount;
      mainProductPrice.innerHTML = products[cardId].calcSumm();
      mainProductKcall.innerHTML = products[cardId].calcKcall();
    })
  })
})

const addCart = document.querySelector('.addCart')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const receiptBtn = document.querySelector('.receipt__window-btn')
let arrProducts = []
let totalName = ''
let totalPrice = 0
let totalKcall = 0

addCart.addEventListener('click', function(){
  for(const key in products){
    // const pObj = 
    if(products[key].amount > 0){
      arrProducts.push(products[key])
    }
  }
  console.log(products);
  console.log(arrProducts);
  for(const key in arrProducts){
      const pObj = arrProducts[key]
      pObj.name += `: ${pObj.amount}\n`
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `${extraproducts[info].name}\n`
        }
      }
      pObj.name += `Цена: ${pObj.price}/${pObj.calcSumm()}\nКаллорий: ${pObj.kcall}/${pObj.calcKcall()}\n`
    
    totalName += `\n${arrProducts[key].name}_________________________________________\n`
    totalPrice += arrProducts[key].calcSumm()
    totalKcall += arrProducts[key].calcKcall()
  }
  receiptOut.innerHTML = `Ваш заказ: ${totalName}\nОбщая стоимость: ${totalPrice}\nОбщая каллорийность: ${totalKcall}`
  
  
  receipt.style.display = 'flex'
  setTimeout(function(){
    receipt.style.opacity = '1'
  },100)
  setTimeout(function(){
    receiptWindow.style.top = '10%'
  },300)
  setTimeout(function(){
    receiptWindow.style.opacity = '1'
  },500)
})
receiptBtn.addEventListener('click', function(){
  // window.location.reload()
  setTimeout(() => {
    receipt.style.display = 'none'
  }, 600);
  setTimeout(function(){
    receipt.style.opacity = '0'
  },100)
  setTimeout(function(){
    receiptWindow.style.top = '-100%'
  },300)
  setTimeout(function(){
    receiptWindow.style.opacity = '0'
  },300)
  // for(const key in products){
  //   products[key].name = products[key].name
  // }
  receiptOut.innerHTML = ''
  arrProducts = [];
  totalName = ''
  totalPrice = 0
  totalKcall = 0
  console.log(arrProducts);
  console.log(products);
})