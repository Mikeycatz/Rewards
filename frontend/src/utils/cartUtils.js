export const updateCart = (state) => {
  //calculate price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  //calculate total price
  state.totalPrice = Number(state.itemsPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
