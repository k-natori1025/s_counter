class Api::V1::StoresController < ApplicationController

  def index
    stores = Store.order(updated_at: :desc)
    render json: stores 
  end

  def create
    @store = Store.new(store_params)

    if @store.save
      render json: { status: :created, store: @store }
    else
      render json: { status: 500 }
    end
  end

  def show 
  end

  private

    def store_params
      params.require(:store).permit(:store_name, :phone_number, :password, :password_confirmation, :number_of_lockers, :image, :description)
    end

end