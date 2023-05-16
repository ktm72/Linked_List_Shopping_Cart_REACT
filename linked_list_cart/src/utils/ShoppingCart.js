// Define the shopping cart as a function that returns an object
function CreateShoppingCart() {
  // Declare variables to track the head and tail of the linked list,
  // the total size and price of the cart, and a map of items in the cart.
  let head = null;
  let tail = null;
  let size = 0;
  let totalPrice = 0;
  const itemMap = {};

  // Function to add an item to the cart.
  function addItem(name, price, quantity) {
    if (!name || !quantity) {
      return;
    }
    // Check if an item with the given name already exists in the cart.
    if (itemMap[name]) {
      // If so, increment its quantity instead of adding a new node to the linked list.
      itemMap[name].quantity += quantity;
    } else {
      // Otherwise, create a new node and add it to the end of the linked list.
      const newNode = { name, price, quantity, next: null };
      itemMap[name] = newNode;
      if (!head) {
        head = newNode;
      } else {
        tail.next = newNode;
      }
      tail = newNode;
      size++;
    }
    // Update the total price of the cart.
    totalPrice += price * quantity;
  }

  // Function to remove an item from the cart.
  function removeItem(name) {
    // Check if the item exists in the cart.
    if (!itemMap[name]) {
      return false;
    }
    // If so, get its price and quantity and remove it from the linked list.
    const { price, quantity } = itemMap[name];
    let prev = null;
    let curr = head;
    while (curr) {
      if (curr.name === name) {
        if (quantity > 1) {
          totalPrice -= price * 1;
          curr.quantity = quantity - 1;
        }
        if (quantity === 1) {
          if (!prev) {
            head = curr.next;
          } else {
            prev.next = curr.next;
          }
          if (!curr.next) {
            tail = prev;
          }
          size--;
          // Update the total price of the cart.
          totalPrice -= price * quantity;
          // Remove the item from the itemMap.
          delete itemMap[name];
        }
        return true;
      }
      prev = curr; //head
      curr = curr.next; //head.next
    }
    return false;
  }

  function getSize() {
    return size;
  }

  // Function to get the total price of the cart.
  function getTotalPrice() {
    return totalPrice;
  }

  // Function to print the items in the cart
  function getAllItems() {
    const items = [];
    for (const name in itemMap) {
      const { quantity, price } = itemMap[name];
      items.push({ name, quantity, price });
    }
    return items;
  }

  // Return an object containing the public methods of the shopping cart.
  return {
    addItem,
    removeItem,
    getTotalPrice,
    getAllItems,
    getSize,
  };
}

export default CreateShoppingCart;
