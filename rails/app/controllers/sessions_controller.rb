class SessionsController < Devise::SessionsController

  clear_respond_to
  respond_to :json

  def new
    data = {
      error: "Login failed, email or password is wrong."
    }
    render json: data, status: 401
  end

  def create
    self.resource = warden.authenticate!(auth_options)
    output = sign_in(resource_name, resource)
    data = {
      user_token: resource.authentication_token,
      user_email: resource.email
    }
    render json: data, status: 201
  end

  def destroy
    sign_out :user
    render json: {}, status: :accepted
  end
end
