Forevenue::Application.routes.draw do  
  devise_scope :user do
    get "sign_in", :to => "devise/sessions#new"
    get '/users/auth/:provider' => 'users/omniauth_callbacks#passthru'
  end
  
  devise_for :users, 
             :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :sessions => "sessions"}

  match '/registrations' => 'registrations#email', :via => :get,  :as => "email"
  match '/registrations' => 'registrations#email', :via => :post
  
  resources :deals, :only => [:create, :update]
  
  resources :events, :setting, :leads

  match '/contact',     :to => 'pages#contact'
  match '/about',       :to => 'pages#about'
  match '/welcome',     :to => 'pages#welcome'
  match '/activities',  :to => 'pages#activities'
  match '/average',     :to => 'pages#average'
  match '/goal',        :to => 'pages#goal'
  match '/settings',    :to => 'pages#settings'
  match '/task',        :to => 'pages#task'
  match '/status',      :to => 'pages#status', :as => "status"
  match '/video',       :to => 'pages#video'
  
  match '/twilio',      :to => 'twilio_client#index' 

  match '/events/new',              :to => 'events#new'  
  match '/events/:id/edit',         :to => 'events#edit'
  match '/get_events.json',         :to => 'pages#get_events'
  match '/get_upcoming_event.json', :to => 'pages#get_upcoming_event'
  
  match '/events/accept/:id', :to => 'events#accept'
  match '/events/end/:id', :to => 'events#end'
  match 'refresh/leads' , :to => 'leads#refresh', :as => 'refresh_leads'

  root  :to => 'pages#home'
end
