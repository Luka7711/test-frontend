import React, {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';

const Registration = () => {
	const [username, setUsername] = useState("");
	const [car, setCar] = useState("");
	const [price, setPrice] = useState(0);


	const handleChange = (e) => {
		switch(e.target.name) {
			case "username":
			setUsername(e.target.value)
			break;

			case "car":
			setCar(e.target.value)
			break;

			case "price":
			setPrice(e.target.value)

			default:
			break;
		}
	}

	const formSubmit = async(e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:9000/new-data", {
			method:"POST",
			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
			body: JSON.stringify({username: username, car:car, price:price})
		});
	}

	useEffect(() => {
		console.log(username, car, price);
	})

	return (
		<div>
			<form onSubmit={formSubmit}>
				<label>
					Username:
					<input type="text" name="username" onChange={handleChange} value={username}/>
				</label>
				<br/>
				<label>
					Car Model:
					<input type="text" name="car" onChange={handleChange} value={car}/>
				</label>
				<br/>
				<label>
					Price:
					<input type="text" name="price" onChange={handleChange} value={price}/>
				</label>
				<input type="submit"/>
			</form>
		</div>
	)
}

export default Registration;