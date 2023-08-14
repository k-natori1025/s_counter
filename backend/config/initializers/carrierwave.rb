CarrierWave.configure do |config|
  config.asset_host = ENV['DB_HOST']
  config.storage = :file
  config.cache_storage = :file
end