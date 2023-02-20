import "./styles/App.css";

import { useState, useEffect, useReducer } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import FindUs from "./pages/FindUs";
import Error404 from "./pages/Error404.js";
import Layout from "./components/Layout.js";
import Profile from "./pages/Profile.js";
import MisDatos from "./pages/MisDatos";
import Product from "./pages/Product";
import Carrito from "./pages/Carrito";

import { TYPES } from "./actions/shoppingActions.js";
import {
    shoppingReducer,
    shoppingInitialState,
} from "./reducers/shoppingReducer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from "./pages/Shop";
import Buy from "./pages/Buy";
import Swal from "sweetalert2";

function App() {
    const [user, setUser] = useLocalStorage("user", "");
    const [bag, setBag] = useLocalStorage("bag", "");
    const [token, setToken] = useState(null);
    if (bag?.length > 0) shoppingInitialState.carts = bag;
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const addToCart = (id) => {
        Toast.fire({
            icon: "success",
            title: "Producto agregado al carrito.",
        });
        dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    };

    const clearCart = () => {
        dispatch({ type: TYPES.CLEAR_CART });
        setBag([]);
    };

    const modifyProductQuantity = (id, quantity) => {
        Toast.fire({
            icon: "success",
            title: "Producto agregado al carrito.",
        });
        dispatch({ type: TYPES.MODIFY_QUANTITY, payload: { id, quantity } });
    };

    const delFromCart = (id) => {
        dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    };

    const handleUser = (user) => {
        setUser(user);
    };

    const handleUserData = (userData) => {
        setUser({ ...user, data: userData });
    };

    useEffect(() => {
        if (user) {
            setToken(user.token);
        } else {
            setToken(null);
        }
    }, [user]);

    useEffect(() => {
        const getUser = () => {
            fetch(`${process.env.REACT_APP_SERVER_URL}/users/loginSuccess`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    setUser(resObject.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (!user) {
            getUser();
        }
    });

    return (
        <BrowserRouter>
            <Layout bag={bag}>
                <Routes>
                    <Route
                        index
                        path="/"
                        element={
                            <Home
                                userToken={token}
                                setBag={setBag}
                                addToCart={addToCart}
                                state={state}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            user ? (
                                <Navigate to="/perfil" />
                            ) : (
                                <Login handleUser={handleUser} />
                            )
                        }
                    />
                    <Route
                        path="/registro"
                        element={
                            user ? <Navigate to="/perfil" /> : <Register />
                        }
                    />
                    <Route path="/encontranos" element={<FindUs />} />
                    <Route
                        path="/tienda"
                        element={
                            <Shop
                                userToken={token}
                                setBag={setBag}
                                addToCart={addToCart}
                                state={state}
                                bag={bag}
                            />
                        }
                    />
                    <Route
                        path="/perfil"
                        element={
                            user ? (
                                <Profile userToken={token} user={user} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/tienda/producto/:id"
                        element={
                            <Product
                                userToken={token}
                                addToCart={addToCart}
                                setBag={setBag}
                                state={state}
                            />
                        }
                    />
                    <Route
                        path="/mis-datos"
                        element={
                            user ? (
                                <MisDatos
                                    userToken={token}
                                    user={user}
                                    handleUserData={handleUserData}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/carrito"
                        element={
                            user ? (
                                <Carrito
                                    userToken={token}
                                    bag={bag}
                                    setBag={setBag}
                                    clearCart={clearCart}
                                    delFromCart={delFromCart}
                                    state={state}
                                    modifyProductQuantity={
                                        modifyProductQuantity
                                    }
                                />
                            ) : (
                                <Carrito
                                    bag={bag}
                                    setBag={setBag}
                                    clearCart={clearCart}
                                    delFromCart={delFromCart}
                                    state={state}
                                    modifyProductQuantity={
                                        modifyProductQuantity
                                    }
                                />
                            )
                        }
                    ></Route>
                    <Route
                        path="/comprar"
                        element={
                            user ? (
                                <Buy
                                    user={user}
                                    bag={bag}
                                    clearCart={clearCart}
                                />
                            ) : (
                                <Buy
                                    bag={bag}
                                    setBag={setBag}
                                    clearCart={clearCart}
                                    delFromCart={delFromCart}
                                    state={state}
                                    modifyProductQuantity={
                                        modifyProductQuantity
                                    }
                                />
                            )
                        }
                    ></Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
