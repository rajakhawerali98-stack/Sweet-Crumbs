// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added to cart!");
}

// Update cart display
function updateCart() {
    const cartDiv = document.getElementById("cart");
    if(!cartDiv) return;

    cartDiv.innerHTML = "";
    if(cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach((product, index) => {
        cartDiv.innerHTML += `
        <p>${index+1}. <b>${product.item}</b> - Rs. ${product.price}</p>`;
        total += product.price;
    });

    cartDiv.innerHTML += `<p><b>Total: Rs. ${total}</b></p>`;
}

// Checkout
function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! 🎉 Your total is Rs. " + cart.reduce((sum,p)=>sum+p.price,0));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Send order via WhatsApp
function sendWhatsApp() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let message = "Hello! I want to order:\n";
    cart.forEach((item, index) => {
        message += `${index+1}. ${item.item} - Rs. ${item.price}\n`;
    });
    message += `Total: Rs. ${cart.reduce((sum,p)=>sum+p.price,0)}`;

    let whatsappNumber = "923001234567"; // your real number
let url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
window.open(url, "_blank");
}

// Download simple text invoice
function downloadBill() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let bill = "Sweet Crumbs Bakery - Your Invoice\n\n";
    cart.forEach((item, index) => {
        bill += `${index+1}. ${item.item} - Rs. ${item.price}\n`;
    });
    bill += `\nTotal: Rs. ${cart.reduce((sum,p)=>sum+p.price,0)}\n\nThank you for ordering!`;

    let blob = new Blob([bill], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
}

function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000); // disappears after 2 seconds
}

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    showPopup(item + " added to cart!"); // use pop-up instead of alert
    updateCart();
}
//Logout
function logout() {
    localStorage.removeItem('cart'); 
    window.location.href = "welcome.html";
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    updateCart();
});

