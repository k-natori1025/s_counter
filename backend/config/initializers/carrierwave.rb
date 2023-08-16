CarrierWave.configure do |config|
  # config.asset_host = ENV['BACKEND_DOMAIN'] 
  config.asset_host = "https://backend.s-counter-app.com"
  config.storage = :file
  config.cache_storage = :file
end