CarrierWave.configure do |config|
  # config.asset_host = "https://backend.s-counter-app.com" || "http://localhost:3001"
  config.asset_host = ENV['BACKEND_DOMAIN'] || "https://backend.s-counter-app.com"
  config.storage = :file
  config.cache_storage = :file
end