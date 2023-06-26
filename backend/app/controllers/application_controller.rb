class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ApplicationHelper

  def log_in(store)
    session[:store_id] = store.id
  end

  def current_store
    @current_store ||= Store.find(session[:store_id]) if session[:store_id]
  end
end
