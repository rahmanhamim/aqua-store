const loadProducts = () => {
 const url = `https://fakestoreapi.com/products`;
 fetch(url)
  .then((response) => response.json())
  .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
 const allProducts = products.map((pd) => pd);
 for (const product of allProducts) {
  const image = product.image;
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <h5>Category: ${product.category}</h5>
        <p><small>Total reviews: ${product.rating.count}</small></p>
        <p><small>  Average rating: ${product.rating.rate} <i class="fas fa-star" style="color: gold;"></i> </small></p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="basic-btn">Add to cart</button>
        <!-- Button trigger modal -->
        <button onclick="loadModal('${product.title}', '${product.image}', '${product.description}')" type="button" class="second-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Details
        </button>
      </div>
      `;
  document.getElementById("all-products").appendChild(div);
 }
};
// Display Modal function
const loadModal = (title, image, description) => {
 const moadlTitle = document.getElementById("modal-title");
 const modalImage = document.getElementById("modal-image");
 const modalDescription = document.getElementById("modal-description");

 moadlTitle.innerHTML = title;
 modalImage.src = image;
 modalDescription.innerText = description;
};

// Adding Info To My Cart
let count = 0;
const addToCart = (id, price) => {
 count = count + 1;
 updatePrice("price", price);

 updateTaxAndCharge();
 document.getElementById("total-Products").innerText = count;

 updateTotal();
};

// Getting Input Value
const getInputValue = (id) => {
 const element = document.getElementById(id).innerText;
 const converted = parseFloat(element);
 return converted;
};

// main price update function
const updatePrice = (id, value) => {
 const convertedOldPrice = getInputValue(id);
 const convertPrice = parseFloat(value);
 const total = convertedOldPrice + convertPrice;
 document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
 document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
 const priceConverted = getInputValue("price");
 if (priceConverted > 200) {
  setInnerText("delivery-charge", 30);
  setInnerText("total-tax", priceConverted * 0.2);
 }
 if (priceConverted > 400) {
  setInnerText("delivery-charge", 50);
  setInnerText("total-tax", priceConverted * 0.3);
 }
 if (priceConverted > 500) {
  setInnerText("delivery-charge", 60);
  setInnerText("total-tax", priceConverted * 0.4);
 }
};

//grandTotal update function
const updateTotal = () => {
 const grandTotal =
  getInputValue("price") +
  getInputValue("delivery-charge") +
  getInputValue("total-tax");
 document.getElementById("total").innerText = grandTotal.toFixed(2);
};
