CarrierWave.configure do |config|
  config.asset_host = "database-1.cdv4nwakzvxp.us-east-2.rds.amazonaws.com"
  config.storage = :file
  config.cache_storage = :file
end