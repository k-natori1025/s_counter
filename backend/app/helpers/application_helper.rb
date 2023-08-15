module ApplicationHelper

  # def log_in(store)
  #   session[:store_id] = store.id
  # end
  
  def current_store
    puts "="*30
    puts session[:store_id]
    @current_store ||= Store.find(session[:store_id]) if session[:store_id]
  end

end
