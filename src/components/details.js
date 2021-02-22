import React from "react";
import UserService from '../service/user';
var faker = require('faker');

class Details extends React.Component {
  constructor() {
    super();
    this.userId = Number;
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.userId = this.props.match.params.id
    if (this.userId) {
      this.getDetails();
    }
  }

  getDetails() {
    UserService.get(this.userId).then(response => {
      if (response.data) {
        let post = response.data;
        this.setState({ user: post })
      }
    })
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <br />
        <div className="container emp-profile shadow-lg p-3 mb-5 bg-white rounded">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={faker.fake("{{image.image}}")} alt="" />
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                  <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>
                    {user.firstName}  {user.lastName}
                </h5>
                  <h6>
                    Web Developer and Designer
                                    </h6>
                  <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* <div className="profile-work">
                  <p>WORK LINK</p>
                  <a href="">Website Link</a><br />
                  <a href="">Bootsnipp Profile</a><br />
                  <a href="">Bootply Profile</a>

                </div> */}
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Username</label>
                      </div>
                      <div className="col-md-6">
                        <p> {user.username}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.firstName} {user.lastName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.profession}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Details
