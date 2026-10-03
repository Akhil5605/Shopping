document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const buttons = document.querySelectorAll(".add-to-cart");
  const totalDisplay = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout");
  const billingForm = document.getElementById("billing-form");
  const confirmBillBtn = document.getElementById("confirmBill");
  const billDiv = document.getElementById("bill");
  const addressInput = document.getElementById("address");

  let cart = [];
  let total = 0;

  // Add to cart
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.parentElement;
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);

      cart.push({name, price});
      total += price;

      const li = document.createElement("li");
      li.textContent = `${name} - ₹${price}`;
      cartItems.appendChild(li);

      totalDisplay.textContent = `Total: ₹${total}`;
    });
  });

  // Show billing form
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      billDiv.textContent = "Your cart is empty!";
      return;
    }
    billingForm.style.display = "block";
  });

  // Confirm bill with address
  confirmBillBtn.addEventListener("click", () => {
    const address = addressInput.value.trim();
    if (!address) {
      alert("Please enter your billing address.");
      return;
    }

    let billHTML = "<h3>Final Bill</h3><ul>";
    cart.forEach(item => {
      billHTML += `<li>${item.name} - ₹${item.price}</li>`;
    });
    billHTML += `</ul><p><strong>Total Amount: ₹${total}</strong></p>`;
    billHTML += `<p><strong>Billing Address:</strong><br>${address}</p>`;
    billDiv.innerHTML = billHTML;

    billingForm.style.display = "none";
  });
});
