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
    data = resource.as_json.merge!({authentication_token: resource.authentication_token})
    render json: data, status: 201
  end

  def destroy
    sign_out :user
    render json: {}, status: :accepted
  end

  private

  def respond_to_on_destroy
    # We actually need to hardcode this as Rails default responder doesn't
    # support returning empty response on GET request
    respond_to do |format|
      format.all { head :no_content }
    end
  end
end
