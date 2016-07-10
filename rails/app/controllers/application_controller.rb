class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session

  # http://start.jcolemorrison.com/angularjs-rails-4-1-and-ui-router-tutorial/

  before_action :authenticate_user_from_token!
  around_action :user_time_zone, if: :current_user

  def index
    render layout: layout_name
  end

  protected

  def authenticate_user!
    render(json: {}, status: 401) unless current_user
  end

  private

  def layout_name
    if params[:layout] == 0
        false
    else
        'application'
    end
  end

  def authenticate_user_from_token!
    authenticate_with_http_token do |token, options|
      user_email = options[:user_email].presence
      user       = user_email && User.find_by_email(user_email)

      if user && Devise.secure_compare(user.authentication_token, token)
        request.env['devise.skip_trackable'] = true
        sign_in user, store: false
      end
    end
  end

  def user_time_zone(&block)
    Time.use_zone(current_user.time_zone, &block)
  end
end
