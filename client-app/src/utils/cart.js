export const getCart = () => {
  return JSON.parse(localStorage.getItem("CART")) || [];
};

export const setCart = (cart) => {
  localStorage.setItem("CART", JSON.stringify(cart));
};

export const removeCart = () => {
  localStorage.removeItem("CART");
};
