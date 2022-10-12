import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import { Button } from "./button";
import {
  addToCart,
  decrementQuantity,
  updateQuantity,
} from "../../utils/NewCart";

export default function AddToCart({
  product = {},
  quantity,
  setQuantity,
  cartItem,
  setCartItem,
}) {
  const { t } = useTranslation();
  const decrementHandler = useCallback(
    debounce(
      (cartItem, quantity) => updateQuantity(cartItem.id, quantity - 1),
      600
    ),
    []
  );

  const incrementHandler = useCallback(
    debounce(
      (cartItem, quantity) => updateQuantity(cartItem.id, quantity + 1),
      600
    ),
    []
  );

  return (
    <>
      {quantity == 0 ? (
        <Button
          className=" bg-yellow-300 shadow outline-none hover:bg-yellow-400 active:bg-yellow-600"
          onClick={() => {
            addToCart(product.id, setCartItem);
          }}
          type="button"
        >
          {t("addtocart")}
        </Button>
      ) : (
        <div className="flex rounded justify-center">
          <Button
            className=" bg-yellow-300 shadow outline-none hover:bg-yellow-400 active:bg-yellow-600"
            onClick={() => {
              decrementHandler(cartItem, quantity);
              decrementQuantity(cartItem, quantity, setQuantity, () => {});
            }}
            type="button"
          >
            -
          </Button>
          <div className="flex items-center mx-1">{quantity}</div>
          <Button
            className=" bg-yellow-300 shadow outline-none hover:bg-yellow-400 active:bg-yellow-600"
            onClick={() => {
              incrementHandler(cartItem, quantity);
              setQuantity(quantity + 1);
            }}
            type="button"
          >
            +
          </Button>
        </div>
      )}
    </>
  );
}
