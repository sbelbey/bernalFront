import { useLocalStorage } from "./useLocalStorage.js";

export function useShoppingBag(initialValue) {
    const [bag, setBag] = useLocalStorage("bag", []);

    const addToBag = (article) => {
        console.log(
            "🚀 ~ file: useShoppingBag.js:5 ~ useShoppingBag ~ bag",
            bag
        );

        let newBag = [...bag];
        const index = newBag.findIndex((item) => item.articleId === article.id);
        if (index === -1) {
            newBag.push({ articleId: article.id, quantity: 1 });
        } else {
            newBag[index].quantity += 1;
        }
        setBag(newBag);
    };

    return [bag, addToBag];
}
