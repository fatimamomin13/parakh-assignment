fetch("index.json")
  .then((data) => data.json())
  .then((data) => {
    data = data.data;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].productList.length; j++) {
        document.getElementById("heading" + i).innerHTML = data[i].name;
        document.getElementById("name" + i + j).innerHTML =
          "" + data[i].productList[j].name.split(" ").join("-");
        document.getElementById("price" + i + j).innerHTML =
          "" + data[i].productList[j].price;
        document.getElementById("uid" + i + j).innerHTML =
          "" + data[i].productList[j].uid;
      }
    }
    var cart = [];
    var cartItems = [];
    var totalPrice = 0;
    var quantity = 1;
    var addBtns = document.getElementsByClassName("btn-primary");
    for (let i = 0; i < addBtns.length; i++) {
      var addButton = addBtns[i];
      addButton.addEventListener("click", function () {
        var productId =
          this.previousElementSibling.previousElementSibling
            .previousElementSibling.innerHTML;
        var productName =
          this.previousElementSibling.previousElementSibling.innerHTML;
        var productPrice = this.previousElementSibling.innerHTML;
        var flag = true;
        for (let itr = 0; itr < cart.length; ++itr) {
          if (cart[itr].id == productId) {
            // cart[itr].count++;
            quantity++;
            flag = false;
            break;
          }
        }
        if (flag) {
          cart.push({
            name: productName,
            price: productPrice,
            id: productId,
            quantity: quantity,
          });
        }
        console.log(
          "Name:" +
            productName +
            " Price: " +
            productPrice +
            " Quantity: " +
            quantity
        );
        cartItems.push(productName);
        totalPrice = parseInt(productPrice) + totalPrice;
        console.log("Total Cart Value:" + totalPrice);
        console.log("Cart Items: " + cartItems);
      });
    }
    var removeBtns = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeBtns.length; i++) {
      var removeButton = removeBtns[i];
      removeButton.addEventListener("click", function () {
        var productId =
          this.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.innerHTML;
        var productName =
          this.previousElementSibling.previousElementSibling
            .previousElementSibling.innerHTML;
        var productPrice =
          this.previousElementSibling.previousElementSibling.innerHTML;
        let index = -1;
        for (let itr = 0; itr < cart.length; ++itr) {
          if (cart[itr].id == productId) {
            index = itr;
            break;
          }
        }
        if (index != -1) {
          var temp = cart[index].count;
          if (temp == 1) {
            cart.splice(index, 1);
          } else {
            cart[index].count--;
          }
        }
        totalPrice = totalPrice - parseInt(productPrice);
        console.log("Product removed from the cart.");
        console.log("Total Cart Value:" + totalPrice);
      });
    }
  });
