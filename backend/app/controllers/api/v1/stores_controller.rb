class Api::V1::StoresController < ApplicationController

  def index
    stores = Store.order(updated_at: :desc)
    render json: stores 
  end

  def create
    @store = Store.new(store_params)

    if @store.save
      @store.authenticate(store_params[:password])
      session[:store_id] = @store.id
      render json: { status: :created, store: @store }
    else
      render json: { status: 500 }
    end
  end

  def update
    @store = Store.find(params[:id])
    if @store.update(store_params)
      render json: { status: :updated, store: @store }
    else
      render json: store.errors, status:422
    end
  end

  def show 
    @store = Store.find(params[:id])
    render json: { store: @store }
  end

  private

    def store_params
      params.require(:store).permit(:store_name, :phone_number, :email, :password, :password_confirmation, :address, :capacity, :number_of_lockers, :image, :description)
    end

end