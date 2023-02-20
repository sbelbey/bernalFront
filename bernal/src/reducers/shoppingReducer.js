import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
    carts: [],
};

export function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {
            let newItem = action.payload;
            let itemInCart = state?.carts.find(
                (item) => item.id === newItem.id
            );
            return itemInCart
                ? {
                      ...state,
                      carts: state.carts.map((item) =>
                          item.id === newItem.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                      ),
                  }
                : {
                      ...state,
                      carts: [...state?.carts, { ...newItem, quantity: 1 }],
                  };
        }
        case TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                carts: state.carts.filter((item) => item.id !== action.payload),
            };
        }
        case TYPES.CLEAR_CART: {
            shoppingInitialState.carts = [];
            return shoppingInitialState;
        }
        case TYPES.MODIFY_QUANTITY: {
            return {
                ...state,
                carts: state.carts.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }
        default: {
            return state;
        }
    }
}
