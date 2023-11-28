const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get('id');

// Product elements
const productImageElement = document.querySelector('.product-img');
const productCommentElement = document.querySelector('.product-comment');
const productTitleElement = document.querySelector('.product-title');
const productCategoryElement = document.querySelector('.product-category');
const productDescriptionElement = document.querySelector('.product-description');
const productPriceElement = document.querySelector('.product-price');
const featuresTextElement = document.querySelector('.features-text');
const includedItemsElement = document.querySelector('.included-items');
const includedQuantitiesElement = document.querySelector('.included-quantities');
const galleryElement1 = document.querySelector('.gallery-image-1');
const galleryElement2 = document.querySelector('.gallery-image-2');
const galleryElement3 = document.querySelector('.gallery-image-3');
const recommendedImageElement1 = document.querySelector('#recommended-image-1');
const recommendedImageElement2 = document.querySelector('#recommended-image-2');
const recommendedImageElement3 = document.querySelector('#recommended-image-3');
const recommendedTitleElement1 = document.querySelector('#recommended-title-1');
const recommendedTitleElement2 = document.querySelector('#recommended-title-2');
const recommendedTitleElement3 = document.querySelector('#recommended-title-3');
const recommendedLinkElement1 = document.querySelector('#recommended-link-1');
const recommendedLinkElement2 = document.querySelector('#recommended-link-2');
const recommendedLinkElement3 = document.querySelector('#recommended-link-3');
const quantityElements = document.querySelectorAll('.quantity-element');
const quantityElementText = document.querySelector('#quantity');
const goBackLinkElement = document.querySelector('#go-back-from-product');

// Cart elements
const cartWrapper = document.querySelector('#cart-wrapper');
const cartBadgeElement = document.querySelector('#cart-badge');
const cartElement = document.querySelector('.cart');
const cartQuantityTotalElement = document.querySelector('#cart-quantity-total');
const cartPriceTotalElement = document.querySelector('#cart-total-amount');
const emptyCartTextElement = document.querySelector('#empty-cart-text');
const cartItemsWrapper = document.querySelector('#cart-items-wrapper');
const cartItemElement = document.querySelector('.cart-item');
const cartItemImageElement = document.querySelector('.cart-item-img');
const cartItemNameElement = document.querySelector('.cart-item-name');
const cartItemPriceElement = document.querySelector('.cart-item-price');
const cartCheckoutButtonElement = document.querySelector('#checkout-button');
const cartCheckoutLink = document.querySelector('#checkout-link');

// Checkout summary elements
const summaryItemsWrapper = document.querySelector('.summary-items-wrapper');
const summaryItemElement = document.querySelector('.summary-item');
const summaryItemImageElement = document.querySelector('.summary-item-img');
const summaryItemNameElement = document.querySelector('.summary-item-name');
const summaryItemPriceElement = document.querySelector('.summary-item-price');
const summaryItemQuantityElement = document.querySelector('.summary-item-quantity');
const summaryTotalElement = document.querySelector('#summary-total');
const summaryVatElement = document.querySelector('#summary-vat');
const summaryGrandTotalElement = document.querySelector('#summary-grand-total');

// Checkout input elements
const inputElements = document.querySelectorAll('input');
const phoneInputElement = document.querySelector('#phone');
const zipInputElement = document.querySelector('#zip');
const eMoneyNumberInputElement = document.querySelector('#e-money-number');
const eMoneyPinInputElement = document.querySelector('#e-money-pin');
const eMoneyRadioElement = document.querySelector('#e-money');
const eMoneyWrapperElements = document.querySelectorAll('.e-money-wrapper');
const cashWrapperElement = document.querySelector('.cash-wrapper-hidden');
const confirmationOverlayElement = document.querySelector('.confirmation-overlay');

// Checkout confirmation elements
const confirmationItemsWrapper = document.querySelector('.confirmation-items-wrapper');
const confirmationItemElement = document.querySelector('.confirmation-item');
const confirmationItemImageElement = document.querySelector('.confirmation-item-img');
const confirmationItemNameElement = document.querySelector('.confirmation-item-name');
const confirmationItemPriceElement = document.querySelector('.confirmation-item-price');
const confirmationItemQuantityElement = document.querySelector('.confirmation-item-quantity');
const confirmationGrandTotalElement = document.querySelector('#confirmation-grand-total');

let cart = [];
const storedCart = JSON.parse(localStorage.getItem('cart'));
cart = storedCart;

let quantityInt = 0;
let cartOpenedByAddToButton = false;





// Changes style of nav button based on current page
function changeNavButtonStyle() {
    const currentPage = document.title;
    const buttonIdMap = {
        'Audiophile': 'home-button',
        'Audiophile - Headphones': 'headphones-button',
        'Audiophile - Speakers': 'speakers-button',
        'Audiophile - Earphones': 'earphones-button'
    };

    const buttonId = buttonIdMap[currentPage];
    if (buttonId) {
        document.getElementById(buttonId).classList.add('current-page');
    }
}

changeNavButtonStyle();





// Animates-in elements on scroll
function checkScroll() {
    const elementsToAnimate = document.querySelectorAll('.animate-in');

    elementsToAnimate.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop + 100 < windowHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);

checkScroll();





// Populates Product page with data from JSON file
function populateProductPage() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const productIndex = data.findIndex(product => product.slug.includes(pageId))



            // Populate product image
            if (window.innerWidth < 1140) {
                const productImage = data[productIndex].image.tablet;
                productImageElement.setAttribute('src', productImage);
            }
            else {
                const productImage = data[productIndex].image.desktop;
                productImageElement.setAttribute('src', productImage);
            }



            // Populate product comment
            if (data[productIndex].new === true) {
                productCommentElement.textContent = 'NEW PRODUCT';
            }



            // Populate product title
            let productTitle = data[productIndex].name;
            const words = productTitle.split(' ');
            words.pop();
            productTitle = words.join(' ');
            productTitleElement.textContent = productTitle;



            // Populate product category
            let productCategory = data[productIndex].category;
            productCategory = productCategory.charAt(0).toUpperCase() + productCategory.slice(1);
            productCategoryElement.textContent = productCategory;



            //Populate product description
            const productDescription = data[productIndex].description;
            productDescriptionElement.textContent = productDescription;



            //Populate product price
            let productPrice = data[productIndex].price;
            productPrice = productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            productPriceElement.textContent = '$ ' + productPrice;



            //Populate features text
            let featuresText = data[productIndex].features;
            if (featuresText.includes('\n\n')) {
                featuresText = featuresText.replace(/\n\n/g, '<br></br>')
            }
            featuresTextElement.innerHTML = featuresText;



            //Populate features-included list
            const includedItemsArray = data[productIndex].includes;
            let includedItems = [];
            let includedQuantities = [];

            if (includedItemsElement.textContent === '') {
                for (i = 0; i < includedItemsArray.length; i++) {
                    includedItems.push(includedItemsArray[i].item)
                }

                includedItems.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    includedItemsElement.appendChild(li);

                })

                for (i = 0; i < includedItemsArray.length; i++) {
                    includedQuantities.push(includedItemsArray[i].quantity)
                }

                includedQuantities.forEach(quantity => {
                    const li = document.createElement('li');
                    li.classList.add('included-quantities');
                    li.textContent = quantity + 'x';
                    includedQuantitiesElement.appendChild(li);
                })
            }




            // Populate gallery images
            const galleryImage1 = data[productIndex].gallery.first.desktop;
            const galleryImage2 = data[productIndex].gallery.second.desktop;
            const galleryImage3 = data[productIndex].gallery.third.desktop;
            galleryElement1.setAttribute('src', galleryImage1);
            galleryElement2.setAttribute('src', galleryImage2);
            galleryElement3.setAttribute('src', galleryImage3);



            // Populate recommended images
            const recommendedImage1 = data[productIndex].others[0].image.desktop;
            const recommendedImage2 = data[productIndex].others[1].image.desktop;
            const recommendedImage3 = data[productIndex].others[2].image.desktop;
            recommendedImageElement1.setAttribute('src', recommendedImage1);
            recommendedImageElement2.setAttribute('src', recommendedImage2);
            recommendedImageElement3.setAttribute('src', recommendedImage3);



            // Populate recommended titles
            const recommendedTitle1 = data[productIndex].others[0].name;
            const recommendedTitle2 = data[productIndex].others[1].name;
            const recommendedTitle3 = data[productIndex].others[2].name;
            recommendedTitleElement1.textContent = recommendedTitle1;
            recommendedTitleElement2.textContent = recommendedTitle2;
            recommendedTitleElement3.textContent = recommendedTitle3;



            // Populate recommended links
            const recommendedLink1 = data[productIndex].others[0].slug;
            const recommendedLink2 = data[productIndex].others[1].slug;
            const recommendedLink3 = data[productIndex].others[2].slug;
            recommendedLinkElement1.setAttribute('href', 'product.html?id=' + recommendedLink1);
            recommendedLinkElement2.setAttribute('href', 'product.html?id=' + recommendedLink2);
            recommendedLinkElement3.setAttribute('href', 'product.html?id=' + recommendedLink3);



            // Sets go back link
            goBackLinkElement.setAttribute('href', productCategory.toLowerCase() + '.html');
        })
}

if (document.title.includes('Product') && urlParams.has('id')) {
    populateProductPage();
    window.addEventListener('resize', populateProductPage);
}




// Adds or subtracts quantity of items to add to cart
function changeQuantity(event) {
    event.stopPropagation();

    if (event.target.textContent === '-') {
        if (event.target.classList.contains('cart-quantity-element') || event.target.nextElementSibling.textContent !== '1') {
            quantityInt = parseInt(event.target.nextElementSibling.textContent);
            quantityInt--;
            event.target.nextElementSibling.textContent = quantityInt.toString();
        }
    }
    else if (event.target.textContent === '+') {
        quantityInt = parseInt(event.target.previousElementSibling.textContent);
        quantityInt++;
        event.target.previousElementSibling.textContent = quantityInt.toString();
    }



    // Updates the cart array if changing quantity from the cart itself
    if (event.target.classList.contains('cart-quantity-element')) {
        const parent = event.target.parentElement;
        const uncle = parent.previousElementSibling;
        const itemName = uncle.querySelector('.cart-item-name').textContent;

        const index = cart.findIndex(item => item.itemName === itemName)
        cart[index].itemQuantity = quantityInt;



        // Removes item from cart if quantity is less than 1
        if (cart[index].itemQuantity < 1) {
            cart.splice(index, 1);
        }



        populateCart();
    }
}





// Adds products to cart
function addToCart() {
    let productName = productTitleElement.textContent;
    let productImage = productImageElement.attributes.src.value.replace('/desktop/image-product', '');
    productImage = productImage.replace('product', 'cart/image');
    const quantity = parseInt(quantityElementText.textContent);
    const price = parseInt(productPriceElement.textContent.replace(/[$ ,]/g, ''));



    // Adjusts names for certain items
    if (productName.includes('Mark')) {
        productName = productName.replace('Mark', "MK")
    }
    if (productName.includes('Wireless')) {
        productName = productName.replace('Wireless', "")
    }



    const existingProductIndex = cart.findIndex(item => item.itemName === productName);



    // Checks if product is already in cart and updates quantity accordingly
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].itemQuantity += quantity;

    }
    else {
        cart.push({
            itemName: productName,
            itemImage: productImage,
            itemQuantity: quantity,
            itemPrice: price
        });
    }



    // Store cart data in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    populateCart();



    cartOpenedByAddToButton = true;
    toggleCart(event);
}





// Toggles cart open/closed
function toggleCart(event) {
    event.stopPropagation();

    if (cartOpenedByAddToButton === true) {
        cartElement.classList.remove('cart-hidden');
        document.body.addEventListener('click', toggleCart);
        cartOpenedByAddToButton = false;
    }
    else if (cartElement.classList.contains('cart-hidden')) {
        cartElement.classList.remove('cart-hidden');
        document.body.addEventListener('click', toggleCart);
    }
    else if (!cartElement.contains(event.target)) {
        cartElement.classList.add('cart-hidden');
        document.body.removeEventListener('click', toggleCart);
    }

    if (!cartElement.classList.contains('cart-hidden')) {
        quantityElements.forEach(element => {
            element.addEventListener('click', toggleCart);
        })
    }
    else if (cartElement.classList.contains('cart-hidden')) {
        quantityElements.forEach(element => {
            element.removeEventListener('click', toggleCart);
        })
    }
}





// Removes all items from cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    if (!document.title.includes('Checkout')) {
        populateCart();
    }
}





// Adds or removes UI elements to/from cart
function populateCart() {
    if (cart.length === 0) {
        cartBadgeElement.style.display = 'none';
        cartItemsWrapper.innerHTML = '';
        cartQuantityTotalElement.textContent = 'CART (0)';
        emptyCartTextElement.textContent = 'Your cart is empty';
        cartPriceTotalElement.textContent = '$ 0'
        cartItemElement.style.display = 'none';
        cartCheckoutButtonElement.classList.remove('checkout-button-ready');
        cartCheckoutLink.removeAttribute('href');

    }
    else {
        let = cartQuantityTotal = 0;
        let = cartPriceTotal = 0;
        cartBadgeElement.style.display = 'flex';
        emptyCartTextElement.textContent = '';
        cartItemElement.style.display = 'flex';
        cartCheckoutButtonElement.classList.add('checkout-button-ready');
        cartItemsWrapper.innerHTML = '';
        cartCheckoutLink.setAttribute('href', 'checkout.html');



        // Clones the cart item element and populates each with data from the cart array
        for (i = 0; i < cart.length; i++) {
            const cartItemElementClone = cartItemElement.cloneNode(true);

            const cartItemName = cartItemElementClone.querySelector('.cart-item-name');
            const cartItemImage = cartItemElementClone.querySelector('.cart-item-img');
            const cartItemQuantity = cartItemElementClone.querySelector('#cart-quantity');
            const cartItemPrice = cartItemElementClone.querySelector('.cart-item-price');

            cartItemName.textContent = cart[i].itemName;
            cartItemImage.setAttribute('src', cart[i].itemImage);
            cartItemQuantity.textContent = cart[i].itemQuantity;
            cartItemPrice.textContent = '$ ' + (cart[i].itemPrice * cart[i].itemQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            cartItemsWrapper.appendChild(cartItemElementClone);

            cartQuantityTotal += cart[i].itemQuantity;
            cartPriceTotal += cart[i].itemPrice * cart[i].itemQuantity;
        }



        cartBadgeElement.textContent = cartQuantityTotal;
        cartQuantityTotalElement.textContent = 'CART (' + cartQuantityTotal + ')';
        cartPriceTotalElement.textContent = '$ ' + cartPriceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    // Store cart data in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

if (cartWrapper !== null && !document.title.includes('Checkout')) {
    populateCart();
}





// Adds UI elements to checkout summary
function populateSummary() {
    let = summaryTotal = 0;
    summaryItemsWrapper.innerHTML = '';



    // Clones the summary item element and populates each with data from the cart array
    for (i = 0; i < cart.length; i++) {
        const summaryItemElementClone = summaryItemElement.cloneNode(true);

        const summaryItemName = summaryItemElementClone.querySelector('.summary-item-name');
        const summaryItemImage = summaryItemElementClone.querySelector('.summary-item-img');
        const summaryItemQuantity = summaryItemElementClone.querySelector('.summary-item-quantity');
        const summaryItemPrice = summaryItemElementClone.querySelector('.summary-item-price');

        summaryItemName.textContent = cart[i].itemName;
        summaryItemImage.setAttribute('src', cart[i].itemImage);
        summaryItemQuantity.textContent = 'x' + cart[i].itemQuantity;
        summaryItemPrice.textContent = '$ ' + (cart[i].itemPrice * cart[i].itemQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        summaryItemsWrapper.appendChild(summaryItemElementClone);

        summaryTotal += cart[i].itemPrice * cart[i].itemQuantity;
    }



    let summaryVat = (summaryTotal * 0.2).toFixed(2);
    let summaryGrandTotal = (summaryTotal + parseFloat(summaryVat) + 50).toFixed(2);

    summaryTotalElement.textContent = '$ ' + summaryTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    summaryVatElement.textContent = '$ ' + summaryVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    summaryGrandTotalElement.textContent = '$ ' + summaryGrandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





// Toggles e-Money/Cash on Demand elements
function checkPaymentMethod() {
    setTimeout(() => {
        eMoneyWrapperElements.forEach(element => {
            if (eMoneyRadioElement.checked) {
                element.classList.add('input-wrapper');
                element.classList.remove('e-money-wrapper-hidden');
            }
            else {
                element.classList.remove('input-wrapper');
                element.classList.add('e-money-wrapper-hidden');
            }
        });

        if (!eMoneyRadioElement.checked) {
            cashWrapperElement.classList.add('cash-wrapper');
            cashWrapperElement.classList.remove('cash-wrapper-hidden');
        }
        else {
            cashWrapperElement.classList.remove('cash-wrapper');
            cashWrapperElement.classList.add('cash-wrapper-hidden');
        }
    }, 0);
}





// Validates checkout form
function validateForm(event) {
    event.preventDefault();

    let validInputs = 0;

    inputElements.forEach(input => {
        const inputValue = input.value.trim();
        const labelElement = input.previousElementSibling;



        // Handles elements with no label (i.e. radio inputs)
        if (!labelElement) {
            return;
        }



        const invalidTextElement = labelElement.querySelector('span');



        // Checks if each input has a value, else displays invalid message
        if (inputValue) {
            invalidTextElement.style.display = 'none';
            input.classList.remove('input-invalid');
        }
        else {
            if (input.type === 'email') {
                invalidTextElement.innerText = 'Email is required';
            }
            invalidTextElement.style.display = 'flex';
            input.classList.add('input-invalid');
        }



        // Checks if email is valid
        if (input.type === 'email' && inputValue) {
            if (isValidEmail(inputValue)) {
                invalidTextElement.style.display = 'none';
                input.classList.remove('input-invalid');
            }
            else {
                invalidTextElement.style.display = 'flex';
                invalidTextElement.innerText = 'Invalid email';
                input.classList.add('input-invalid');
            }
        }



        // Checks if phone number is proper length
        if (input.type === 'tel' && inputValue.length < 14) {
            invalidTextElement.style.display = 'flex';
            input.classList.add('input-invalid');
        }



        // Checks if zip code is proper length
        if (input.id === 'zip' && inputValue.length < 5) {
            invalidTextElement.style.display = 'flex';
            input.classList.add('input-invalid');
        }



        // Checks if e-money number is proper length
        if (input.id === 'e-money-number' && inputValue.length < 9) {
            invalidTextElement.style.display = 'flex';
            input.classList.add('input-invalid');
        }



        // Checks if e-money pin is proper length
        if (input.id === 'e-money-pin' && inputValue.length < 4) {
            invalidTextElement.style.display = 'flex';
            input.classList.add('input-invalid');
        }



        // Checks that all inputs are valid. If so, calls the placeOrder function
        if (!input.classList.contains('input-invalid')) {
            validInputs += 1;
            if (eMoneyRadioElement.checked && validInputs === 9) {
                placeOrder();
            }
            else if (!eMoneyRadioElement.checked && validInputs === 7) {
                placeOrder();
            }
        }
    });
}





// Formats phone number
function formatPhoneNumber() {
    let inputValue = phoneInputElement.value.replace(/\D/g, '');
    let formattedPhoneNumber = '';

    for (i = 0; i < inputValue.length; i++) {
        if (i === 0) {
            formattedPhoneNumber += '(' + inputValue[i];
        }
        else if (i === 2) {
            formattedPhoneNumber += inputValue[i] + ') ';
        }
        else if (i === 5) {
            formattedPhoneNumber += inputValue[i] + '-';
        }
        else {
            formattedPhoneNumber += inputValue[i];
        }
    }

    phoneInputElement.value = formattedPhoneNumber;
}





// Handles backspacing of formatted phone number
function handleBackspace(event) {
    let inputValue = phoneInputElement.value.replace(/\D/g, '');
    let formattedPhoneNumber = '';

    if (event.key === 'Backspace') {
        formattedPhoneNumber = inputValue;
        phoneInputElement.value = formattedPhoneNumber;
    }
}

if (document.title.includes('Checkout')) {
    phoneInputElement.addEventListener('input', formatPhoneNumber);
    phoneInputElement.addEventListener('keydown', handleBackspace);
}





// Validates email
function isValidEmail(inputValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputValue);
}





// Prevents more than the desired number of characters from being entered into certain inputs
// Additionally prevents non-integers from being entered
function limitInputLength(event) {
    const inputValue = event.target.value.trim();

    if (!isInt(inputValue) && event.target.id !== 'phone') {
        event.target.value = inputValue.slice(0, -1);
    }

    if (event.target.id === 'phone' && inputValue.length > 14) {
        event.target.value = inputValue.slice(0, 14);
    }
    else if (event.target.id === 'zip' && inputValue.length > 5) {
        event.target.value = inputValue.slice(0, 5);
    }
    else if (event.target.id === 'e-money-number' && inputValue.length > 9) {
        event.target.value = inputValue.slice(0, 9);
    }
    else if (event.target.id === 'e-money-pin' && inputValue.length > 4) {
        event.target.value = inputValue.slice(0, 4);
    }
}

if (document.title.includes('Checkout')) {
    populateSummary();
    phoneInputElement.addEventListener('input', limitInputLength);
    zipInputElement.addEventListener('input', limitInputLength);
    eMoneyNumberInputElement.addEventListener('input', limitInputLength);
    eMoneyPinInputElement.addEventListener('input', limitInputLength);
}





// Checks for integers
function isInt(inputValue) {
    const intRegex = /^\d+$/;
    return intRegex.test(inputValue);
}





// Places order and displays confirmation element
//Additionally clears cart
function placeOrder() {
    window.scrollTo({
        top: 0
    })

    document.body.classList.add('body-overflow-hidden');
    confirmationOverlayElement.classList.remove('confirmation-overlay-hidden');

    populateConfirmation();
    clearCart();
}





// Adds UI elements to checkout confirmation
function populateConfirmation() {
    let = confirmationTotal = 0;
    confirmationItemsWrapper.innerHTML = '';



    // Clones the confirmation item element and populates each with data from the cart array
    for (i = 0; i < cart.length; i++) {
        const confirmationItemElementClone = confirmationItemElement.cloneNode(true);

        const confirmationItemName = confirmationItemElementClone.querySelector('.confirmation-item-name');
        const confirmationItemImage = confirmationItemElementClone.querySelector('.confirmation-item-img');
        const confirmationItemQuantity = confirmationItemElementClone.querySelector('.confirmation-item-quantity');
        const confirmationItemPrice = confirmationItemElementClone.querySelector('.confirmation-item-price');

        confirmationItemName.textContent = cart[i].itemName;
        confirmationItemImage.setAttribute('src', cart[i].itemImage);
        confirmationItemQuantity.textContent = 'x' + cart[i].itemQuantity;
        confirmationItemPrice.textContent = '$ ' + (cart[i].itemPrice * cart[i].itemQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        confirmationItemsWrapper.appendChild(confirmationItemElementClone);

        confirmationTotal += cart[i].itemPrice * cart[i].itemQuantity;
    }



    let confirmationVat = (confirmationTotal * 0.2).toFixed(2);
    let confirmationGrandTotal = (confirmationTotal + parseFloat(confirmationVat) + 50).toFixed(2);

    confirmationGrandTotalElement.textContent = '$ ' + confirmationGrandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





// Checks for items in cart before loading checkout page. If cart is empty, redirect home
if (document.title.includes('Checkout') && cart.length === 0) {
    window.location.href = 'index.html'
}