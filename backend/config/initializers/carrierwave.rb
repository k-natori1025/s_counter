CarrierWave.configure do |config|
  # config.asset_host = "https://backend.s-counter-app.com" || "http://localhost:3001"
  config.asset_host = ENV['DB_HOST']
  config.storage = :file
  config.cache_storage = :file
end