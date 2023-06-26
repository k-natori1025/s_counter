Rails.application.routes.draw do
  
  # mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
  get '/', to: 'site#index'
 
  namespace :api do
    namespace :v1 do
      resources :registrations, only: %i[create update destroy]
      resources :stores, only: %i[create update destroy]
      post '/login', to: 'sessions#login'
      get '/logged_in', to: 'sessions#logged_in?'
      delete '/logout', to: 'sessions#logout'
      delete '/customers/destroy_all', to: 'customers#destroy_all'
      resources :customers, only: %i[create index destroy]
      delete '/events/destroy_all', to: 'events#destroy_all'
      resources :events, only: %i[create index destroy]
    end
  end
end
