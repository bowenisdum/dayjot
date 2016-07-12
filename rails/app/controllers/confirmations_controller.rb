class ConfirmationsController < Devise::ConfirmationsController
	
	clear_respond_to
    respond_to :json

	def show
	    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
	    yield resource if block_given?

	    if resource.errors.empty?
	      redirect_to "/login?email_confirmed=1"
	    else
	      redirect_to "/resent_confirmation"
	    end
	end

    protected

	def after_confirmation_path_for(resource_name, resource)
      if signed_in?(resource_name)
        signed_in_root_path(resource)
      else
        new_session_path(resource_name)
      end
	end
end