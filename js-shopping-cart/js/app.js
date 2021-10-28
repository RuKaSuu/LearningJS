displayCartFromLocalStorage();


//****************** DISPLAY FROM HTML TO JS ******************//

// Initiate a loop to display all the cards that exists in courses.js

for (let j = 0; j < COURSES.length; j++) {

    // Initialize some used variables for changing from HTML to JS

    let img = COURSES[j].img;
    let title = COURSES[j].title;
    let init_price = COURSES[j].initial_price;
    let price = COURSES[j].price;
    let id = COURSES[j].id;
    let stock = COURSES[j].stock;
    let mark = COURSES[j].mark;


    // If the stock exists in LS then the variable stock applies this value to herself

    if (localStorage.getItem(`stock-${COURSES[j].id}`)) {
        stock = localStorage.getItem(`stock-${COURSES[j].id}`)
    }


    // Make a pattern from our product cards in JS and print it

    document.querySelector('.courses__container').innerHTML += ` 

    <div class = "course__item" >
            <figure class = "course_img" >
            <img src = "img/courses/${img}" >
            </figure> 
            <div class = "info__card" >
            <h4 id="nom"> ${title} </h4> 
            <figure class = "mark m_${mark}" >
            <img src = "img/rates.png" >
            </figure> 
            <p>
            <span class = "price" > ${init_price }€ </span> 
            <span class = "discount" > ${ price }€ </span>
             </p> 
             <p>
            Disponible: <span class = "stock" > ${ stock } </span>
             </p>
            <a href = "#" class = "add-to-cart" data-id = "${id}"> <i i class = "fa fa-cart-plus "></i>Ajouter au panier</a> 
            </div> 
            </div>`;


}

//****************** END DISPLAY FROM HTML TO JS ******************//



//****************** TECHNICAL USES ******************//

// Initialize some external variables that we will use later

addToCart = document.getElementsByClassName('add-to-cart');

item = document.getElementsByClassName('course__item');

panier_div = document.getElementById('cart-table');





let stocks = document.querySelectorAll('.stock');


document.addEventListener('click', function(e) {


    if (e.target.classList.contains('empty-cart')) {

        localStorage.clear();

        notifications("Vous avez vidé le panier");

        //When clicking on our "Empty cart" button, clear the localStorage + Notify that we suppressed it

    }

})



for (let i = 0; i < COURSES.length; i++) {

    let stock = COURSES[i].stock;



    // If the stock exists in LS then the variable stock applies this value to herself

    if (localStorage.getItem(`stock-${COURSES[i].id}`)) {

        COURSES[i].stock = localStorage.getItem(`stock-${COURSES[i].id}`)

    }

    //****************** PRINCIPAL CLICK BUTTONS EVENTS ******************//

    addToCart[i].addEventListener('click', (event) => {

        let idCours = event.target.getAttribute('data-id');

        //Try to count how many courses are left


        if (COURSES[i].stock > 0) {



            //Reduce stock by 1 stock it in the LS then print it in the LS


            localStorage.setItem(`stock-${ COURSES[i].id }`, parseInt(localStorage.getItem(`stock-${ COURSES[i].id }`)) - 1)




            //Execute some functions to update correctly some values in the LS

            addItemToLocalStorage(idCours);

            addItem(idCours);

            cartNumbers(COURSES[i]);

            totalCout(COURSES[i]);

            //Notify the fact that it was added to the cart
 


            notifications(`${COURSES[i].title} a été ajouté au panier`)



            stocks[i].innerText = localStorage.getItem(`stock-${ COURSES[i].id }`);

            COURSES[i].stock = localStorage.getItem(`stock-${COURSES[i].id}`)

        } else {



            //If there is no stock left, notify that you can't add more of this product

            notifications("Vous ne pouvez pas en acheter davantage");

        }


    })





    document.addEventListener('click', function(e) {




        if (e.target.classList.contains('empty-cart')) {



            //Select our cart from the HTML
            document.querySelector('#cart-table tbody').innerHTML = "";

            //Let the text be equal to the inital stock of the product
            stocks[i].innerText = stock;

            //Let the count be equal to the inital stock of the product
            COURSES[i].stock = stock;

            //Change the value in the LS to correspond to the inital stock
            localStorage.setItem(`stock-${ COURSES[i].id }`, COURSES[i].stock);

            //Set in the LS the number of items in cart to 0
            localStorage.setItem('cartNumbers', 0);

            localStorage.setItem('totalCout', 0)





        } else if (e.target.classList.contains('fa-trash')) {



            //Ask if the id of the button we press is equal to the ID of the product we want to suppress

            if (COURSES[i].id === Number(e.target.parentNode.id.replace("trash-", ""))) {

                //Remove the tablerow of the cart

                e.target.parentNode.parentNode.remove()

                //Add to the count of the stock of the item 1

                localStorage.setItem(`stock-${ COURSES[i].id }`, parseInt(localStorage.getItem(`stock-${ COURSES[i].id }`)) + 1);

                //Change in the HTML the count of the stock to sync it with our LS.

                stocks[i].innerText = localStorage.getItem(`stock-${ COURSES[i].id }`);

                //Notify that an element has been supressed

                notifications(`Vous avez supprimé ${COURSES[i].title} du panier`)

                //Decrease in our localStorage the number of items in the cart

                let productsNumbers = localStorage.getItem('cartNumbers');
                localStorage.setItem('cartNumbers', productsNumbers - 1);

                //Call the function updateCartInLS to supress the element from the cart in the localStorage (Row of productsInCart)


                updateCartInLS();

                //Decrease  the cost of the product in the localStorage

                localStorage.setItem('totalCout', (localStorage.getItem('totalCout') - COURSES[i].price))

                COURSES[i].stock = localStorage.getItem(`stock-${COURSES[i].id}`)

            }

        }
    })

    //****************** END OF PRINCIPAL BUTTONS CLICK EVENTS ******************//
}


document.addEventListener('mouseover', (e) => {

    if (e.target.classList.contains('fa-trash')) {
        e.target.style.cursor = 'pointer';

        // When we go over an icon Trash on our cart, change the cursor to a pointer
    }


})



//****************** END OF TECHNICAL USES ******************//



//****************** CREATION OF FUNCTIONS ******************// 


function notifications(message) {

    //Initialize our notification pattern

    document.querySelector('#notification_container').innerHTML += `
        <div class="content">
            <img src = "img/cart.png"/>
            <p>${message}</p>
        </div>
    `;

    //Add a timer to supress our notifications after 3 seconds

    setTimeout(function() {
        document.querySelector('#notification_container .content').remove();
    }, 3000);

}

//***** Cart functions *****//


function addItem(idCours) {



    //Create a row from an element tablerow

    let row = document.createElement('tr');

    //Create a loop to select all of our items

    for (let i = 0; i < COURSES.length; i++) {

        if (COURSES[i].stock >= 0) {


            if (COURSES[i].id === Number(idCours)) {


                //Initiate our html to give a pattern to our rows

                let html = `
                <td><img src="img/courses/${COURSES[i].img}"></td>
                <td>${COURSES[i].title}</td>
                <td>${COURSES[i].price}</td>
                <td>1</td>
                <td class="trash" id="trash-${COURSES[i].id}"><i class="fa fa-trash" aria-hidden="true"></i></td>`;

                //Put the pattern active on our rows

                row.innerHTML = html;

                //Set the data-id attribute for the row at her creation

                row.setAttribute('data-id', COURSES[i].id);




            }
        }

    }


    //Initialize our cart by identifying it with his id then his type

    let panier = document.querySelector('#cart-table tbody');

    //Create the row by adding it IN our cart

    panier.appendChild(row);

}





/* ************************************************ */





function searchCourse(courseId) {
    var course;

    COURSES.forEach(function(item) {
        if (item.id == courseId) course = item;
    })

    return course;

}


//***** End of Cart functions *****//


//***** Local Storage functions *****//


function getCart() {

    // Initiate our cart by identifying it with our LS variable productsInCart

    let cart = localStorage.getItem('productsInCart');

    // If our cart is empty return a table that is empty

    if (cart == null || cart.length == 0) return [];

    // If our cart isn't, return our elements 

    else return JSON.parse(cart);

}

/* ************************************************ */

function addItemToLocalStorage(idCours) {

    //Initialize our Cart's items with the previous function

    let panierItems = getCart();

    // Push in our array our variable

    panierItems.push(idCours);

    // Transform into a string our variable then stock it to the LS

    localStorage.setItem('productsInCart', JSON.stringify(panierItems));

}


//***** End of Local Storage functions *****//


//***** Storage functions *****//


function cartNumbers() {


    //Initialize our productsNumbers to be the number in the localStorage of the items that we buy

    let productsNumbers = localStorage.getItem('cartNumbers');
    productsNumbers = parseInt(productsNumbers);



    if (productsNumbers) {
        localStorage.setItem('cartNumbers', productsNumbers + 1);

        //If productNumbers exists, then add one on click 1 to the LS part cartNumbers.


    } else {
        localStorage.setItem('cartNumbers', 1);

        //If it doesn't exist then create it on clickand put 1 on start value

    }




}

/* ************************************************ */

function totalCout(COURSES) {

    //Initialize our total price

    let panierTotal = localStorage.getItem('totalCout')


    if (panierTotal != null) {

        // Transform our total price into an integer

        panierTotal = parseInt(panierTotal);

        // Sum our price to the actual value into the localStorage

        localStorage.setItem("totalCout", panierTotal + COURSES.price);



    } else {

        // Create a total price in our LS then just put the price of the item

        localStorage.setItem("totalCout", COURSES.price)



    }

}

/* ************************************************ */

function updateCartInLS() {


    // Identify our cart and our rows

    let panier = document.querySelector('#cart-table tbody');
    let rows = panier.querySelectorAll('tr');

    // Set a table with cart's items and initialize it without any element

    let panierItems = [];

    console.log(panierItems);

    // Loop our rows to get all data-IDs and push them in the table

    rows.forEach(function(row) {
        let dataId = row.getAttribute('data-id');

        panierItems.push(dataId);

    })



    console.log(panierItems);

    // Store in our LS the table 


    console.log(JSON.parse(localStorage.getItem('productsInCart')).length)

    if (JSON.parse(localStorage.getItem('productsInCart')).length !== 1) {

        // If there is an item in the cart, put the other one in the LS.

        localStorage.setItem('productsInCart', JSON.stringify(panierItems));
    } else {

        // If there is none, remove productsInCart from the LS 

        localStorage.removeItem('productsInCart')
    }
}


//***** End of Storage functions *****//


//***** Reload Function *****//


function displayCartFromLocalStorage() {
    let panierItems = getCart();
    let panier = document.querySelector('#cart-table tbody');

    // Loop our Cart's content and get course informations related to her ID

    panierItems.forEach(function(item) {

        // Create the line that will contain our content

        let row = document.createElement('tr');

        // Take the informations by content's ID

        let course = searchCourse(item);

        // Create the pattern for the line

        let html = `
            <td><img src="img/courses/${course.img}"></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>1</td>
            <td class="trash" id="trash-${course.id}"><i class="fa fa-trash" aria-hidden="true"></i></td>
            `;

        // Give to the row the pattern

        row.innerHTML = html;

        // Create the line in our cart

        panier.appendChild(row);

        // Give a data-id to our row to identify it on the localStorage

        row.setAttribute('data-id', course.id);

    });
}

//***** End of Reload Function *****//


//****************** END OF THE CREATION OF FUNCTIONS ******************//