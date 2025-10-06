import alphadevImageUrl from "../assets/img/alphadev-logo.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Welcome to AlphaDev!</h1>
			<p>
				<img src={alphadevImageUrl} />
			</p>
		</div>
	);
}; 