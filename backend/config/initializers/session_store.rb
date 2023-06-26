if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_backend', domain: 'localhost:3000' #本番環境でのフロントエンドのドメインを記述?
else
  Rails.application.config.session_store :cookie_store, key: '_backend'
end