/* =========================================
   ADD PRODUCTS PAGE
========================================= */


/* 1. Get all elements */

const NameInputElmt = document.getElementById("NameInput");
const discriptionInputElmt = document.getElementById("discriptionInput");
const ProductpriceInputElmt = document.getElementById("ProductpriceInput");
const addnewbuttonElmt = document.getElementById("addnewbutton");
const ProductimagepathElmt = document.getElementById("Productimagepath");
const renderproductsElmt = document.getElementById("renderproducts");


/* 2. Empty arrays */

let productlist = [];
let cartlist = [];


/*  SAVE PRODUCT TO LOCAL STORAGE */
function saveProductToLocal(p=productlist)
{
    localStorage.setItem("productkey", JSON.stringify(p));
}


/*  GET PRODUCT FROM LOCAL STORAGE */
function GetProductFromLocal()
{
    return JSON.parse(localStorage.getItem("productkey")) || [];
}


/*  SAVE CART TO LOCAL STORAGE */
function SaveCartToLocal(c=cartlist)
{
    localStorage.setItem("cartkey", JSON.stringify(c))
}


/* GET CART FROM LOCAL STORAGE */
function GetCartFromLocal()
{
    return JSON.parse(localStorage.getItem("cartkey")) || [];
}


/* SHOW PRODUCTS ON INDEX.HTML */
function ShowProduct()
{
    productlist = GetProductFromLocal();

    renderproductsElmt.innerHTML = productlist.map((p, index) =>
    `
        <div class="col-12 col-md-6 col-lg-3 mb-4 mt-4">
            <div class="card" style="width: 18rem;">
                <img src="${p.imgpath}" 
                     class="card-img-top"
                     alt="${p.name}"
                     style="height:150px; object-fit:cover;">
                <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">${p.discription}</p
                    <p class="card-text"><strong>₹ ${p.price}</strong>
                    </p>
                    <button class="btn btn-primary" onclick="AddToCart(${p.id})">Add To Cart</button>
                </div>
            </div>
        </div>
    `
    ).join("");
}


/*  ADD NEW PRODUCT */
function addNewProduct()
{
    /* Create new product object */
    const newprod =
    {
        id: Date.now(),
        name: NameInputElmt.value,
        discription: discriptionInputElmt.value,
        price: Number(ProductpriceInputElmt.value),
        imgpath: ProductimagepathElmt.value
    };

    /* Get existing products */
    productlist = GetProductFromLocal();

    /* Add new product */
    productlist.push(newprod);

    /* Save products */
    saveProductToLocal();

    /* Clear input fields */
    NameInputElmt.value = "";
    discriptionInputElmt.value = "";
    ProductpriceInputElmt.value = "";
    ProductimagepathElmt.value = "";

    /*  when we click on home page add Product link. we go to addproducts.html page.
        on homepage that is on index page we are showing this added product by vendor
        in id=renderproducts div we are showing this added info as a card.
        it means on button click of add_new_product we show the card on index page
        Therefore we have to use the conditin that if renderproduct elemt is available then only execute shwoProduct
    */

    
        window.location.href = "./index.html";
    
}

/*   ADD BUTTON EVENT */
if (addnewbuttonElmt) /* for this same above reason*/
{
    addnewbuttonElmt.addEventListener("click", addNewProduct);
}
/====================================================================================*/
/*Show prodeuct aaded to cart details on cart page*/
/*whatever card is getting generated on home page, when we click it on add to cart,
  with cart list it is also displayed on cart page*/
  const rendercardElemet=document.getElementById("rendercard")
  
  function Shwocart()
  {
        cartlist=GetCartFromLocal()
        console.log(rendercardElemet)
        rendercardElemet.innerHTML= cartlist.map((prod,i)=>
            `<tr> 
                <th> ${i+1} </th>
                <td> ${prod.name} </td>
                <td> ${prod.price} </td>
                <td>  
                <button type="button" class="btn btn-secondary"><b> - </b></button>
                <button type="button" class="btn btn-secondary"><b> + </b></button>
                </td>
            </tr>
            `).join("")

     /* below this code will show amout section*/

     totalamt=cartlist.reduce((amount,p,i)=>
     {
        return amount= amount+(p.price)*(p.quantity)
     },0)

     DeliveryCharges= 30
     HandelingCharges=50
     FinalCartAmount=totalamt+DeliveryCharges+HandelingCharges

     /* now will show this acmount details on cart page amountdetails */
     const amtdetailsElemet=document.getElementById("amtdetails")

        amtdetailsElemet.innerHTML=
            `   <p><b>Total Amount      = </b> &#8377 <i> ${totalamt} </i> <p>
                <p><b>Delievery Charges = </b> &#8377 <i> ${DeliveryCharges} </i> <p>
                <p><b>Handeling Charges = </b> &#8377 <i> ${HandelingCharges} </i> <p>
                <p><b>Final Bill Amount = </b> &#8377 <i> ${FinalCartAmount} </i> <p>
             `
  }

/*  ADD NEW PRODUCT TO CART */
/* Means the card added on the home page has addtocart button*/
/* when clock on that button
    1. on show product that button is added under inner html.
    2. for further actions we are sending procut id as parameter for addtocart function
    3. details get displaed on Cart.html page in table format
    4. save cart on local*/
function AddToCart(ID)
{
    productlist=GetProductFromLocal()
    index=productlist.findIndex((prod)=> prod.id == ID)
    if(index==-1)
    {
        alert("prod not Found")
    }
    const thatproduct=productlist.find((prod)=> prod.id == ID)
    cartlist=GetCartFromLocal()
    cartprod={
        id:Date.now(),
        prodid:thatproduct.id,
        name:thatproduct.name,
        price:thatproduct.price,
        quantity:1
    }

    cartlist.push(cartprod)

    SaveCartToLocal(cartlist)

    window.location.href = "./cart.html";
}
  

/*    RUN WHEN PAGE LOADS */

window.addEventListener("DOMContentLoaded", () =>
{
    const productFromLocalSto = GetProductFromLocal();

    if (renderproductsElmt)
    {
        ShowProduct();
    }

    if (rendercardElemet) {
    Shwocart();
}
});