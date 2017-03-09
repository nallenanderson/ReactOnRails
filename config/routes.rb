Rails.application.routes.draw do
  get 'errors/not_found'

  get 'errors/internal_server_error'

  get '/', to: 'pages#home'

  get '/about', to: 'pages#about'

  get '/contact', to: 'pages#contact'

  root to: "pages#home"

  get 'survey/:id', to: 'pages#survey'

  match '/404', to: 'errors#not_found', via: :all

  match '/500', to: 'errors#internal_server_error', via: :all
end
