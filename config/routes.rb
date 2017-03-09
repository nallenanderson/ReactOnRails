Rails.application.routes.draw do
  get '/surveys', to: 'surveys#index'

  get '/surveys/:id', to: 'surveys#show'

  get '/forms', to: 'forms#index'

  get 'forms/show'

  get 'errors/not_found'

  get 'errors/internal_server_error'

  get '/', to: 'pages#home'

  get '/about', to: 'pages#about'

  get '/contact', to: 'pages#contact'

  root to: "pages#home"

  match '/404', to: 'errors#not_found', via: :all

  match '/500', to: 'errors#internal_server_error', via: :all
end
