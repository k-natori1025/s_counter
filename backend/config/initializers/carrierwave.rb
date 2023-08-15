CarrierWave.configure do |config|
  # config.asset_host = "https://backend.s-counter-app.com" || "http://localhost:3001"
  config.asset_host = "http://localhost:3001"
  config.storage = :file
  config.cache_storage = :file
end