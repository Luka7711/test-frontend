import React, {Component} from 'react';

class User extends Component {
	
	render() {
		const allUsers = this.props.users.map((user, i) => {
			return (
				<div key={i}>
					<h1>{user.name}</h1>
				</div>
			)
		})
		return (
			<div>
				<h1>{allUsers}</h1>
			</div>
		)
	}
}

export default User;