import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <MoonLoader color="#36d7b7" />
        </div>
    );
};

export default Loading;
