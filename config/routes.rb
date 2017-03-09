Rails.application.routes.draw do
  get '/', to: 'pages#home'

  get '/about', to: 'pages#about'

  get '/contact', to: 'pages#contact'

  root to: "pages#home"

  get 'survey/:id', to: 'pages#survey'
end
