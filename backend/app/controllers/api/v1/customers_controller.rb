class Api::V1::CustomersController < ApplicationController

  def index
    store_id = params[:store_id]
    customers = Customer.where(store_id: store_id)
    render json: customers 
  end

  def create
    @customer = Customer.new(customer_params)
    if @customer.save
      render json: { status: :created, customer: @customer }
    else
      render json: { status: 500 }
    end
  end

  def destroy
    if Customer.destroy(params[:id])
      store_id = params[:store_id]
      customers = Customer.where(store_id: store_id)
      render json: customers
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Customer.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

    def customer_params
      params.require(:customer).permit(:locker_number, :usage_time, :store_id)
    end

end