import Header from "./Header";

export default function Layout(props) {
    return (
        <>
            <Header bag={props.bag}></Header>
            {props.children}
        </>
    );
}
