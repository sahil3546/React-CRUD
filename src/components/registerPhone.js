import React, { useState } from "react";
import UserService from '../service/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends React.Component {
  constructor() {
    super();
    this.userId = Number;
    this.state = {
      fields: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        profession: '',
        review: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };

  componentDidMount() {
    this.userId = this.props.match.params.id
    if (this.userId) {
      this.handleEdit();
    }
  }

  handleEdit() {
    UserService.get(this.userId).then(response => {
      this.setState({
        fields: response.data
      });
    })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }



  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["firstName"] = "";
      fields["lastName"] = "";
      fields["username"] = "";
      fields["profession"] = "";
      fields["email"] = "";
      fields["phone"] = "";
      fields["review"] = "";
      this.setState({ fields: fields });

      if (this.userId) {
        UserService.update(this.userId, this.state.fields).then((response) => {
          if (response) {
            this.props.history.push('/');
            toast.success("Updated Successfully ", {
              position: toast.POSITION.TOP_RIGHT
            });
            this.setState({
              fields: this.state.fields
            })
          }
          else {
            toast.error("Updation Failed", {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        });

      } else {
        UserService.create(this.state.fields)
          .then(response => {
            if (response) {
              toast.success('🦄 Registered Successfully !!', {
                position: toast.POSITION.TOP_RIGHT
              });
              this.props.history.push('/dashboard');
            } else {
              toast.error("Updation Failed", {
                position: toast.POSITION.TOP_RIGHT
              });
            }
          })
      }
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your first name";
    }

    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Please enter your last name";
    }
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter username";
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter email";
    }
    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "*Please enter phone";
    }
    if (!fields["profession"]) {
      formIsValid = false;
      errors["profession"] = "*Please enter profession";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }



  render() {
    return (
      <div className="container" style={{ marginTop: "1em" }}>
        <form onSubmit={this.submituserRegistrationForm}>
          <div className="card person-card">
            <div className="card-body">
              <img id="img_sex" className="person-img"
                src="https://visualpharm.com/assets/217/Life%20Cycle-595b40b75ba036ed117d9ef0.svg" />
              <h4 id="who_message" className="card-title">User Information</h4>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="firstName" className="col-form-label">Title</label>
                  <select id="input_sex" className="form-control">
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="firstName" className="col-form-label">First Name <span className="requiredField">*</span></label>
                  <input type="text" name="firstName" className="form-control" value={this.state.fields.firstName || ""} onChange={this.handleChange} id="firstName" placeholder="Phone Name" />
                  <div className="firstName-feedback">
                    <div className="errorMsg">{this.state.errors.firstName}</div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="lastName" className="col-form-label">Last name <span className="requiredField">*</span></label>
                  <input type="text" name="lastName" className="form-control" value={this.state.fields.lastName || ""} onChange={this.handleChange} id="lastName" placeholder="Phone Name" />
                  <div className="lastName-feedback">
                    <div className="errorMsg">{this.state.errors.lastName}</div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="username" className="col-form-label">Username <span className="requiredField">*</span></label>
                  <input type="text" name="username" className="form-control" value={this.state.fields.username || ""} onChange={this.handleChange} id="username" placeholder="Phone Name" />
                  <div className="username-feedback">
                    <div className="errorMsg">{this.state.errors.username}</div>
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="email" className="col-form-label">Email <span className="requiredField">*</span></label>
                  <input type="text" name="email" className="form-control" value={this.state.fields.email || ""} onChange={this.handleChange} id="email" placeholder="email" />
                  <div className="email-feedback">
                    <div className="errorMsg">{this.state.errors.email}</div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="phone" className="col-form-label">Phone <span className="requiredField">*</span></label>
                  <input type="text" name="phone" className="form-control" value={this.state.fields.phone || ""} onChange={this.handleChange} id="phone" placeholder="phone" />
                  <div className="phone-feedback">
                    <div className="errorMsg">{this.state.errors.phone}</div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="profession" className="col-form-label">Profession <span className="requiredField">*</span></label>
                  <input type="text" name="profession" className="form-control" value={this.state.fields.profession || ""} onChange={this.handleChange} id="profession" placeholder="Profession" />
                  <div className="profession-feedback">
                    <div className="errorMsg">{this.state.errors.profession}</div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="review" className="col-form-label">Reviews</label>
                  <input type="text" name="review" className="form-control" value={this.state.fields.review || ""} onChange={this.handleChange} id="review" placeholder="Review" />
                  <div className="review-feedback">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1em" }}>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register