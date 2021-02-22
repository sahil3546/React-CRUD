import React from "react";
import UserService from '../service/user';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  
  handleDelete(id) {
    UserService.delete(id).then((res) => {
      if (res) {
        toast.error("Deleted Successfully !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.getData();
      }
      else {
        console.log('res', res);
        toast.error("Error in Deleting !", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  }

  getData() {
    UserService.getAll().then(response => {
      if (response.data) {
        let post = response.data;
        this.setState({ posts: post });
      }else{
        toast.error("Error in Fetching Records !", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    })
  }

  render() {

    return (
      <div className="list row">
        <div className="container">
          <h2>Bordered Table</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profession</th>
                <th>About</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post, i) => (
              <tr key={i}>
                <td>{post.firstName} {post.lastName}</td>
                <td>{post.username}</td>
                <td>{post.email}</td>
                <td>{post.phone}</td>
                <td>{post.profession}</td>
                <td><Link to={`/details/${post.id}`} className="btn btn-info" > About </Link></td>
                <td><Link to={`/register/${post.id}`} className="btn btn-warning" > Edit </Link></td>
                <td><button className="btn btn-danger" onClick={this.handleDelete.bind(this, post.id)}>Delete</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;